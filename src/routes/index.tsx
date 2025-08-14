import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layout/auth";
import { SignIn } from "../pages/auth/sign-in";
import { PrivateRoute } from "./private-routes";
import { Home } from "@/pages/app/home";
import { EventRegistrationPage } from "@/pages/app/events";
import { AppLayout } from "@/pages/_layout/app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/home",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <AppLayout />,
      },
      {
        path: "",
      },
    ],
  },
]);
