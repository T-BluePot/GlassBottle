import React, { useRef, useEffect, useState } from "react"; // useState 추가
import {
  SafeAreaView,
  View,
  ImageBackground,
  Animated,
  Easing,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import mainImage_path from "../../../assets/images/Icons/Main_Icons/mainImage_path.js";

export default function HomeScreen() {
  const translateY = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false); // modalVisible 상태 선언

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20, // 위로 이동 (픽셀 단위)
          duration: 1000, // 1초 동안 이동
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true, // 네이티브 드라이버 활성화
        }),
        Animated.timing(translateY, {
          toValue: 0, // 아래로 이동 (초기값)
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1, // 무한 반복
      }
    );

    bounce.start();

    // 컴포넌트 언마운트 시 애니메이션 정지
    return () => bounce.stop();
  }, [translateY]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/main_file/bakacground_beach.png")} // 배경 이미지 경로
        style={styles.background}
      >
        <View style={styles.bottle}>
          <View />
          <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Animated.Image
                source={mainImage_path.glassBottle}
                style={[
                  styles.image,
                  { transform: [{ translateY }] }, // 애니메이션 적용
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>



        {/* 모달 */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* 모달 배경 이미지 */}
              <ImageBackground
                source={require("../../../assets/images/main_file/letter_01_sheepskin.png")}
                style={styles.modalBackgroundImage}
                resizeMode="contain"
              >
                {/* 텍스트 내용 */}
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>오늘의 편지</Text>
                    <View style={styles.receiver}>
                      
                      <Text style={styles.recipient}>○○에게</Text>
                    </View>
                  </View>
                  <Text style={styles.modalBody}>
                    관람할 집회는 앞으로 토요일만 한다고 한다.
                    {"\n"}이제부터 시작이다!{"\n"}
                    우리나라를 살려야 한다.{"\n"}세상이 멸망.{"\n"}
                    나는 지금 1초씩 줄어들어가고 있다.{"\n"}
                    그들이 왜 그렇게 열심히 얘기하는지 알 것 같다...
                  </Text>
                  {/* 보내기 버튼 */}
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.sendButtonText}>보내기</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              {/* 텍스트 내용 */}
              {/* <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>오늘의 편지</Text>
                <View style={styles.modalHeader}>
                  <View style={styles.profileImage}>
                    <Text style={styles.profileText}>J</Text>
                  </View>
                  <Text style={styles.recipient}>○○에게</Text>
                </View>
                <Text style={styles.modalBody}>
                  관람할 집회는 앞으로 토요일만 한다고 한다.
                  {"\n"}이제부터 시작이다!{"\n"}
                  우리나라를 살려야 한다.{"\n"}세상이 멸망.{"\n"}
                  나는 지금 1초씩 줄어들어가고 있다.{"\n"}
                  그들이 왜 그렇게 열심히 얘기하는지 알 것 같다...
                </Text> */}
              {/* 보내기 버튼 */}
              {/* <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.sendButtonText}>보내기</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </Modal>

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1
  },
  bottle: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    // width: 100, // 이미지 크기 조정
    // height: 100,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    // width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  modalBackgroundImage: {
    flex: 1,
    padding: 80,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain", // 편지지가 정비율로 화면에 나타나도록 설정

  },

  modalContent: {
    // paddingInline: 120,
    // paddingTop: 50,
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap:5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalHeader: {
    // flexDirection: "row",
    flex:0.15,
    alignItems: "center",
    justifyContent:"center",
    marginBottom: 20,
  },
  receiver:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center" 
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: "#FF7F50",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "column"
  },
  recipient: {
    fontSize: 18,
    fontWeight: "500",
  },
  modalBody: {
    // flex:1,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "left",
  },
  sendButton: {
    // flex:1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  sendButtonText: {
    color: "black",
    fontSize: 20,
    fontWeight:"bold"
  },

});
