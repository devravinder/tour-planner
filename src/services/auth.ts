import { localStorage } from "state/webStorage";

export const login = () => {
  // some login logic
};

export const postLogin = (user: AuthUser) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isAuthenticated", JSON.stringify(true));
};

export const postLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
};
