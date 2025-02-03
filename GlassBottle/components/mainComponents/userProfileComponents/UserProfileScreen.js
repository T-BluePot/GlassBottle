import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
// 사용자 정보 관련
import { auth } from "../../../data/firebase";
import { useAuth } from "../../../data/LoginContext";
import { signOut, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSentMailCount } from "../../../assets/reuseComponents/functions/sentMail";
import { getReceiveCount } from "../../../assets/reuseComponents/functions/receiveMail";
// 디자인 관련
import { Gray_Color, Main_color } from "../../../assets/colors/theme_colors";
import Octicons from "@expo/vector-icons/Octicons";
import { font_styles } from "../../../assets/fonts/fontSyle";
// 컴포넌트 관련
import Header from "../../../assets/reuseComponents/headerComponents/Header";
import showToast from "../../../assets/reuseComponents/functions/showToast";

export default function UserProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [sentCount, setSentCount] = useState(0); // 보낸 메일 집계
  const [receiveCount, setReceiveCount] = useState(0);

  // 구독 해제 함수를 저장할 useRef (각각 하나씩)
  const unsubscribeSentMailRef = useRef(null);
  const unsubscribeReceiveMailRef = useRef(null);

  useEffect(() => {
    // 초기 렌더링 시 이미 로그인된 경우 구독 등록
    if (auth.currentUser) {
      unsubscribeSentMailRef.current = getSentMailCount(setSentCount);
      unsubscribeReceiveMailRef.current = getReceiveCount(setReceiveCount);
    }

    // 로그인 상태 변화 실시간 추적
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        AsyncStorage.setItem("user", JSON.stringify(currentUser));
        // 새로 로그인하면 각 구독이 없을 경우 등록
        if (!unsubscribeSentMailRef.current) {
          unsubscribeSentMailRef.current = getSentMailCount(setSentCount);
        }
        if (!unsubscribeReceiveMailRef.current) {
          unsubscribeReceiveMailRef.current = getReceiveCount(setReceiveCount);
        }
      } else {
        setUser(null);
        // 로그아웃 등으로 유저가 없을 경우 구독 해제
        if (unsubscribeSentMailRef.current) {
          unsubscribeSentMailRef.current();
          unsubscribeSentMailRef.current = null;
        }
        if (unsubscribeReceiveMailRef.current) {
          unsubscribeReceiveMailRef.current();
          unsubscribeReceiveMailRef.current = null;
        }
      }
    });

    // 컴포넌트 언마운트 시 모든 구독 해제
    return () => {
      if (unsubscribeSentMailRef.current) {
        unsubscribeSentMailRef.current();
      }
      if (unsubscribeReceiveMailRef.current) {
        unsubscribeReceiveMailRef.current();
      }
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
    };
  }, []);

  const { setIsLoggedIn } = useAuth();

  // 로그아웃: 구독 해제 후 로그아웃 진행
  const handleLogout = async () => {
    try {
      // 먼저 구독 해제
      if (unsubscribeSentMailRef.current) {
        unsubscribeSentMailRef.current();
        unsubscribeSentMailRef.current = null;
      }
      if (unsubscribeReceiveMailRef.current) {
        unsubscribeReceiveMailRef.current();
        unsubscribeReceiveMailRef.current = null;
      }
      // Firebase 로그아웃
      await signOut(auth);
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
      showToast("로그아웃 되었습니다");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      showToast("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleResign = () => {
    navigation.navigate("resign");
  };

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
      <Header children={"내 정보"} />
      <View style={styles.topContents}>
        <View style={{ flexDirection: "row", alignItems: "baseline" }}>
          <Text style={styles.displayName}>{user.displayName}</Text>
          <Text style={styles.displayNameSub}>의 보관함</Text>
        </View>
        <View style={styles.contentsContainer}>
          <TouchableOpacity
            style={styles.letterSpace}
            onPress={() => {
              navigation.navigate("sent");
            }}
          >
            <Text style={styles.letterTitle}>보낸 편지</Text>
            <Text style={font_styles.subtitle}>{sentCount}개</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            style={styles.letterSpace}
            onPress={() => {
              navigation.navigate("receive");
            }}
          >
            <Text style={styles.letterTitle}>받은 편지</Text>
            <Text style={font_styles.subtitle}>{receiveCount}개</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.accountSec}>
        <View style={styles.serviceLine} />
        <View style={styles.btnContainer}>
          <Text style={styles.serviceTitle}>계정 관리</Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Text style={styles.btnText}>로그아웃</Text>
            <Octicons
              name="chevron-right"
              size={18}
              color={Gray_Color.gray_30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleResign}
          >
            <Text style={{ ...styles.btnText, color: Main_color.main_red }}>
              회원탈퇴
            </Text>
            <Octicons
              name="chevron-right"
              size={18}
              color={Gray_Color.gray_30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Gray_Color.white,
  },
  topContents: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  displayName: {
    ...font_styles.main_title,
  },
  displayNameSub: {
    marginLeft: 4,
    ...font_styles.sub_title,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentsContainer: {
    borderRadius: 10,
    marginVertical: 32,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  letterSpace: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  letterTitle: {
    ...font_styles.description,
    color: Gray_Color.gray_60,
    letterSpacing: -0.2,
  },
  line: {
    width: 1,
    marginVertical: 12,
    marginHorizontal: 24,
    backgroundColor: Gray_Color.gray_60,
  },
  accountSec: {},
  btnContainer: {
    backgroundColor: Gray_Color.white,
  },
  serviceLine: {
    width: "100%",
    height: 16,
    backgroundColor: Gray_Color.gray_10,
  },
  serviceTitle: {
    fontFamily: "Pretendard-Bold",
    color: Gray_Color.black,
    paddingHorizontal: 24,
    marginVertical: 24,
  },
  button: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  btnText: {
    ...font_styles.caption,
    color: Gray_Color.black,
  },
});
