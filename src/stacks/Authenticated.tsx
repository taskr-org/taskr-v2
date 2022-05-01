import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { forSlide } from "../utils/interpolators";
import Home from "../screens/Home";

const AuthenticatedStack = () => {
  const Stack = createStackNavigator<AuthenticatedSPL>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
