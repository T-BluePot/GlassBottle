import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Main_color, Gray_Color } from "../../assets/colors/theme_colors";
import { font_styles } from "../../assets/fonts/fontSyle";
// component 관련
import BackHeader from "../../assets/reuseComponents/headerComponents/BackHeader";
import Button from "../../assets/reuseComponents/Button";

export default function SignUpEndScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contentsContainer}>
        <View
          style={{
            marginVertical: 36,
          }}
        >
          <Text style={styles.loginTitle}>회원 가입이</Text>
          <Text style={styles.loginTitle}>완료되었습니다!</Text>
          <Text style={styles.loginSubTitle}>
            버튼을 누르면 로그인 화면으로 이동합니다
          </Text>
        </View>
      </View>
      <View style={styles.bottomContents}>
        <Button
          style={styles.btn}
          btn_text={"로그인 하러 가기"}
          onPress={() => {
            navigation.navigate("login");
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
    flex: 1,
    paddingHorizontal: 24,
  },
  loginTitle: {
    ...font_styles.title_01,
    color: Gray_Color.black,
  },
  loginSubTitle: {
    marginTop: 8,
    ...font_styles.body,
    color: Gray_Color.gray_40,
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
  bottomSub: {
    ...font_styles.description,
    fontSize: 10,
    color: Gray_Color.gray_40,
  },
});
