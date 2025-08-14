import { redirect } from "react-router-dom";
import { useAuthStore } from "@/pages/auth/store/auth-store";  

export function getCurrentUserRole(): "USER" | "ADMIN" | null {
  try {
    const { user } = useAuthStore.getState();  
    return user?.role ?? null;
  } catch {
    return null;
  }
}

export function requireRole(
  allowedRoles: ("USER" | "ADMIN")[]
) {
  return async () => {
    const role = getCurrentUserRole();

    if (!role || !allowedRoles.includes(role)) {
      return redirect("/home");
    }

    return null;
  };
}
