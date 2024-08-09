import AppLayout from "@/pages/app-layout";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import NotFound from "@/pages/not-found";
import RootPage from "@/pages/root";
import Dashboard from "@/pages/sys/dashboard";
import NewRegistrationPage from "@/pages/sys/new-registration";
import Registration from "@/pages/sys/registration";
import Timetable from "@/pages/sys/timetable";
import { createBrowserRouter } from "react-router-dom";

//  This file is where you create all the routes to your project
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    errorElement: <NotFound />,
  },
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <NotFound />,
      },
      {
        path: "registration",
        element: <Registration />,
        errorElement: <NotFound />,
      },
      {
        path: "timetable",
        element: <Timetable />,
        errorElement: <NotFound />,
      },
      {
        path: "registration/new",
        element: <NewRegistrationPage />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
