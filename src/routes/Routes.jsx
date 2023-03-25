import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CredentialsList } from "../components/CredentialsList";
import { RegisterForm } from "../components/RegisterForm";
import { SelectNetwork } from "../pages/SelectNetwork";
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
    }
  ]);

  return <RouterProvider router={router} />;
};
