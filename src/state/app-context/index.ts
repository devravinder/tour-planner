import { createContext, useContext } from "react";

type ContextState = {
  user?: AuthUser;
  isAuthenticated?: boolean;
  setUser: (user: AuthUser) => void;
  setIsAuthenticated: (value: boolean) => void;
};

export const AppContext = createContext<ContextState>({} as ContextState);

export const useAppContext = () => {
  return useContext(AppContext);
};
