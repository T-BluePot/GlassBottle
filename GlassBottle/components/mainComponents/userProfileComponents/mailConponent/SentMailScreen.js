import React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Gray_Color, Main_color } from "../../../../assets/colors/theme_colors";
import { font_styles } from "../../../../assets/fonts/fontSyle";
import TitleBackHeader from "../../../../assets/reuseComponents/headerComponents/TitleBackHeader";

import { subscribeToSentMails } from "../../../../assets/reuseComponents/functions/sentMail";
import useHideBottomBar from "../../../../assets/reuseComponents/functions/useHideBottomBar";

export default function SentMailScreen({ navigation }) {
  useHideBottomBar(navigation);

  const [messages, setMessages] = useState();

  useEffect(() => {
    subscribeToSentMails(setMessages);
  }, []);

  const [expandedItemId, setExpandedItemId] = useState(null);
  // FlatList 참조 생성
  const flatListRef = useRef(null);

  // 항목 확장 및 스크롤을 처리하는 함수
  const toggleItem = (id, index) => {
    setExpandedItemId(expandedItemId === id ? null : id);
    // FlatList가 참조되어 있다면 해당 인덱스로 스크롤
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: 40, // 이 값을 조절해서 원하는 위치로 조정
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleBackHeader
        children={"보낸 편지"}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.contents}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.mailList}>
              <TouchableOpacity
                style={styles.mailTitle}
                activeOpacity={0.8}
                onPress={() => toggleItem(item.id, index)}
              >
                <Text style={styles.mailReceiver}>📨 To. {item.receiver}</Text>
                <Text style={styles.mailTime}>
                  {item.timestamp.split("T")[0]}
                </Text>
              </TouchableOpacity>
              {expandedItemId === item.id && (
                <View style={styles.mailBody}>
                  <Text style={styles.mailTime}>{item.message}</Text>
                </View>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contents: {
    flex: 1,
    padding: 16,
  },
  mailList: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Gray_Color.white,
  },
  mailTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mailBody: {
    flex: 1,
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  mailReceiver: {
    ...font_styles.description,
    color: Gray_Color.black,
  },
  mailTime: {
    ...font_styles.caption_title,
    color: Gray_Color.gray_80,
  },
});
