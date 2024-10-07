import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Gray_Color, Main_color } from "../colors/theme_colors";
import { font_styles } from "../../assets/fonts/fontSyle"; // 메인 폰트 스타일

export default function Button({ style, onPress, btn_text }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.btn, style]}
      onPress={onPress}
    >
      <Text style={styles.btnTitle}>{btn_text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 10,
    backgroundColor: Main_color.mainHard_50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: { ...font_styles.subtitle, color: Gray_Color.white },
});
