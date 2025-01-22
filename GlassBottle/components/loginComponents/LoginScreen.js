import * as React from "react";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// design 관련
import { Main_color, Gray_Color } from "../../assets/colors/theme_colors";
import { font_styles } from "../../assets/fonts/fontSyle";
// component 관련
import BackHeader from "../../assets/reuseComponents/headerComponents/BackHeader";
import Button from "../../assets/reuseComponents/otherComponents/Button";
import showToast from "../../assets/reuseComponents/functions/showToast";
import { isValidEmail } from "../../assets/reuseComponents/functions/checkEmail";
// data 관련
import { useAuth } from "../../data/LoginContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../data/firebase";

export default function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = useAuth();

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const loginCheck = async () => {
    // 로그인 여부를 AsyncStorage에 저장
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      showToast("로그인 되었습니다"); // 로그인 성공 메시지
    } catch (error) {
      console.error("Error saving login status", error);
      showToast("로그인에 실패하였습니다. 다시 시도 바랍니다.");
    }
  };

  const handleLogin = async () => {
    if (emailText === "" || passwordText === "") {
      showToast("모든 항목을 입력해주세요");
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

  useFocusEffect(
    useCallback(() => {
      setEmailText("");
      setPasswordText("");
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contentsContainer}>
        <View>
          <Text style={styles.loginTitle}>로그인 하기</Text>
          <View
            style={{
              marginBottom: 16,
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
              secureTextEntry={true} // 비밀번호 숨김 여부
              keyboardType="ascii-capable"
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
        </View>

        <View style={styles.bottomContents}>
          <Button
            style={{
              width: "100%",
            }}
            btn_text={"로그인"}
            onPress={handleLogin}
          />
          <View style={styles.signUp}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("findPW");
              }}
            >
              <Text
                style={{
                  ...styles.bottom_text,
                }}
              >
                비밀번호 재설정
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: 12,
                backgroundColor: Gray_Color.gray_40,
                marginHorizontal: 8,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("signUp");
              }}
            >
              <Text
                style={{
                  ...styles.bottom_text,
                }}
              >
                회원 가입하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  loginTitle: {
    marginVertical: 60,
    ...font_styles.title_01,
    color: Gray_Color.black,
  },
  findPassword: {
    marginBottom: 24,
    alignSelf: "flex-end",
  },
  bottomContents: {
    marginTop: 24,
  },
  signUp: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginRight: 4,
    flexDirection: "row",
  },
  bottom_text: {
    ...font_styles.description_p,
    color: Gray_Color.gray_40,
  },
});
