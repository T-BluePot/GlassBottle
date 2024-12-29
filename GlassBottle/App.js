import * as React from "react";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Navigation을 사용하기 위함
import { PaperProvider } from "react-native-paper"; // react-native-paper 라이브러리를 사용하기 위함
import AsyncStorage from "@react-native-async-storage/async-storage"; // 로컬에 정보를 저장 -> 사용자 로그인 여부
// data 관련
import { AuthProvider } from "./data/LoginContext";
// fonts 관련
import * as Font from "expo-font";
// component 관련 - navigation을 import
import AuthNavigation from "./components/AuthNavigation ";
import { Main_color } from "./assets/colors/theme_colors";

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
      "Ongliep-BakDaHyun": require("./assets/fonts/온글잎 박다현체.ttf"),
    });
    setFontsLoaded(true); // 폰트 로드가 완료되면 상태를 변경
  };

  useEffect(() => {
    loadFonts(); // 앱이 시작될 때 폰트를 로드
  }, []);

  // 로컬 저장 내용을 초기화
  // 뭐 만들다가 로컬 비워버리고 싶을 때 사용하셈
  // useEffect 내부에 함수 선언하면 싹 비워짐
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage가 초기화되었습니다.");
    } catch (error) {
      console.error("AsyncStorage 초기화 중 오류 발생:", error);
    }
  };

  // 폰트 또는 로그인 상태가 로드되지 않았을 때 로딩 화면을 표시
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Main_color.mainHard_50} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
