type AppTheme = {
  isDark: boolean;

  statusBar: string;
  bg: string;
  text: string;
  accentColor: string;
};

type AuthenticatedSPL = {
  Home: undefined;
  CreateTask: undefined;
};

type UnauthenticatedSPL = {
  Login: undefined;
  Register: undefined;
};

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
