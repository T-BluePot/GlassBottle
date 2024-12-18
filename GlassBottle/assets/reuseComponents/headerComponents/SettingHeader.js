import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Gray_Color } from "../../colors/theme_colors";
import { font_styles } from "../../fonts/fontSyle";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SettingHeader({ children, onPress }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{children}</Text>
      <TouchableOpacity
        style={styles.setting}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <AntDesign name="setting" size={24} color={Gray_Color.gray_60} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    position: "absolute",
    right: 0,
  },
  headerText: {
    marginLeft: 16,
    ...font_styles.subtitle,
    color: Gray_Color.black,
  },
  setting: {
    position: "absolute",
    right: 24,
  },
});
