import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// design 관련
import { Main_color, Gray_Color } from "../../assets/colors/theme_colors";
import { font_styles } from "../../assets/fonts/fontSyle";
// component 관련
import TitleBackHeader from "../../assets/reuseComponents/headerComponents/TitleBackHeader";
import Button from "../../assets/reuseComponents/otherComponents/Button";
import showToast from "../../assets/reuseComponents/functions/showToast";
import { isValidEmail } from "../../assets/reuseComponents/functions/checkEmail";
// data 관련
import { auth } from "../../data/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth"; // 회원 정보(이메일,비밀번호, 닉네임)를 저장하기 위한 메서드

export default function SignUpScreen({ navigation }) {
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [checkPwText, setCheckPwText] = useState("");

  const fieldEmpty =
    nameText === "" ||
    emailText === "" ||
    passwordText === "" ||
    checkPwText === "";

  const fieldInvalid =
    !isValidEmail(emailText) ||
    passwordText.length <= 6 ||
    checkPwText !== passwordText;

  const handleSignUp = async () => {
    // 입력 필드가 비어 있는지 확인
    if (fieldEmpty) {
      return;
    }

    // 이메일 형식 확인 및 비밀번호 확인
    if (fieldInvalid) {
      showToast("항목을 올바르게 작성해주세요");
      return;
    }

    // 이미 가입된 이메일인지 확인
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, emailText);
      if (signInMethods.length > 0) {
        // 이메일이 이미 등록된 경우
        showToast("이미 가입된 이메일입니다");
        return; // 더 이상 진행하지 않음
      }
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      showToast("이메일 중복 확인 중 오류가 발생했습니다.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailText,
        passwordText
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: nameText });
      showToast("가입을 환영합니다!");
      navigation.replace("join");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showToast("이미 가입된 이메일입니다.");
      } else if (error.code === "auth/weak-password") {
        showToast("비밀번호는 최소 6자리 이상이어야 합니다.");
      } else {
        console.error("회원가입 실패:", error.message);
        showToast("오류가 발생하였습니다.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <TitleBackHeader
          onPress={() => {
            navigation.goBack();
          }}
          children={"회원가입"}
        />
        <View style={styles.contentsContainer}>
          <Text style={styles.loginTitle}>가입하기</Text>

          <TextInput
            label="닉네임"
            value={nameText}
            onChangeText={(text) => setNameText(text)}
            keyboardType="ascii-capable"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 72,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
              marginTop: 10,
              marginBottom: 8,
            }}
          ></TextInput>
          <TextInput
            label="이메일"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 72,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
              marginBottom: 8,
            }}
          ></TextInput>
          {emailText !== "" && (
            <View>
              {!isValidEmail(emailText) ? (
                <Text
                  style={{
                    ...font_styles.description_p,
                    color: Main_color.main_red,
                    marginLeft: 6,
                  }}
                >
                  이메일 형식이 올바르지 않아요.
                </Text>
              ) : (
                <Text
                  style={{
                    ...font_styles.description_p,
                    color: Main_color.mainHard_50,
                    marginLeft: 6,
                  }}
                >
                  이메일이 올바르게 작성되었어요!
                </Text>
              )}
            </View>
          )}
          <TextInput
            label="비밀번호"
            value={passwordText}
            onChangeText={(text) => setPasswordText(text)}
            secureTextEntry={true}
            keyboardType="default"
            autoCapitalize="none"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 72,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
              marginTop: 10,
              marginBottom: 8,
            }}
          ></TextInput>
          {passwordText !== "" && (
            <View>
              {passwordText.length <= 6 ? (
                <Text
                  style={{
                    ...font_styles.description_p,
                    color: Main_color.main_red,
                    marginLeft: 6,
                  }}
                >
                  아직 6자리가 아니에요
                </Text>
              ) : (
                <Text
                  style={{
                    ...font_styles.description_p,
                    color: Main_color.mainHard_50,
                    marginLeft: 6,
                  }}
                >
                  비밀번호가 올바르게 작성되었어요!
                </Text>
              )}
            </View>
          )}
          <TextInput
            label="비밀번호 확인"
            value={checkPwText}
            onChangeText={(text) => setCheckPwText(text)}
            secureTextEntry={true}
            keyboardType="default"
            autoCapitalize="none"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 72,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
              marginTop: 10,
              marginBottom: 8,
            }}
          ></TextInput>
          <View>
            {checkPwText !== "" ? (
              <Text
                style={{
                  ...font_styles.description_p,
                  color:
                    checkPwText !== passwordText
                      ? Main_color.main_red
                      : Main_color.mainHard_50,
                  marginLeft: 6,
                }}
              >
                {checkPwText !== passwordText
                  ? "비밀번호가 일치하지 않아요."
                  : "완벽해요!"}
              </Text>
            ) : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomContents}>
        <Button
          style={{
            backgroundColor:
              fieldEmpty || fieldInvalid
                ? Gray_Color.gray_20
                : Main_color.mainHard_50,
          }}
          btn_text={"계속하기"}
          onPress={handleSignUp}
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
  loginTitle: {
    marginVertical: 60,
    ...font_styles.title_01,
    color: Gray_Color.black,
  },
  bottomContents: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  btn: {
    width: "100%",
  },
});
