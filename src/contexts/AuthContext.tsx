import { createContext } from "react";
import { AuthenticationInfo } from "../utils/Utils";

type AuthContext = {
  authInfo: AuthenticationInfo;
  setAuthInfo: (ai: AuthenticationInfo) => void;
};

export const AuthContext = createContext<AuthContext>({
  authInfo: { authenticated: false },
  setAuthInfo: () => {},
});

export const AuthProvider = AuthContext.Provider;
