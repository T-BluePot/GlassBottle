import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Gray_Color } from "../../colors/theme_colors";
import { font_styles } from "../../fonts/fontSyle";

export default function Header({ children }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{children}</Text>
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
});
