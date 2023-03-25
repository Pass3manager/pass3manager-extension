import * as React from "react";
import { useAuth, useIsAuthenticated } from "@polybase/react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const Sign = () => {
  const { auth, state } = useAuth();
  const [isLoggedIn] = useIsAuthenticated();
  const navigate = useNavigate();


  React.useEffect(() => {
  
  if (isLoggedIn) {
    navigate("/select-network");
    
  }
 
  }, [isLoggedIn])
  
  return (
    <div>
     
      {isLoggedIn ? (
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      ) : (

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',minHeight: '50vh' }}>
      <img src="icon.png" alt="Logo de tu empresa" style={{ height: '200px' }} />
    
      <Typography variant="body1" style={{ color: 'blue', fontSize: '3rem' }}>
      Pass3Manager
    </Typography>
   
      <Button variant="contained" color="primary" style={{ marginTop: '3rem' }} onClick={() => auth.signIn()}>Start</Button>
    </div>
      )}
    </div>
  );
};
