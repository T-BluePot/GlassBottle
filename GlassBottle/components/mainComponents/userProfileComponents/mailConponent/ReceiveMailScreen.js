import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Gray_Color, Main_color } from "../../../../assets/colors/theme_colors";
import { font_styles } from "../../../../assets/fonts/fontSyle";

import TitleBackHeader from "../../../../assets/reuseComponents/headerComponents/TitleBackHeader";
import LetterModal from "../../../common/modal/LetterModal";

import {
  subscribeToReceiveMails,
  deleteItem,
} from "../../../../assets/reuseComponents/functions/receiveMail";
import useHideBottomBar from "../../../../assets/reuseComponents/functions/useHideBottomBar";
import showToast from "../../../../assets/reuseComponents/functions/showToast";

export default function ReceieveMailScreen({ navigation }) {
  useHideBottomBar(navigation);

  const [messages, setMessages] = useState(); // 받은 편지 리스트
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteLetter = () => {
    Alert.alert(
      "편지 삭제",
      "삭제한 편지는 복구할 수 없습니다. \n정말 삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("삭제 취소"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => {
            deleteItem(selectedItem.docId);
            showToast("편지가 삭제되었습니다");
            hideModal();
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    subscribeToReceiveMails(setMessages);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <TitleBackHeader
          children={"받은 편지"}
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
              <TouchableOpacity
                style={styles.mailBtn}
                activeOpacity={0.8}
                onPress={() => {
                  const isoDate = item?.timestamp;
                  const dateOnly = isoDate.split("T")[0];

                  const letterData = {
                    date: dateOnly,
                    receiver: item?.receiver,
                    message: item?.message,
                    sender: item?.sender,
                    docId: item?.id,
                  };
                  console.log("편지 데이터", letterData);
                  setSelectedItem(letterData);
                  showModal();
                }}
              >
                <Text style={styles.mailSender}>📮 {item.sender}</Text>
                <Text style={styles.mailTime}>
                  {item.timestamp.split("T")[0]}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <LetterModal
        visible={open}
        hideModal={hideModal}
        deleteLetter={deleteLetter}
        selectedItem={selectedItem}
        headerType="default"
      />
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
  mailBtn: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Gray_Color.white,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  mailSender: {
    ...font_styles.description,
    color: Gray_Color.black,
  },
  mailTime: {
    ...font_styles.caption_title,
    color: Gray_Color.gray_80,
  },

  // modal 영역
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalBackgroundImage: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 160,
  },

  modalContent: {
    flex: 1,
    paddingVertical: 60,
    justifyContent: "space-between",
  },
  // modal 헤더 영역
  modalHeader: {
    flex: 1,
    alignItems: "center",
  },
  headerInter: {
    width: "100%",
    paddingHorizontal: 32,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontFamily: "Ongliep-BakDaHyun",
    fontSize: 20,
    color: Gray_Color.gray_80,
    marginBottom: 6,
  },
  recipient: {
    ...font_styles.sub_title,
    color: Gray_Color.black,
  },

  // modal 콘텐츠 영역
  modalBody: {
    flex: 2,
    paddingHorizontal: 24,
  },
  receiver: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  contentsText: {
    // flex:1,
    ...font_styles.description,
    color: Gray_Color.black,
    lineHeight: 24,
  },

  // modalFooter 영역
  modalFooter: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
