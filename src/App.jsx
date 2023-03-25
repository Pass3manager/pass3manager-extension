import { Container, Typography } from "@mui/material";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider, PolybaseProvider } from "@polybase/react";
import { Sign } from "./pages/Sign";
import { CredentialsList } from "./components/CredentialsList";
import { auth, polybase } from "./services/polybase";
import { useEffect } from "react";
import { createMetamaskProvider } from "./services/metamask";
import { Routes } from "./routes/Routes";

const App = () => {
  useEffect(() => {
    createMetamaskProvider();
  }, []);

  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <Routes />
      </AuthProvider>
    </PolybaseProvider>
  );
};

export default App;
