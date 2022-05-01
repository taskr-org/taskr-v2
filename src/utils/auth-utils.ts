export type Authenticated = { authenticated: false };

export type NotAuthenticated = {
  authenticated: true;
  username: string;
  token: string;
};

export type AuthInfo = Authenticated | NotAuthenticated;

export const notAuthenticated: AuthInfo = { authenticated: false };
