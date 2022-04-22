import React, { useEffect, useState } from "react";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Appearance, View } from "react-native";
import { ThemeProvider, darkTheme, lightTheme } from "./utils/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { StyleSheet } from "react-native";
import { forSlide } from "./utils/interpolators";

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
  // keep track of app theme so that it can be changed internally
  const [currentTheme, setCurrentTheme] = useState(() =>
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
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
          <View style={ls.root}>
            <SafeAreaView style={ls.safeArea}>
              <App />
            </SafeAreaView>
          </View>
        </ThemeProvider>
        <StatusBar style={currentTheme.statusBar as StatusBarStyle} />
      </NavigationContainer>
    </PaperProvider>
  );
}

const Stack = createStackNavigator<StackParamList>();

function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
