import React, { createContext, useEffect, useState } from "react";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appearance, View } from "react-native";
import { ThemeProvider, darkTheme, lightTheme } from "./contexts/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { StyleSheet } from "react-native";
import { forSlide } from "./utils/interpolators";
import { AuthenticationInfo, storage } from "./utils/Utils";
import { StorageKeys } from "./utils/Constants";
import { AuthProvider } from "./contexts/AuthContext";
import AuthenticatedStack from "./stacks/Authenticated";
import UnauthenticatedStack from "./stacks/Unauthenticated";

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

export default async function Main() {
  const [currentTheme, setCurrentTheme] = useState(
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
  );

  const ai = await storage.getMapAsync<AuthenticationInfo>(
    StorageKeys.AUTH_INFO
  );

  const [authInfo, setAuthInfo] = useState<AuthenticationInfo>(
    ai == undefined ? { authenticated: false } : ai
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
    root: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: currentTheme.bg,
    },
  });

  return (
    <PaperProvider theme={theme}>
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
              authInfo,
              setAuthInfo: (ai: AuthenticationInfo) => {
                storage.setMap(StorageKeys.AUTH_INFO, ai);
                setAuthInfo(ai);
              },
            }}
          >
            <View style={ls.root}>
              <SafeAreaView style={ls.safeArea}>
                {authInfo.authenticated ? (
                  <AuthenticatedStack />
                ) : (
                  <UnauthenticatedStack />
                )}
              </SafeAreaView>
            </View>
          </AuthProvider>
        </ThemeProvider>
        <StatusBar style={currentTheme.statusBar as StatusBarStyle} />
      </NavigationContainer>
    </PaperProvider>
  );
}
