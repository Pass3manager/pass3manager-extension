import { Container } from "@mui/material";
import { PolybaseProvider } from "@polybase/react";
import { polybase } from "./services/polybase";
import { useEffect } from "react";
import { createMetamaskProvider } from "./services/metamask";
import { Routes } from "./routes/Routes";
import { AuthProvider } from "./context/useAuth";

const App = () => {
  useEffect(() => {
    createMetamaskProvider();
  }, []);

  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider>
        <Container>
          <Routes />
        </Container>
      </AuthProvider>
    </PolybaseProvider>
  );
};

export default App;
