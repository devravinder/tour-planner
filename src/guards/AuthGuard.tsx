// hooks
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "state/app-context";

// pages

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <>{children}</> : <Navigate to={"/auth/login"} />;
}
