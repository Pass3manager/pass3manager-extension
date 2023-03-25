import * as React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/useAuth";

export const Sign = () => {
  const navigate = useNavigate();
  const { isLoggedIn, connectWallet } = useAuthContext();

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/select-network");
    }
  }, [isLoggedIn]);

  const [eth, setEth] = React.useState(null);

  React.useEffect(() => {
    if (window.ethereum) {
      setEth(window.ethereum);
    }
  }, [window.ethereum]);

  return (
    <div>
      {
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
          }}
        >
          <img
            src="icon.png"
            alt="Logo de tu empresa"
            style={{ height: "200px" }}
          />

          <Typography
            variant="body1"
            style={{ color: "blue", fontSize: "3rem" }}
          >
            Pass3Manager
          </Typography>
          {eth ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "3rem" }}
              onClick={connectWallet}
            >
              Start
            </Button>
          ) : (
            <Typography variant="body1">
              Make sure you have Metamask installed
            </Typography>
          )}
        </div>
      }
    </div>
  );
};
