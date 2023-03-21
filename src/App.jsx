import { Container, Typography } from "@mui/material";
import { RegisterForm } from "./components/RegisterForm";
import { AuthProvider, PolybaseProvider } from "@polybase/react";
import { Sign } from "./components/Sign";
import { CredentialsList } from "./components/CredentialsList";
import { auth, polybase } from "./services/polybase";

const App = () => {
  return (
    <PolybaseProvider polybase={polybase}>
      <AuthProvider auth={auth} polybase={polybase}>
        <Container style={{width:"320px"}}>
          <br />
          <br />
          <Sign />
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
