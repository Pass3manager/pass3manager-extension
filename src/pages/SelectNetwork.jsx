import * as React from "react";
import { Button, Card, CardActionArea, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router";

export const SelectNetwork = () => {
  const navigate = useNavigate();
  return (
    <Stack
    spacing={2} height={500} width={350}
    >
      <Navbar />
      <Typography fontWeight={"bold"}>
      Select the network where your credentials will be stored
      </Typography>



<Card sx={{ maxWidth: 340}}>
      <CardActionArea onClick={() => {
            navigate("/credential-list");
          }}>
            <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        
        }}>

             <img
              src="../img/polybase.png"
              alt="Polybase"
              style={{ height: "40px"}}
            />
            </div>
        <CardContent>
         
          <Typography variant="body1" color="text.primary">
          Decentralized database for self sovereign data

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
<Card sx={{ maxWidth: 340}}>
      <CardActionArea onClick={() => {
            navigate("/under-construction");
          }}>
            <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        
        }}>

             <img
              src="../img/gnosis.png"
              alt="Gnosis"
              style={{ height: "40px"}}
            />
            </div>
        <CardContent>
         
          <Typography variant="body1" color="text.primary">
          Self sovereign data through smart contracts on-chain, aplly gas-fees

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>


    
    </Stack>
  );
};
