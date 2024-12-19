import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, StyleSheet } from "react-native";
// 컴포넌트
import BackHeader from "../../../assets/reuseComponents/headerComponents/BackHeader";
// 디자인
import { Gray_Color } from "../../../assets/colors/theme_colors";
// 데이터
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../data/firebase";

export default function EditInfoScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 로그인된 사용자의 정보 저장
      } else {
        setUser(null); // 로그아웃 시 사용자 정보 초기화
      }
      console.log(user);
    });

    return () => unsubscribe(); // 언마운트 시 구독 해제
  }, []);
  return (
    <SafeAreaView style={styles.contaier}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View>
        <Text>하이</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: Gray_Color.white,
  },
});
