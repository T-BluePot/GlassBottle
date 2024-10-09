import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>메인 화면</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
