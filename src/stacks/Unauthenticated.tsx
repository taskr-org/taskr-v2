import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { forSlide } from "../utils/interpolators";
import Login from "../screens/unauthenticated/Login";
import Register from "../screens/unauthenticated/Register";

const UnauthenticatedStack = () => {
  const Stack = createStackNavigator<UnauthenticatedSPL>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: forSlide,
        presentation: "transparentModal",
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default UnauthenticatedStack;
