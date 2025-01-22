// 로그인 여부에 따라 다른 화면이 랜더링 될 수 있도록 함
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../data/LoginContext";

// component 관련 - navigation을 import
import LoginStack from "./loginComponents/LoginStack";
import BottomStack from "./mainComponents/BottomStack";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Main"
          component={BottomStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
