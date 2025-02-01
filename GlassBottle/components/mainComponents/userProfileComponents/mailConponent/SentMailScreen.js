import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { Gray_Color, Main_color } from "../../../../assets/colors/theme_colors";
import TitleBackHeader from "../../../../assets/reuseComponents/headerComponents/TitleBackHeader";

import { subscribeToSentMails } from "../../../../assets/reuseComponents/functions/sentMail";
import useHideBottomBar from "../../../../assets/reuseComponents/functions/useHideBottomBar";

export default function SentMailScreen({ navigation }) {
  useHideBottomBar(navigation);

  const [messages, setMessages] = useState();

  useEffect(() => {
    subscribeToSentMails(setMessages);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TitleBackHeader
        children={"보낸 편지"}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.contents}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 8,
                padding: 12,
                borderRadius: 8,
                backgroundColor: Gray_Color.white,
              }}
            >
              <Text>📨 받는 사람: {item.receiver}</Text>
              <Text>💬 메시지: {item.message}</Text>
              <Text>
                ⏰ 보낸 시간: {new Date(item.timestamp).toLocaleString()}
              </Text>
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
});
