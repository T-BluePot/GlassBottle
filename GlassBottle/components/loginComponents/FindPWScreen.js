import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";
import BackHeader from "../../assets/reuseComponents/headerComponents/BackHeader";
// style
import { font_styles } from "../../assets/fonts/fontSyle";
import { Gray_Color, Main_color } from "../../assets/colors/theme_colors";
// component
import Button from "../../assets/reuseComponents/otherComponents/Button";
import showToast from "../../assets/reuseComponents/functions/showToast";
import { isValidEmail } from "../../assets/reuseComponents/functions/checkEmail";
// auth
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth"; // fetchSignInMethodsForEmail: eamil 가입 여부
import { auth } from "../../data/firebase";

const FindPWSCcreen = ({ navigation }) => {
  const [emailText, setEmailText] = useState("");
  const handlePW = async () => {
    const signInMethods = await fetchSignInMethodsForEmail(auth, emailText);
    console.log("signInMethods: ", signInMethods);
    try {
      await sendPasswordResetEmail(auth, emailText);
      showToast("이메일이 전송되었습니다");
      setEmailText("");
    } catch (error) {
      console.log(error.message);
      showToast("이메일 전송에 실패하였습니다");
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
        <View style={styles.titleContents}>
          <Text style={styles.Title}>비밀번호 재설정</Text>
          <Text style={styles.subTitle}>
            비밀번호를 잊어버리셨나요?{"\n"}메일 속 링크로 새 비밀번호를 설정할
            수 있어요!
          </Text>
        </View>
        <View>
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
          <Button
            style={styles.btn}
            onPress={() => {
              emailText === ""
                ? showToast("이메일을 입력해주세요")
                : isValidEmail(emailText)
                ? handlePW()
                : showToast("이메일 형식이 올바르지 않습니다");
            }}
            btn_text={"확인"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_Color.white,
  },
  contentsContainer: {
    paddingHorizontal: 24,
  },
  titleContents: {
    marginVertical: 60,
  },
  Title: {
    ...font_styles.title_01,
    color: Gray_Color.black,
  },
  subTitle: {
    marginTop: 8,
    ...font_styles.caption,
    color: Gray_Color.gray_40,
  },
  btn: {
    marginTop: 24,
  },
});

export default FindPWSCcreen;
