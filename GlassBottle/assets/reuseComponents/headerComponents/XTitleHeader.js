import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Gray_Color } from "../../colors/theme_colors";
import { font_styles } from "../../fonts/fontSyle";
import Octicons from "@expo/vector-icons/Octicons";

export default function XTitleHeader({ onPress, children }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerTouch}
        onPress={onPress}
      >
        <Text style={styles.headerText}>{children}</Text>
        <Octicons
          name="x"
          size={24}
          color={Gray_Color.gray_80}
          style={styles.backBtn}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  headerTouch: {
    flexDirection: "row",
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
});
