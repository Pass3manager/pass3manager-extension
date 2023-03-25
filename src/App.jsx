import { Container } from "@mui/material";
import { useEffect } from "react";
import { createMetamaskProvider } from "./services/metamask";
import { Routes } from "./routes/Routes";
import { useAuthContext } from "./context/useAuth";
import { addChangeUrlListener } from "./services/chrome";

const App = () => {
  const { isLoggedIn, user } = useAuthContext();

  useEffect(() => {
    createMetamaskProvider();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      addChangeUrlListener(user.publicKey);
    }
  }, [isLoggedIn]);

  return (
    <Container>
      <Routes />
    </Container>
  );
};

export default App;
