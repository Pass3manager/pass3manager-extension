import * as React from "react";
import {
  usePolybase,
  useCollection,
  useIsAuthenticated,
  useAuth,
} from "@polybase/react";
import { DataGrid, GridActionsCellItem, useGridApiRef } from "@mui/x-data-grid";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createCredentialSchema,
  decryptCredentials,
  deleteCredential,
  getNamespace,
} from "../services/polybase";
import { POLYBASE_CONSTANTS } from "../constants/polybase";
import { Button, Grid, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import { Add, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const CredentialsList = () => {
  const navigate = useNavigate();
  const polybase = usePolybase();
  const [list, setList] = React.useState([]);
  const { state } = useAuth();
  const { data, error } = useCollection(
    polybase.collection(
      `${getNamespace(state?.publicKey)}/${POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION
      }`
    )
  );
  const [isLoggedIn] = useIsAuthenticated();
  const apiRef = useGridApiRef();

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

  React.useEffect(() => {
    if (error) {
      setList([]);
    }
  }, [error]);

  const decrypt = async (params) => {
    const { username, password } = await decryptCredentials(params.row);
    apiRef.current.updateRows([
      { id: params.row.id, username: username, password: password },
    ]);
  };

  const columns = [
    { field: "id", headerName: "URL", width: 300 },
    { field: "username", headerName: "Username / Email", width: 300 },
    { field: "password", headerName: "Password", width: 300 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SecurityIcon />}
          label="Decrypt"
          onClick={() => decrypt(params)}
        />,

        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteCredential(state?.publicKey, params.row.id)}
        />,
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '350px', height: '500px' }}>
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
              <Typography style={{ fontWeight: 'bold' }} > Accounts </Typography>
            </Grid>
            <Grid item xs={4}>
              <IconButton color="primary" aria-label="Add new account">
                <Add />
              </IconButton>

            </Grid>
          </Grid>




          <Button onClick={() => createCredentialSchema(state?.publicKey)}>

          </Button>
        </div>
      )}
      {isLoggedIn && list?.length > 0 && (
           <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
           {list.map((value) => (
             <ListItem
               key={value}
               disableGutters
               secondaryAction={
                 <IconButton aria-label="comment">
                 <ArrowForward onClick={() => {
          navigate("/get-credential-data");
        }}/>
                 </IconButton>
               }
             >
               <ListItemText sx={{ maxWidth: 30}} primary={`${value.id}`} secondary= {`${value.username.substr(0,18)}`} />
           
             </ListItem>
           ))}
         </List>
        
      )}

    </div>
  );
};
