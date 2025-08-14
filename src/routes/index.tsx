import { AppLayout } from "@/pages/_layout/app";
import { EventRegistrationPage } from "@/pages/app/events";
import { Home } from "@/pages/app/home";
import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layout/auth";
import { SignIn } from "../pages/auth/sign-in";
import { PrivateRoute } from "./private-routes";

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
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <AppLayout />,
        children: [
          {
            path: "calendar",
            element: <Home />,
          },
          {
            path: "events",
            element: <EventRegistrationPage />,
          },
        ],
      },
    ],
  },
]);
