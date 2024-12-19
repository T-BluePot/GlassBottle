import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// 디자인 관련
import XTitleHeader from "../../../assets/reuseComponents/headerComponents/XTitleHeader";
import { Gray_Color, Main_color } from "../../../assets/colors/theme_colors";
import Button from "../../../assets/reuseComponents/otherComponents/Button";
import { font_styles } from "../../../assets/fonts/fontSyle";
import useHideBottomBar from "../../../assets/reuseComponents/functions/useHideBottomBar";

export default function ResignScreen({ navigation }) {
  useHideBottomBar(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <XTitleHeader
          children={"탈퇴하기"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.describeContainer}>
          <Text style={font_styles.title_01}>정말 탈퇴하시겠어요?</Text>
          <View
            style={{
              marginVertical: 32,
            }}
          >
            <Text
              style={{
                ...font_styles.body,
                color: Gray_Color.black,
                lineHeight: 24,
              }}
            >
              회원 탈퇴 시 편지는 소멸되며, {"\n"}계정 정보는 복구되지 않습니다.
            </Text>
          </View>
        </View>
      </View>
      <Button
        btn_text={"네, 확인했어요"}
        style={{
          backgroundColor: Main_color.main_red,
          marginBottom: 24,
          marginHorizontal: 24,
        }}
        onPress={() => {
          navigation.navigate("relogin");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_Color.white,
    justifyContent: "space-between",
  },
  describeContainer: {
    padding: 24,
    marginTop: 8,
  },
  footerContents: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  checkcap: {
    ...font_styles.caption,
    color: Gray_Color.black,
    marginLeft: 8,
    letterSpacing: -0.4,
  },
});
