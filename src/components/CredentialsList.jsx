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
import { Button, Typography } from "@mui/material";

export const CredentialsList = () => {
  const polybase = usePolybase();
  const [list, setList] = React.useState([]);
  const { state } = useAuth();
  const { data, error } = useCollection(
    polybase.collection(
      `${getNamespace(state?.publicKey)}/${
        POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION
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
    <div style={{ height: 400, width: "100%" }}>
      {isLoggedIn && list?.length > 0 && (
        <DataGrid
          apiRef={apiRef}
          rows={list}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
      {isLoggedIn && error && (
        <div>
          <Typography> You do not have a collection yet. </Typography>
          <Button onClick={() => createCredentialSchema(state?.publicKey)}>
            Create Collection
          </Button>
        </div>
      )}
    </div>
  );
};
