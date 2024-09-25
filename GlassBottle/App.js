import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { font_styles } from "./assets/fonts/fontSyle";

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

  if (!fontsLoaded) {
    return null; // 폰트가 로드되기 전에는 아무것도 렌더링하지 않음
  }
  return (
    <View style={styles.container}>
      <Text style={font_styles.header}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
