import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/app/_layout/auth";
import { SignIn } from "../pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
        { 
            path: '',
            element: <SignIn />
        }
    ]
  },
]);
