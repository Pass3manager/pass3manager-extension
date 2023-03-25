import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const CancelButton = () => {
  const navigate = useNavigate();
  return (
    <Button color="error" variant="contained" onClick={() => navigate(-1)}>
      Cancel
    </Button>
  );
};
