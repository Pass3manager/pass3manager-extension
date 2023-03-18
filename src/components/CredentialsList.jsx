import * as React from "react";
import {
  usePolybase,
  useCollection,
  useIsAuthenticated,
} from "@polybase/react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from "@mui/icons-material/Delete";
import { decryptCredentials, deleteCredential } from "../services/Polybase";

export const CredentialsList = () => {
  const polybase = usePolybase();
  const [list, setList] = React.useState([]);
  const { data, error, loading } = useCollection(
    polybase.collection("Credential")
  );
  const [isLoggedIn] = useIsAuthenticated();

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
    }
  }, [data]);

  const decrypt = async (params) => {
    
    const { url, username, password } = await decryptCredentials(params.row);
    params.row.id = url;
    params.row.username = username;
    params.row.password = password;
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
          onClick={() => decrypt(params)}
          label="Decrypt"
        />,

        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => deleteCredential(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {isLoggedIn && list?.length > 0 && (
        <DataGrid
          rows={list}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </div>
  );
};
