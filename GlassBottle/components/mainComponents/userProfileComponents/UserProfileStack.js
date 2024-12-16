import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Stack으로 관리할 Component
import UserProfileScreen from "./UserProfileScreen";
import ResignScrren from "./ResignScrren";
import ReLoginScreen from "./ReLoginScreen";
import { font_styles } from "../../../assets/fonts/fontSyle";

const Stack = createStackNavigator();

export default function UserProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
      ></Stack.Screen>
      <Stack.Screen name="resign" component={ResignScrren}></Stack.Screen>
      <Stack.Screen name="relogin" component={ReLoginScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
