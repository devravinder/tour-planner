import { AppContext } from ".";
import useWebStorage from "hooks/useWebStorage";

const emptyAuthUers: AuthUser = {
  name: "",
  email: "",
  userType: "GUEST",
  image: "",
};
export default function AppContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [user, setUser] = useWebStorage("user", emptyAuthUers, "localStorage"); //useState<AuthUser>();
  const [isAuthenticated, setIsAuthenticated] = useWebStorage(
    "isAuthenticated",
    false,
    "localStorage",
  ); //useState<boolean>();

  return (
    <AppContext.Provider
      value={{
        user: user,
        setUser: setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
