import * as React from "react";
import { useAuth, useIsAuthenticated } from "@polybase/react";
import { Button, IconButton, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { Image } from "@mui/icons-material";
import { useNavigate } from "react-router";


export const SelectNetwork = () => {
    const navigate = useNavigate();
  return (
    <div>
       <Navbar/>
       <Typography>
       Select the network where your credentials will be stored
       </Typography>

       <div>
       <Button aria-label="delete" onClick={()=>{
        navigate("/credential-list");
       }}>
       <img src="../img/polybase.png" alt="Polybase" style={{ height: '40px' }} />
</Button>
      


       </div>
       <div>
       <img src="../img/polybase.png" alt="Polybase" style={{ height: '100px' }} />
       </div>
       <div>
       <img src="../img/polybase.png" alt="Polybase" style={{ height: '100px' }} />
       </div>



    </div>
  )
}
