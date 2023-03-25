import * as React from "react";
import { Switch, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";

export const Settings = () => {
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
    </div>
  );
};
