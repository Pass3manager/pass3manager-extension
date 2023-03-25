import * as React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { deleteCredential } from "../services/polybase";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/useAuth";

export const Credential = () => {
  const { user } = useAuthContext();
  const { state } = useLocation();
  const { credential } = state;

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
      <Typography style={{ textAlign: "start", fontWeight: "bold" }}>
        Update your Account
      </Typography>

      <div>
        <TextField
          disabled
          label="URL"
          variant="filled"
          value={credential.id}
        />
        <TextField
          label="Username"
          variant="filled"
          value={credential.username}
        />
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="password"
          variant="filled"
          value={credential.password}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => deleteCredential(user.publicKey, credential.id)}
          >
            DELETE
          </Button>
          <Button variant="contained">UPDATED</Button>
        </div>
      </div>
    </div>
  );
};
