import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import { Sign } from "../components/Sign";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sign />,
    },
    {
      path: "/RegisterForm",
      element: <RegisterForm />,
    },
  ]);

  return <RouterProvider router={router} />;
};
