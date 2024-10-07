import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native"; // Navigation을 사용하기 위함
import { PaperProvider } from "react-native-paper"; // react-native-paper 라이브러리를 사용하기 위함
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로컬에 정보를 저장 -> 사용자 로그인 여부
// fonts 관련
import * as Font from "expo-font";

// component 관련 - navigation을 import
import LoginStack from "./components/loginComponents/LoginStaack";

export default function App() {
  // 폰트 로드를 위한 state 변수
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 폰트를 로드하는 함수
  const loadFonts = async () => {
    await Font.loadAsync({
      // 따옴표로 작성된 변수명이 폰트 이름입니다.
      // Text style 지정 시 해당 변수명을 사용하여 작성해주세요.
      "Pretendard-Black": require("./assets/fonts/Pretendard-Black.ttf"),
      "Pretendard-ExtraBold": require("./assets/fonts/Pretendard-ExtraBold.ttf"),
      "Pretendard-Bold": require("./assets/fonts/Pretendard-Bold.ttf"),
      "Pretendard-SemiBold": require("./assets/fonts/Pretendard-SemiBold.ttf"),
      "Pretendard-Medium": require("./assets/fonts/Pretendard-Medium.ttf"),
      "Pretendard-Regular": require("./assets/fonts/Pretendard-Regular.ttf"),
      "Pretendard-Light": require("./assets/fonts/Pretendard-Light.ttf"),
      "Pretendard-ExtraLight": require("./assets/fonts/Pretendard-ExtraLight.ttf"),
      "Pretendard-Thin": require("./assets/fonts/Pretendard-Thin.ttf"),
    });
    setFontsLoaded(true); // 폰트 로드가 완료되면 상태를 변경
  };

  useEffect(() => {
    loadFonts(); // 앱이 시작될 때 폰트를 로드
  }, []);

  // 유저의 로그인 여부를 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 화면이 랜더링 될 때 로그인 여부를 판단
  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await AsyncStorage.getItem("isLoggedIn");
      if (status === "true") {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  if (!fontsLoaded) {
    // 폰트가 로드되기 전에는 로딩 화면을 표시
    return null;
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <LoginStack />
      </PaperProvider>
    </NavigationContainer>
  );
}
