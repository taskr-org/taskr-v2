import React from "react";

export const darkTheme: AppTheme = {
  isDark: true,

  statusBar: "light",
  bg: "#181E23",
  text: "#fbfbfb",
  accentColor: "#4F5860",
};

export const lightTheme: AppTheme = {
  isDark: false,

  statusBar: "dark",
  bg: "#F5F5F5",
  text: "#1a2552",
  accentColor: "#4C67D4",
};

type ThemeContext = {
  theme: AppTheme;
  switchTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContext>({
  theme: darkTheme,
  switchTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;