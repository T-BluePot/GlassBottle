import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
// design 관련
import { Gray_Color } from "../../colors/theme_colors";
import { font_styles } from "../../fonts/fontSyle";
import Octicons from "@expo/vector-icons/Octicons";

export default function BackHeader({ onPress }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Octicons name="chevron-left" size={24} color={Gray_Color.gray_80} />
        <Text style={styles.headerText}>뒤로가기</Text>
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
  headerText: {
    marginLeft: 16,
    ...font_styles.caption,
    color: Gray_Color.gray_60,
  },
});
