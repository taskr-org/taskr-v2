import React, { useEffect, useState } from "react";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appearance, View } from "react-native";
import { ThemeProvider } from "./contexts/ThemeContext";
import { darkTheme, lightTheme } from "./misc/themes";
import { NavigationContainer } from "@react-navigation/native";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { StyleSheet } from "react-native";
import { getFromDef, storage } from "./utils/generic-utils";
import { StorageKeys } from "./utils/constants";
import { AuthProvider } from "./contexts/AuthContext";
import AuthenticatedStack from "./stacks/Authenticated";
import UnauthenticatedStack from "./stacks/Unauthenticated";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { AuthInfo, notAuthenticated } from "./utils/auth-utils";

export const theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  dark: true,
  fonts: configureFonts({
    android: {
      regular: {
        fontFamily: "Inter-Medium",
        fontWeight: "normal",
      },
      medium: {
        fontFamily: "Inter-Medium",
        fontWeight: "normal",
      },
      light: {
        fontFamily: "Inter-Regular",
        fontWeight: "normal",
      },
      thin: {
        fontFamily: "Inter-Thin",
        fontWeight: "normal",
      },
    },
  }),
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4F5860",
    placeholder: "#4F5860",
    accent: "#f1c40f",
    text: "#CAD3DB",
  },
};

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
  );

  const [authInfo, setAuthInfo] = useMMKVStorage<AuthInfo>(
    StorageKeys.AUTH_INFO,
    storage,
    notAuthenticated
  );

  // change app theme when the system theme changes
  useEffect(() => {
    const listener = (prefs: Appearance.AppearancePreferences) => {
      setCurrentTheme(prefs.colorScheme === "dark" ? darkTheme : lightTheme);
    };

    const event = Appearance.addChangeListener(listener);

    return () => {
      event.remove();
    };
  }, []);

  // change the navigation bar color when the app theme changes
  useEffect(() => {
    changeNavigationBarColor(
      currentTheme.bg,
      currentTheme.bg === lightTheme.bg,
      false
    );
  }, [currentTheme]);

  const ls = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: currentTheme.bg,
    },
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider
            value={{
              theme: currentTheme,
              switchTheme: () =>
                setCurrentTheme(currentTheme.isDark ? lightTheme : darkTheme),
            }}
          >
            <AuthProvider
              value={{
                authInfo: getFromDef(authInfo, notAuthenticated),
                setAuthInfo: (ai) => {
                  storage.setMap(StorageKeys.AUTH_INFO, ai);
                  setAuthInfo(ai);
                },
              }}
            >
              <SafeAreaView style={ls.safeArea}>
                {getFromDef(authInfo, notAuthenticated).authenticated ? (
                  <AuthenticatedStack />
                ) : (
                  <UnauthenticatedStack />
                )}
              </SafeAreaView>
            </AuthProvider>
          </ThemeProvider>
          <StatusBar style={currentTheme.statusBar as StatusBarStyle} />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
