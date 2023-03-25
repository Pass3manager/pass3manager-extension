import * as React from "react";
import { Button, Switch, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { CancelButton } from "../components/CancelButton";
import { useAuthContext } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";

export const Settings = () => {
  const { setUser, setIsLoggedIn, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Stack spacing={2} height={500} width={350}>
      <Navbar />
      <Typography style={{ textAlign: "center", fontWeight: "bold" }}>
        Settings
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Enable auto save</Typography>
        <Switch defaultChecked />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Enable fields to be auto-filled</Typography>
        <Switch defaultChecked />
      </div>
      <CancelButton />

      <Button
        color="error"
        variant="contained"
        onClick={() => {
          setUser({
            userId: null,
            publicKey: null,
          });
          setIsLoggedIn(false);
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};
