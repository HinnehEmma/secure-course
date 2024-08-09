import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/router.jsx";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context.jsx";
import { RegistrationsProvider } from "./context/registration-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RegistrationsProvider>
        <RouterProvider router={router} />
        <Toaster />
      </RegistrationsProvider>
    </AuthProvider>
  </React.StrictMode>
);
