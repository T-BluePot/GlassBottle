import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert, // 알림 기능 추가
  Vibration, // 진동 기능 추가
} from "react-native";
import showToast from "../../../assets/reuseComponents/functions/showToast";
import saveToSentMail from "../../../assets/reuseComponents/functions/saveToSentMail";
import { db } from "../../../data/firebase"; // Firebase 설정 파일
import { collection, addDoc } from "firebase/firestore"; // Firestore 메서드 import
import { Gray_Color, Main_color } from "../../../assets/colors/theme_colors";

const CommonModal = ({ visible, writer, onClose, onSave }) => {
  const [title, setTitle] = useState(""); // 받는 사람 (제목)
  const [content, setContent] = useState(""); // 메시지 (내용)
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 상태

  // 편지 관리
  const saveToFirebase = async () => {
    if (isSubmitting) {
      // 진동 및 경고 메시지 추가
      Vibration.vibrate(100); // 100ms 진동
      Alert.alert(
        "제출 중입니다",
        "현재 데이터를 저장 중입니다. 잠시만 기다려 주세요.",
        [{ text: "확인" }]
      );
      return; // 함수 종료
    }

    setIsSubmitting(true); // 제출 시작
    try {
      const data = {
        id: Date.now(),
        sender: { ...writer },
        receiver: title || "익명",
        message: content,
        timestamp: new Date().toISOString(),
      };

      await addDoc(collection(db, "letters"), data);
      console.log("Document saved successfully!");

      // 부모로 데이터 전달
      onSave(title, content);

      // 필드 초기화 및 모달 닫기
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setIsSubmitting(false); // 제출 완료 후 상태 초기화
    }
  };

  const handleSaveMail = () => {
    // 텍스트 필드가 빈 경우
    if (title === "" || content === "") {
      showToast("내용이 작성되지 않았습니다");
      return;
    }

    saveToFirebase(); // 메인 편지 관리
    saveToSentMail(title, content); // user_info  편지 관리
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground} onTouchEnd={onClose}>
        <View
          style={styles.modalContainer}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          {/* 제목 입력 */}
          <Text style={styles.label}>받는 사람</Text>
          <TextInput
            style={styles.input}
            placeholder="받는 사람을 입력하세요 (없으면 익명)"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />

          {/* 내용 입력 */}
          <Text style={styles.label}>메시지</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="메시지를 입력하세요"
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline
          />

          {/* 버튼들 */}
          <View style={styles.buttonContainer}>
            {/* 닫기 버튼 */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
            {/* 저장 버튼 */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveMail}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    backgroundColor: Main_color.mainHard_10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
    backgroundColor: Gray_Color.gray_20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CommonModal;
