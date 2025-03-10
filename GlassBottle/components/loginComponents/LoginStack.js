import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Stack으로 관리할 Component
import StartScreen from "./StartScreen";
import LoginScreen from "./LoginScreen";
import FindPWSCcreen from "./FindPWScreen";
// 로그인 관련
import SignUpCheckScreen from "./SignUpCheckScreen";
import SignUpScreen from "./SignUpScreen";
import SignUpEndScreen from "./SignUpEndScreen";

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="start"
        component={StartScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="check"
        component={SignUpCheckScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="findPW"
        component={FindPWSCcreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="signUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="join"
        component={SignUpEndScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
