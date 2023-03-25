
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Settings } from '@mui/icons-material';
import {
    useIsAuthenticated,

  } from "@polybase/react";

export const Navbar=()=> {
    const [isLoggedIn] = useIsAuthenticated();
    return (
        isLoggedIn && (
          <AppBar position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" component="div">
                Pass3Manager
              </Typography>
              <IconButton color="inherit">
                <Settings />
              </IconButton>
            </Toolbar>
          </AppBar>
        )
      );
};


