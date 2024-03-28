// hooks
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "state/app-context";

// pages

type PublicGuardProps = {
  children: ReactNode;
};

export default function PublicGuard({ children }: PublicGuardProps) {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Navigate to={"/"} /> : <>{children}</>;
}
