import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CredentialsList } from "../pages/CredentialsList";
import { RegisterForm } from "../pages/RegisterForm";
import { Credential } from "../pages/Credential";
import { PageConstruction } from "../pages/PageConstruction";
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
      path: "/register-form",
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
    {
      path: "/under-construction",
      element: <PageConstruction />,
    },
  ]);

  return <RouterProvider router={router} />;
};
