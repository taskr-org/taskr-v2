import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { forSlide } from "../utils/interpolators";
import Home from "../screens/authenticated/Home";
import { CreateTask } from "../screens/authenticated/CreateTask";

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
      <Stack.Screen name="CreateTask" component={CreateTask} />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
