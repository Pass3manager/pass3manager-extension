import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CredentialsList } from "../components/CredentialsList";
import { RegisterForm } from "../components/RegisterForm";
import { Credential } from "../pages/Credential";
import { SelectNetwork } from "../pages/SelectNetwork";
import { Settings } from "../pages/Settings";
import { Sign } from "../pages/Sign";

export const Routes = () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <Sign />,
    },
    {
      path: "/RegisterForm",
      element: <RegisterForm />,
    },
    {
      path: "/select-network",
      element: <SelectNetwork />,
    },
    {
      path: "/credential-list",
      element: <CredentialsList />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/get-credential-data",
      element: <Credential />,
    },

  ]);

  return <RouterProvider router={router} />;
};
