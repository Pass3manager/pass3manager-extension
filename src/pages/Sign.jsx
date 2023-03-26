import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
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

      
    <Stack spacing={2} height={500} width={350}  alignItems="center" >
          <img
            src="icon.png"
            style={{ height: "250px",width:"250px" }}
          />

          <Typography
            variant="body1"
            fontSize={"30px"}
            fontWeight="bold"
          >
            Web3Pass
          </Typography>
          {eth ? (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "3rem" }}
              size="large"
              onClick={connectWallet}
            >
              Start
            </Button>

          ) : (
            <Typography variant="body1">
              Make sure you have Metamask installed
            </Typography>
          )}

          <Typography
            variant="body1"
          >
            Want to know more about Pass3manager, <a href="https://www.bonfire.xyz/web3pass/home">click here</a>
          </Typography>
          



     
        </Stack>
      
  
  );
};
