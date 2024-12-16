import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Main_color, Gray_Color } from "../../assets/colors/theme_colors";
import { font_styles } from "../../assets/fonts/fontSyle";
// component 관련
import BackHeader from "../../assets/reuseComponents/headerComponents/BackHeader";
import Button from "../../assets/reuseComponents/otherComponents/Button";

export default function SignUpCheckScreen({ navigation }) {
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
          <Text style={styles.loginTitle}>반가워요!</Text>
          <Text style={styles.loginTitle}>회원 가입을 하시겠어요?</Text>
          <Text style={styles.loginSubTitle}>GlassBottle과 함께해요!</Text>
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
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.bottomSub}>회원 가입 시 </Text>
          <Text style={{ ...styles.bottomSub, fontStyle: "normal" }}>
            이용약관
          </Text>
          <Text style={styles.bottomSub}> / </Text>
          <Text style={styles.bottomSub}>개안정보 처리방침</Text>
          <Text style={styles.bottomSub}> 동의로 간주합니다</Text>
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
    marginBottom: 16,
  },
  bottomSub: {
    ...font_styles.description,
    fontSize: 10,
    color: Gray_Color.gray_40,
  },
});
