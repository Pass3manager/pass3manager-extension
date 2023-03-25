import React from "react";
import ReactDOM from "react-dom/client";
import { PolybaseProvider } from "@polybase/react";
import { polybase } from "./services/polybase";
import App from "./App";
import { AuthProvider } from "./context/useAuth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PolybaseProvider polybase={polybase}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PolybaseProvider>
  </React.StrictMode>
);
