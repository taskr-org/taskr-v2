import { createContext } from "react";
import { AuthInfo } from "../utils/auth-utils";

type AuthContext = {
  authInfo: AuthInfo;
  setAuthInfo: (ai: AuthInfo) => void;
};

export const AuthContext = createContext<AuthContext>({
  authInfo: { authenticated: false },
  setAuthInfo: () => {},
});

export const AuthProvider = AuthContext.Provider;
