import { Context } from "react";
import { AuthContext, SureAuthContext } from "../contexts/AuthContext";

export type NotAuthenticated = { authenticated: false };

export type Authenticated = {
  authenticated: true;
  username: string;
  token: string;
};

export type AuthInfo = Authenticated | NotAuthenticated;

export const notAuthenticated: AuthInfo = { authenticated: false };

// only to be used in situations when c can NEVER have NotAuthenticated
// for example, inside navigations stacks that render conditionally
export const sure = (c: Context<AuthContext>) => c as Context<SureAuthContext>;
