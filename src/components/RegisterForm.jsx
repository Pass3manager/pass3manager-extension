import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Stack, TextField } from "@mui/material";
import { useIsAuthenticated } from "@polybase/react";
import { createRecord, requestAccount } from "../services/Polybase";
import * as eth from "@polybase/eth";

export const RegisterForm = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn] = useIsAuthenticated();
  const clearTextFields = () => {
    setUsername("");
    setPassword("");
    setUrl("");
  };
  const handleOnSubmit = async () => {
    const account = await requestAccount();
    const encryptedPassword = await eth.encrypt(password, account);
    const encryptedUsername = await eth.encrypt(username, account);
    const encryptedUrl = await eth.encrypt(url, account);
    createRecord("Credential", [
      encryptedUrl,
      encryptedUsername,
      encryptedPassword,
    ]);
    clearTextFields();
  };

  if (isLoggedIn)
    return (
      <Stack spacing={2}>
        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <TextField
          label="Username/Email"
          variant="outlined"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={"password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" onClick={handleOnSubmit}>
          Save Credentials
        </Button>
      </Stack>
    );
  else return <React.Fragment />;
};
