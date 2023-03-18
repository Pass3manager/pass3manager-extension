import { Container, Typography } from "@mui/material";
import { RegisterForm } from "./components/RegisterForm";
import { Auth } from "@polybase/auth";
import { AuthProvider, PolybaseProvider } from "@polybase/react";
import { Sign } from "./components/Sign";
import { CredentialsList } from "./components/CredentialsList";
import { polybase } from "./services/Polybase";

const auth = new Auth();

const App = () => {
  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <Container>
          <Sign />
          <Typography variant="h2">Pass3Manager</Typography>
          <br />
          <br />
          <RegisterForm />
          <br />
          <br />
          <CredentialsList />
        </Container>
      </AuthProvider>
    </PolybaseProvider>
  );
};

export default App;
