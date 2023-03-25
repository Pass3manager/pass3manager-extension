import * as React from "react";
import { usePolybase, useCollection } from "@polybase/react";
import {
  createCredentialSchema,
  decryptCredentials,
  getNamespace,
} from "../services/polybase";
import { POLYBASE_CONSTANTS } from "../constants/polybase";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
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
    console.log("data", data);
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

  const [createCredentialLoading, setCreateCredentialLoading] = React.useState(false);

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

  const decrypt = async (params) => {
    const { username, password } = await decryptCredentials(params.row);
    apiRef.current.updateRows([
      { id: params.row.id, username: username, password: password },
    ]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "350px",
        height: "500px",
      }}
    >
      <Navbar />
      {isLoggedIn && (
        <div>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item xs={8}>
              <Typography style={{ fontWeight: "bold" }}> Accounts </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" aria-label="Add new account">
                <Add onClick={() => navigate("/register-form")} />
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
              disableGutters
              secondaryAction={
                <IconButton aria-label="comment">
                  <ArrowForward
                    onClick={() => {
                      navigate("/get-credential-data", {
                        state: { credential: value },
                      });
                    }}
                  />
                </IconButton>
              }
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
    </div>
  );
};
