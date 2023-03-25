import * as React from "react";
import { Button, IconButton, Switch, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router";


export const Settings = () => {
  
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width:'350px', height:'500px'}}>
            <Navbar />
            <Typography style={{ textAlign: 'center', fontWeight:'bold' }}>
                Settings
            </Typography>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Enable auto save</Typography>
                <Switch  defaultChecked />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Enable fields to be auto-filled</Typography>
                <Switch  defaultChecked />
            </div>

           
        </div>

    )
}
