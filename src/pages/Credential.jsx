import * as React from "react";
import { Button, IconButton, Switch, TextField, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";



export const Credential = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '350px', height: '500px' }}>
            <Navbar />
            <Typography style={{ textAlign: 'start', fontWeight: 'bold' }}>
                Update your Account
            </Typography>

            <div>
                <TextField
                    required
                    id="filled-required"
                    label="Required"
                    defaultValue="Site"
                    variant="filled"
                />
                <TextField
                    disabled
                    id="filled-disabled"
                    label="Disabled"
                    defaultValue="username"
                    variant="filled"
                />
                <TextField
                    id="filled-password-input"
                    label="Password"
                    type="password"
                    autoComplete="password"
                    variant="filled"
                />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined">DELETE</Button>
                    <Button variant="contained">UPDATED</Button>
                </div>


            </div>


        </div>

    )
}
