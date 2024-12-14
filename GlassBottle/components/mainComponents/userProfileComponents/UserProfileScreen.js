import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
// 사용자 정보 관련
import { auth } from "../../../data/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Main_color } from "../../../assets/colors/theme_colors";

export default function UserProfileScreen() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 로그인된 사용자의 정보 저장
      } else {
        setUser(null); // 로그아웃 시 사용자 정보 초기화
      }
    });

    return () => unsubscribe(); // 언마운트 시 구독 해제
  }, []);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Main_color.mainHard_50} />
        {/* 로딩 인디케이터 */}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>내 정보 화면</Text>
        <Text>{user.displayName}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
