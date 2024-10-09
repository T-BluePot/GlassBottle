import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Stack으로 관리할 Component
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
