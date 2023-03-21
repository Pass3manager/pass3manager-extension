import * as React from "react";
import { useAuth, useIsAuthenticated } from "@polybase/react";
import { Button, Typography } from "@mui/material";

export const Sign = () => {
  const { auth, state } = useAuth();
  const [isLoggedIn] = useIsAuthenticated();
  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
                <Typography variant="h5" component="h5" sx={{ textAlign: "center",color: "blue",fontWeight:"semibold" }}>Pass3Manager</Typography>

        <div>{JSON.stringify(state)}</div>
    {isLoggedIn ? (
      <Button variant="contained" onClick={() => auth.signOut()}>Cerrar sesión</Button>
    ) : (
      <Button variant="contained" onClick={() => auth.signIn()}>Start</Button>
    )}
  </div>
  );
};
