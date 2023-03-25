import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";

export const CredentialForm = ({
  url,
  username,
  password,
  setUrl,
  setUsername,
  setPassword,
  disabledUrl = false,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Fragment>
      <TextField
        label="URL"
        variant="outlined"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        disabled={disabledUrl}
      />
      <TextField
        label="Username/Email"
        variant="outlined"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <OutlinedInput
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </Fragment>
  );
};
