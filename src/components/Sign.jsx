import * as React from "react";
import { useAuth, useIsAuthenticated } from "@polybase/react";
import { Button, Typography } from "@mui/material";

export const Sign = () => {
  const { auth, state } = useAuth();
  const [isLoggedIn] = useIsAuthenticated();
  return (
    <div>
      <Typography>{JSON.stringify(state)}</Typography>
      {isLoggedIn ? (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => auth.signIn()}>Sign In</Button>
      )}
    </div>
  );
};
