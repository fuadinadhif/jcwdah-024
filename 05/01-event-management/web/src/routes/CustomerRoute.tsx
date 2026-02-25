import { useAuthStore } from "@/store/auth-store";
import { Navigate, Outlet } from "react-router";

export default function CustomerRoute() {
  const { user } = useAuthStore();

  if (!user || !user.role) return <Navigate to="/auth/login" />;

  if (user.role !== "CUSTOMER") return <Navigate to="/organizer/profile" />;

  return <Outlet />;
}
