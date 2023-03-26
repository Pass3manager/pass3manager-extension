import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
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
import { CancelButton } from "../components/CancelButton";
import { CredentialForm } from "../components/CredentialForm";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, user } = useAuthContext();
  const navigate = useNavigate();
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
    navigate(-1);
  };

  if (isLoggedIn && !error)
    return (
      <Stack spacing={2} height={500} width={350}>
        <Navbar />
        <Typography style={{ textAlign: "start", fontWeight: "bold" }}>
        Register your credential info
      </Typography>
        <CredentialForm
          url={url}
          username={username}
          password={password}
          setUrl={setUrl}
          setUsername={setUsername}
          setPassword={setPassword}
        />
        <Button variant="contained" onClick={handleOnSubmit}>
          Save Credentials
        </Button>
        <CancelButton />
      </Stack>
    );
  else return <React.Fragment />;
};
