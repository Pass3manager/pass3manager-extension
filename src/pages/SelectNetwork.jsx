import * as React from "react";
import { Button, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router";

export const SelectNetwork = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        height: "500px",
      }}
    >
      <Navbar />
      <Typography style={{ textAlign: "center" }}>
        Selecciona la red donde se almacenarán tus credenciales
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <Button
          onClick={() => {
            navigate("/credential-list");
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="../img/polybase.png"
              alt="Polybase"
              style={{ height: "40px" }}
            />
          </div>
        </Button>
        <Typography style={{ textAlign: "center" }}>
          Decentralized database for self sovereign data
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <Button
          onClick={() => {
            navigate("/credential-list");
          }}
        >
          <img
            src="../img/gnosis.png"
            alt="Polybase"
            style={{ height: "40px" }}
          />
        </Button>
        <Typography style={{ textAlign: "center" }}>
          Self sovereign data through smart contracts on-chain, aplly gas-fees
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <Button
          onClick={() => {
            navigate("/credential-list");
          }}
        >
          <img
            src="../img/scroll.png"
            alt="Polybase"
            style={{ height: "40px" }}
          />
        </Button>
        <Typography style={{ textAlign: "center" }}>
          Self sovereign data through smart contracts on-chain, aplly gas-fees
        </Typography>
      </div>
    </div>
  );
};
