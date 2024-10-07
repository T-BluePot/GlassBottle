import * as React from "react";
import { useState, useEffect } from "react";
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

export default function SignUpScreen({ navigation }) {
  const [nameText, setNameText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [checkPwText, setCheckPwText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
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
            height: 60,
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
          underlineColor={Main_color.main_40}
          activeUnderlineColor={Main_color.mainHard_50}
          textColor={Gray_Color.black}
          style={{
            height: 60,
            justifyContent: "center",
            backgroundColor: Gray_Color.white,
            paddingHorizontal: 4,
            marginBottom: 8,
          }}
        ></TextInput>
        <View>
          {emailText !== "" && !emailText.includes("@") ? (
            <Text
              style={{
                ...font_styles.description,
                color: Main_color.mainHard_10,
                marginLeft: 6,
              }}
            >
              이메일 형식에 맞지 않습니다
            </Text>
          ) : null}
        </View>
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
            marginTop: 10,
            marginBottom: 8,
          }}
        ></TextInput>
        <TextInput
          label="비밀번호 확인"
          value={checkPwText}
          onChangeText={(text) => setCheckPwText(text)}
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
            marginTop: 10,
            marginBottom: 8,
          }}
        ></TextInput>
        <View>
          {checkPwText !== "" ? (
            <Text
              style={{
                ...font_styles.description,
                color:
                  checkPwText !== passwordText
                    ? Main_color.mainHard_10
                    : Main_color.mainHard_50,
                marginLeft: 6,
              }}
            >
              {checkPwText !== passwordText
                ? "비밀번호가 일치하지 않습니다"
                : "비밀번호가 확인되었습니다"}
            </Text>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContents}>
        <Button
          style={styles.btn}
          btn_text={"회원 가입하기"}
          onPress={() => {
            navigation.navigate("signUp");
          }}
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
    marginVertical: 32,
    ...font_styles.title_01,
    color: Gray_Color.black,
    textAlign: "center",
  },
  bottomContents: {
    width: "100%",
    position: "absolute",
    bottom: 24,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  btn: {
    width: "100%",
  },
});
