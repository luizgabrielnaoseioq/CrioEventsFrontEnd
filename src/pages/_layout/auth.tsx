import { Outlet } from "react-router-dom";
import background from "@/assets/background-sign-in.jpg";

export function AuthLayout() {
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="flex items-center">
        <img src={background} className="object-fit h-full" />
      </div>
      <Outlet />
    </div>
  );
}
