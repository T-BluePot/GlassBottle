import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Main_color, Gray_Color } from "../../assets/colors/theme_colors";
import { font_styles } from "../../assets/fonts/fontSyle";
// component 관련
import BackHeader from "../../assets/reuseComponents/headerComponents/BackHeader";
import Button from "../../assets/reuseComponents/Button";
import showToast from "../../assets/reuseComponents/showToast";

export default function LoginScreen({ navigation }) {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const handleLogin = () => {
    if (emailText === "" || passwordText === "") {
      showToast("모든 항목을 입력해주세요");
    } else {
      console.log("와");
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
          <TextInput
            label="이메일"
            value={emailText}
            onChangeText={(text) => setEmailText(text)}
            keyboardType="email-address"
            underlineColor={Main_color.main_40}
            activeUnderlineColor={Main_color.mainHard_50}
            textColor={Gray_Color.black}
            style={{
              height: 60,
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
              height: 60,
              justifyContent: "center",
              backgroundColor: Gray_Color.white,
              paddingHorizontal: 4,
              marginBottom: 16,
            }}
          ></TextInput>
        </View>
        <View style={styles.bottomContents}>
          <Button
            style={{
              width: "100%",
            }}
            btn_text={"로그인 하기"}
            onPress={handleLogin}
          />
          <View style={styles.signUp}>
            <Text
              style={{ ...font_styles.description, color: Gray_Color.gray_40 }}
            >
              회원이 아니신가요?
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate("check");
              }}
            >
              <Text
                style={{
                  marginLeft: 6,
                  ...font_styles.description,
                  color: Main_color.mainHard_50,
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
    marginVertical: 32,
    ...font_styles.title_01,
    color: Gray_Color.black,
    textAlign: "center",
  },
  bottomContents: {
    marginTop: 60,
    alignItems: "flex-end",
  },
  signUp: {
    marginTop: 12,
    flexDirection: "row",
  },
});
