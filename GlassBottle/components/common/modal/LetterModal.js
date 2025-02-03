import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { Gray_Color, Main_color } from "../../../assets/colors/theme_colors";
import { font_styles } from "../../../assets/fonts/fontSyle";

const LetterModal = ({
  visible,
  hideModal,
  deleteLetter,
  selectedItem,
  headerType = "default",
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={hideModal}
      animationType="fade"
    >
      <View style={styles.modalBackground} onTouchEnd={hideModal}>
        <View style={styles.modalContainer}>
          <ImageBackground
            source={require("../../../assets/images/main_file/letter_01_sheepskin.png")}
            style={styles.modalBackgroundImage}
            resizeMode="cover"
          >
            <View
              style={styles.modalContent}
              onTouchEnd={(e) => {
                e.stopPropagation();
              }}
            >
              {headerType === "default" && (
                <View style={styles.modalHeader}>
                  <View style={styles.headerInter}>
                    <TouchableOpacity activeOpacity={0.8} onPress={hideModal}>
                      <Octicons
                        name="arrow-left"
                        size={24}
                        color={Gray_Color.gray_80}
                      />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>
                      {selectedItem?.date || ""}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={deleteLetter}
                    >
                      <Octicons
                        name="trash"
                        size={24}
                        color={Gray_Color.gray_80}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.recipient}>
                    {selectedItem?.receiver || "알 수 없음"} 에게
                  </Text>
                </View>
              )}
              {headerType === "simple" && (
                <View style={styles.modalHeader}>
                  <View style={styles.headerSimple}>
                    <Text style={styles.simpleTitle}>오늘의 편지</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={hideModal}>
                      <Octicons name="x" size={24} color={Gray_Color.gray_80} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.recipient}>
                    {selectedItem?.receiver || "알 수 없음"} 에게
                  </Text>
                </View>
              )}
              <View style={styles.modalBody}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.contentsText}>
                    {selectedItem?.message || "내용을 불러오는 중..."}
                  </Text>
                </ScrollView>
              </View>
              <View style={styles.modalFooter}>
                <Text style={styles.recipient}>
                  {headerType === "simple"
                    ? `${selectedItem?.sender.name} 가`
                    : null}
                  {headerType === "default"
                    ? `${selectedItem?.sender} 가`
                    : null}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  headerSimple: {
    paddingHorizontal: 60,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "Ongliep-BakDaHyun",
    fontSize: 20,
    color: Gray_Color.gray_80,
    marginBottom: 6,
  },
  simpleTitle: {
    width: "100%",
    fontFamily: "Ongliep-BakDaHyun",
    fontSize: 36,
    textAlign: "center",
    color: Gray_Color.black,
    marginBottom: 8,
  },
  recipient: {
    ...font_styles.sub_title,
    color: Gray_Color.black,
  },

  // modal 콘텐츠 영역
  modalBody: {
    flex: 2,
    paddingHorizontal: 36,
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

export default LetterModal;
