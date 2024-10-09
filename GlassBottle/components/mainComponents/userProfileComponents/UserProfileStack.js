import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Stack으로 관리할 Component
import UserProfileScreen from "./UserProfileScreen";

const Stack = createStackNavigator();

export default function UserProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
