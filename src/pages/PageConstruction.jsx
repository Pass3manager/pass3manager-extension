import * as React from "react";
import { Button, Switch, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { CancelButton } from "../components/CancelButton";
import { useAuthContext } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";

export const PageConstruction = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2} height={500} width={350} justifyContent="center"
    alignItems="center" >

      <Typography style={{ textAlign: "center", fontWeight: "bold" }}>
        Sorry,it is still in development, very soon you will be able to make transactions.
      </Typography>
    
   

      <Button color="error" variant="contained" onClick={() => navigate(-1)}>
      Go back 
    </Button>
    </Stack>
  );
};
