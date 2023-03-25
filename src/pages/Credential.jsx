import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { decryptCredentials, deleteCredential } from "../services/polybase";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuth";
import { CancelButton } from "../components/CancelButton";
import { CredentialForm } from "../components/CredentialForm";
import { useState, useEffect } from "react";

export const Credential = () => {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const { credential } = state;
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUrl(credential.id);
    setUsername(credential.username);
    setPassword(credential.password);
  }, []);

  const decrypt = async () => {
    const decryptedCredentials = await decryptCredentials({
      username: username,
      password: password,
    });
    setUsername(decryptedCredentials.username);
    setPassword(decryptedCredentials.password);
  };

  return (
    <Stack spacing={2} height={500} width={350}>
      <Navbar />
      <Typography style={{ textAlign: "start", fontWeight: "bold" }}>
        Update your Account
      </Typography>

      <CredentialForm
        url={credential.id}
        username={username}
        password={password}
        setUrl={setUrl}
        setUsername={setUsername}
        setPassword={setPassword}
        disabledUrl={true}
      />

      <Button
        variant="outlined"
        color="error"
        onClick={async () => {
          await deleteCredential(user.publicKey, credential.id);
          navigate(-1);
        }}
      >
        DELETE
      </Button>
      <Button variant="contained" onClick={decrypt}>
        DECRYPT
      </Button>
      <CancelButton />
    </Stack>
  );
};
