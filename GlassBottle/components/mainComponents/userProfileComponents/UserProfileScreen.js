import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function UserProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>내 정보 화면</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
