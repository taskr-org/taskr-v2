import { createContext } from "react";
import { Authenticated, AuthInfo } from "../utils/auth-utils";

export type AuthContext = {
  authInfo: AuthInfo;
  setAuthInfo: (ai: AuthInfo) => void;
};

/**
 * can be used in authenticated stacks where the
 * value of authInfo will never be Unauthenticated
 */
export type SureAuthContext = {
  authInfo: Authenticated;
  setAuthInfo: (ai: AuthInfo) => void;
};

export const AuthContext = createContext<AuthContext>({
  authInfo: { authenticated: false },
  setAuthInfo: () => {},
});

export const AuthProvider = AuthContext.Provider;
