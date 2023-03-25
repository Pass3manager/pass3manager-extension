import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Stack, TextField } from "@mui/material";
import { useCollection, usePolybase } from "@polybase/react";
import {
  createRecord,
  getNamespace,
  requestAccount,
} from "../services/polybase";
import * as eth from "@polybase/eth";
import { POLYBASE_CONSTANTS } from "../constants/polybase";
import { useAuthContext } from "../context/useAuth";
import { Navbar } from "../components/Navbar";

export const RegisterForm = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, user } = useAuthContext();
  const clearTextFields = () => {
    setUsername("");
    setPassword("");
    setUrl("");
  };
  const polybase = usePolybase();
  const { error } = useCollection(
    polybase.collection(
      `${getNamespace(user?.publicKey)}/${
        POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION
      }`
    )
  );
  const handleOnSubmit = async () => {
    const account = await requestAccount();
    const encryptedPassword = await eth.encrypt(password, account);
    const encryptedUsername = await eth.encrypt(username, account);
    await createRecord(
      `${getNamespace(user.publicKey)}/${
        POLYBASE_CONSTANTS.CREDENTIAL_COLLECTION
      }`,
      [url, encryptedUsername, encryptedPassword]
    );
    clearTextFields();
  };

  if (isLoggedIn && !error)
    return (
      <Stack spacing={2} height={500} width={350}>
        <Navbar />
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
