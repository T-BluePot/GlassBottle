import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Gray_Color } from "../../colors/theme_colors";
import { font_styles } from "../../fonts/fontSyle";
import Octicons from "@expo/vector-icons/Octicons";

export default function TitleBackHeader({ onPress, children }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: "absolute",
          left: 24,
        }}
        onPress={onPress}
      >
        <Octicons name="chevron-left" size={24} color={Gray_Color.gray_80} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    ...font_styles.body,
    color: Gray_Color.black,
  },
});
