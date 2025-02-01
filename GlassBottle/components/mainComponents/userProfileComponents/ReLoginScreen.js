import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
// 컴포넌트
import BackHeader from "../../../assets/reuseComponents/headerComponents/BackHeader";
import { isValidEmail } from "../../../assets/reuseComponents/functions/checkEmail";
import Button from "../../../assets/reuseComponents/otherComponents/Button";
import showToast from "../../../assets/reuseComponents/functions/showToast";
// 디자인
import { Gray_Color, Main_color } from "../../../assets/colors/theme_colors";
import { font_styles } from "../../../assets/fonts/fontSyle";
// 회원 정보
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../../../data/firebase";
import { useAuth } from "../../../data/LoginContext";

export default function ReLoginScreen({ navigation }) {
  const { setIsLoggedIn } = useAuth();

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const handleResign = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
        showToast("탈퇴되었습니다.");
      } else {
        showToast("로그인 상태가 아닙니다");
      }
    } catch (error) {
      console.error("회원 탈퇴 오류:", error.message);

      // 에러별 처리
      if (error.code === "auth/requires-recent-login") {
        showToast("재로그인이 필요합니다.");
      } else {
        showToast("탈퇴 중 오류가 발생했습니다.");
      }
    }
  };

  const loginCheck = async () => {
    // 로그인 여부를 AsyncStorage에 저장
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      handleResign();
    } catch (error) {
      console.error("Error saving login status", error);
      showToast("로그인에 실패하였습니다. 다시 시도 바랍니다.");
    }
  };

  const handleLogin = async () => {
    if (emailText === "" || passwordText === "") {
      return;
    }
    if (!isValidEmail(emailText)) {
      showToast("이메일 형식이 맞지 않습니다");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, emailText, passwordText); // Firebase Auth로 로그인 시도
      loginCheck();
    } catch (error) {
      showToast("회원 정보가 없습니다"); // 에러 메시지 출력
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contentsContainer}>
        <View style={styles.desribeSec}>
          <Text style={styles.loginTitle}>재로그인</Text>
          <Text
            style={{
              ...font_styles.body,
              color: Gray_Color.black,
              lineHeight: 24,
            }}
          >
            본인 확인을 위해 재로그인이 필요합니다.{"\n"}재로그인 즉시 탈퇴
            처리됩니다.
          </Text>
        </View>
        <View
          style={{
            marginBottom: 36,
            paddingHorizontal: 16,
          }}
        >
          <TextInput
            label="이메일"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
            keyboardType="email-address"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 72,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
              marginBottom: 16,
            }}
          ></TextInput>
          <TextInput
            label="비밀번호"
            value={passwordText}
            onChangeText={(text) => setPasswordText(text)}
            secureTextEntry={true}
            keyboardType="default"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 72,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
            }}
          ></TextInput>
        </View>
        <Button
          style={{
            width: "100%",
            backgroundColor:
              emailText === "" || passwordText === ""
                ? Gray_Color.gray_20
                : Main_color.main_red,
          }}
          btn_text={"탈퇴하기"}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_Color.white,
  },
  contentsContainer: {
    paddingHorizontal: 24,
  },
  desribeSec: {
    marginTop: 60,
    marginBottom: 24,
  },
  loginTitle: {
    marginBottom: 12,
    ...font_styles.title_01,
    color: Gray_Color.black,
  },
});
