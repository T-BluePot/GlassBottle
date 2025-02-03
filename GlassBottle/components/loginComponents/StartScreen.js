import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// design 관련
import { Main_color, Gray_Color } from "../../assets/colors/theme_colors"; // 메인 색상
import { font_styles } from "../../assets/fonts/fontSyle"; // 메인 폰트 스타일
import loginImage_path from "../../assets/images/login_file/loginImage_path";
// componenet 관련
import Button from "../../assets/reuseComponents/otherComponents/Button";

export default function StartScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={loginImage_path.logo} style={styles.mainLogo}></Image>
      <View>
        <Text
          style={{
            ...font_styles.main_title,
            textAlign: "center",
            color: Main_color.mainHard_50,
          }}
        >
          GlassBottle
        </Text>
        <Text
          style={{
            ...font_styles.description,
            textAlign: "center",
            color: Gray_Color.gray_40,
          }}
        >
          일상 속 비밀 친구
        </Text>
      </View>
      <View style={styles.bottomContents}>
        <Button
          style={styles.btn}
          btn_text={"시작하기"}
          onPress={() => {
            navigation.navigate("login");
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.bottomSub}>시작하기를 누르면 </Text>
          <Text style={{ ...styles.bottomSub, fontStyle: "normal" }}>
            이용약관
          </Text>
          <Text style={styles.bottomSub}> / </Text>
          <Text style={styles.bottomSub}>개인정보 처리방침</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  mainLogo: {
    width: 250,
    height: 250,
    marginBottom: 60,
  },
  btn: {
    width: "100%",
    marginBottom: 16,
  },
  btnTitle: { ...font_styles.subtitle, color: Gray_Color.white },
  bottomContents: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 24,
    bottom: 24,
    alignItems: "center",
  },
  bottomSub: {
    ...font_styles.description,
    fontSize: 10,
    color: Gray_Color.gray_40,
  },
});
