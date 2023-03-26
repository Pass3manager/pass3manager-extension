import * as React from "react";
import { usePolybase, useCollection } from "@polybase/react";
import { createCredentialSchema, getNamespace } from "../services/polybase";
import { POLYBASE_CONSTANTS } from "../constants/polybase";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Add, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuth";

export const CredentialsList = () => {
  const navigate = useNavigate();
  const polybase = usePolybase();
  const [list, setList] = React.useState([]);
  const { isLoggedIn, user } = useAuthContext();
  const { data, error } = useCollection(
    polybase.collection(
      `${getNamespace(user?.publicKey)}/${
        POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION
      }`
    )
  );

  React.useEffect(() => {
    if (data?.data) {
      setList(
        data.data.map((e) => {
          return {
            id: e.data.id,
            username: e.data.username,
            password: e.data.password,
          };
        })
      );
    } else {
      setList([]);
    }
  }, [data]);

  const [createCredentialLoading, setCreateCredentialLoading] =
    React.useState(false);

  const createSchema = async () => {
    setCreateCredentialLoading(true);
    await createCredentialSchema(user.publicKey);
    setCreateCredentialLoading(false);
  };

  React.useEffect(() => {
    if (error) {
      setList([]);
      if (error.code === "not-found" && !createCredentialLoading) {
        createSchema();
      }
    }
  }, [error]);

  return (
    <Stack spacing={2} height={500} width={350}>
      <Navbar />
      {isLoggedIn && (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
        
          >
            <Grid item xs={11}>
              <Typography style={{ fontWeight: "bold" }}> Accounts </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton color="primary" aria-label="Add new account">
                <Add style={{ fontWeight: "bold" }} onClick={() => navigate("/register-form")}  />
              </IconButton>
            </Grid>
          </Grid>

          <Button
            onClick={() => createCredentialSchema(user?.publicKey)}
          ></Button>
        </div>
      )}
      {isLoggedIn && list?.length > 0 && (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {list.map((value) => (
            <ListItem
              key={value}
              button
              divider
            
            
                    onClick={() => {
                      navigate("/get-credential-data", {
                        state: { credential: value },
                      });
                    }}
                  
              
              
            >
              <ListItemText
                sx={{ maxWidth: 30 }}
                primary={`${value.id}`}
                secondary={`${value.username.substr(0, 18)}`}
              />
            </ListItem>
           
          ))}
        </List>
      )}
    </Stack>
  );
};
