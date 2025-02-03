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
  ActivityIndicator,
} from "react-native";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../../../data/firebase"; // Firebase 설정 파일
import { Audio } from "expo-av";

import { saveRecieveMail } from "../../../assets/reuseComponents/functions/receiveMail.js"; // 받은 메일 저장

//유저 정보 가져와 사용하기
import AsyncStorage from "@react-native-async-storage/async-storage";

import CircleButton from "../../common/button/CircleButton.js";
import CommonModal from "../../common/modal/CommonModal.js";

import mainImage_path from "../../../assets/images/Icons/Main_Icons/mainImage_path.js";
import { Gray_Color, Main_color } from "../../../assets/colors/theme_colors"; // 경로에 맞게 수정
import LetterModal from "../../common/modal/LetterModal.js";

export default function HomeScreen() {
  const translateY = useRef(new Animated.Value(0)).current;
  const [writeModalVisible, setWriteModalVisible] = useState(false); // 편지 작성 모달
  const [readModalVisible, setReadModalVisible] = useState(false); // 편지 읽기 모달
  const [newLetterAdded, setNewLetterAdded] = useState(false); // 새 문서 추가 여부
  const [latestDocumentId, setLatestDocumentId] = useState(null); // 가장 최근 문서 ID
  const [currentLetter, setCurrentLetter] = useState(null); // 현재 문서 데이터
  const [canViewLetter, setCanViewLetter] = useState(false); // 현재 사용자가 편지를 읽을 수 있는지 여부
  const [user, setUser] = useState(null); // 유저 정보 상태
  const soundRef = useRef(null); // sound 객체를 useRef로 관리

  const [letterData, setLetterData] = useState(); // 받은 편지 데이터 가공

  // 홈에서만 배경음 재생
  useEffect(() => {
    const playBackgroundSound = async () => {
      try {
        // 소리 객체 생성
        const sound = new Audio.Sound();

        // 파도 소리 파일 로드
        await sound.loadAsync(
          require("../../../assets/sounds/background/sea-wave-34088.mp3")
        );

        // 볼륨 조정 (50% 볼륨)
        await sound.setVolumeAsync(0.1);

        // 반복 재생 설정
        await sound.setIsLoopingAsync(true);

        // 소리 재생
        await sound.playAsync();

        // sound 객체를 useRef로 저장
        soundRef.current = sound;
      } catch (error) {
        console.error("Error playing background sound:", error);
      }
    };

    playBackgroundSound();

    // 컴포넌트가 제거될 때 소리 정리
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync(); // 메모리 해제
      }
    };
  }, []);

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
    // return () => bounce.stop();
  }, [translateY, newLetterAdded, canViewLetter]);

  // 1-2. 유저 정보 가져오기
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log("유저 정보 111 : ", currentUser);
        const userData = JSON.stringify(currentUser);
        await AsyncStorage.setItem("user", userData);
        setUser(currentUser);
      } else {
        setUser(null); // 로그아웃 시 사용자 정보 초기화
      }
    });

    return () => unsubscribe(); // 언마운트 시 구독 해제
  }, []);

  // 2. Firestore 실시간 구독
  useEffect(() => {
    // user가 null이 아니면 실행
    console.log("user가 null입니다. Firestore 구독을 실행하지 않습니다.", user);
    if (!user) {
      console.log("user가 null입니다. Firestore 구독을 실행하지 않습니다.");
      return;
    }
    const unsubscribe = onSnapshot(
      query(collection(db, "letters"), orderBy("timestamp", "desc")), // query 메서드 사용
      (snapshot) => {
        console.log("현재 유저 정보 :", user);
        if (!snapshot.empty) {
          console.log("실시간 업데이트 감지!");
          const latestDoc = snapshot.docs[0];
          console.log("가장 최근 문서: ", latestDoc.data()); // 디버깅용 로그
          setLatestDocumentId(latestDoc.id); // 최신 문서 ID 저장
          setNewLetterAdded(true); // 새 문서가 추가됨을 표시
          // 읽은 사람 배열(viewers)에 현재 사용자가 없는지 확인
          if (!latestDoc.data().viewers?.includes(user.uid)) {
            setCanViewLetter(true); // 읽을 수 있는 상태로 설정
          } else {
            setCanViewLetter(false); // 이미 읽은 사용자
          }
        } else {
          console.log("컬렉션이 비어 있습니다."); // 디버깅용 로그
        }
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 3. Firestore에서 문서 가져오기
  const handleViewDocument = async () => {
    if (!latestDocumentId) return;

    try {
      // console.log("최근 문서 가져오기", latestDocumentId);
      const documentRef = doc(db, "letters", latestDocumentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data(); // 최근 문서 데이터
        setCurrentLetter(data); // 문서 데이터 저장
        saveRecieveMail(data);

        // 읽은 사람 배열(viewers)에 현재 사용자가 없는지 확인
        if (!data.viewers?.includes(user.uid)) {
          setCanViewLetter(true); // 읽을 수 있는 상태로 설정
        } else {
          setCanViewLetter(false); // 이미 읽은 사용자
        }
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("문서를 가져오는 중 오류 발생:", error);
    }
  };

  // 4. 읽은 사람 배열에 사용자 추가
  const markAsRead = async () => {
    if (!latestDocumentId || !user) {
      console.log("현재 유저 정보가 없습니다. 업데이트를 중단합니다.");
      return; // user가 null이면 실행 중단
    }
    try {
      const documentRef = doc(db, "letters", latestDocumentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();

        // viewers 배열이 없으면 생성 후 사용자 추가
        await updateDoc(documentRef, {
          viewers: arrayUnion(user.uid),
        });

        console.log("사용자가 읽은 상태로 표시되었습니다.");
      }
    } catch (error) {
      console.error("읽은 상태를 업데이트하는 중 오류 발생:", error);
    }
  };

  // onSave 함수 정의
  const handleSave = (title, content) => {
    console.log("저장된 제목:", title);
    console.log("저장된 내용:", content);
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Main_color.mainHard_50} />
        {/* 로딩 인디케이터 */}
      </View>
    );
  }
  // 소리를 재생하는 함수
  const playSounds = async () => {
    try {
      // 첫 번째 소리 재생
      const sound1 = new Audio.Sound();
      await sound1.loadAsync(
        require("../../../assets/sounds/effects/uncorking-fine-scotch-3-83862.mp3")
      );
      await sound1.playAsync(0.5);

      // 첫 번째 소리가 끝날 때까지 기다리지 않고 딜레이를 주기
      setTimeout(async () => {
        const sound2 = new Audio.Sound();
        await sound2.loadAsync(
          require("../../../assets/sounds/effects/newspaper-foley-4-196721_[cut_1sec].mp3")
        );
        await sound2.playAsync(0.5);
        setTimeout(() => {
          setReadModalVisible(true); // 모달 열기
        }, 200); // 300ms 딜레이

        // 두 번째 소리가 끝난 후 리소스 해제
        sound2.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound2.unloadAsync();
          }
        });
      }, 400); // 500ms 딜레이
    } catch (error) {
      console.error("Error playing sounds:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/main_file/bakacground_beach.png")} // 배경 이미지 경로
        style={styles.background}
      >
        <View style={styles.bottle}>
          <View />
          {newLetterAdded && canViewLetter ? ( // 새 문서가 추가되었고, 현재 사용자가 읽지 않은 경우에만 표시
            <View>
              <TouchableOpacity
                onPress={() => {
                  playSounds();
                  handleViewDocument();
                }}
              >
                <Animated.Image
                  source={mainImage_path.glassBottle}
                  style={[
                    styles.image,
                    { transform: [{ translateY }] }, // 애니메이션 적용
                  ]}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyMessageContainer}>
              <View style={[styles.emptyMessageCard, styles.boxShadow]}>
                <Text style={styles.emptyMessage}>
                  아직 아무 편지가 오지 않았네요..{"\n"}누군가에게 편지를
                  보내보는 것은 어떠신가요?
                </Text>
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <CircleButton onPress={() => setWriteModalVisible(true)} />
          </View>
        </View>

        {/* 편지쓰기 */}
        <CommonModal
          visible={writeModalVisible}
          writer={{
            name: user?.displayName || "익명 사용자", // 기본값 설정
            id: user?.uid || "unknown",
          }}
          onClose={() => setWriteModalVisible(false)} // 모달 닫기
          onSave={handleSave} // 저장 함수 전달
        />

        {/* 기존 모달 
        <Modal
          transparent={true}
          visible={readModalVisible}
          animationType="fade"
          onRequestClose={() => setReadModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <ImageBackground
                source={require("../../../assets/images/main_file/letter_01_sheepskin.png")}
                style={styles.modalBackgroundImage}
                resizeMode="contain"
              >
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>오늘의 편지</Text>
                    <View style={styles.receiver}>
                      <Text style={styles.recipient}>
                        {currentLetter?.receiver || "알 수 없음"}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.modalBody}>
                    {currentLetter?.message || "내용을 불러오는 중..."}
                  </Text>
                  <Text>
                    {currentLetter?.sender
                      ? `${currentLetter.sender.name}가`
                      : "내용을 불러오는 중..."}
                  </Text>
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => {
                      markAsRead(), setReadModalVisible(false);
                    }}
                  >
                    <Text style={styles.sendButtonText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
             
            </View>
          </View>
        </Modal>*/}

        <LetterModal
          visible={readModalVisible}
          hideModal={() => {
            markAsRead();
            setReadModalVisible(false);
          }}
          selectedItem={currentLetter}
          headerType="simple"
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  bottle: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20, // 화면 하단으로부터 20px
    right: 20, // 화면 오른쪽으로부터 20px
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
    justifyContent: "center",
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalHeader: {
    // flexDirection: "row",
    flex: 0.15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  receiver: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: Main_color.mainHard_10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileText: {
    color: Gray_Color.white,
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "column",
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
    fontWeight: "bold",
  },
  emptyMessageContainer: {
    flex: 1, // 화면 전체를 차지하도록 설정
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
  },
  emptyMessageCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: Gray_Color.white,
  },
  boxShadow: {
    shadowColor: "rgba(100, 100, 111, 0.2)", // 그림자의 색상
    shadowOffset: { width: 0, height: 7 }, // x, y 축의 그림자 거리
    shadowOpacity: 0.2, // 그림자의 투명도
    shadowRadius: 29, // 그림자의 번짐 정도
    elevation: 5, // Android에서 그림자 표시
  },
  emptyMessage: {
    fontFamily: "Ongliep-BakDaHyun",
    fontSize: 24,
    color: Gray_Color.gray_90,
    textAlign: "center",
    margin: 12,
  },
});
