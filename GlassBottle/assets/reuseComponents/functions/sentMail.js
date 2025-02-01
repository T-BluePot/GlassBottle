import { db } from "../../../data/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import showToast from "./showToast";

// sent_mail 컬렉션 갯수를 가져오는 함수
export const getSentMailCount = (setSentCount) => {
  const auth = getAuth();
  const user = auth.currentUser; // 로그인한 사용자 정보

  if (!user) {
    // 유저 정보가 없는 경우
    showToast("로그인 정보가 없습니다.");
    console.error("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid; // 실제 유저 ID 가져오기

  const sentMailRef = collection(db, "user_info", userId, "sent_mail");

  return onSnapshot(sentMailRef, (snapshot) => {
    console.log(`📩 실시간 문서 개수: ${snapshot.size}`);
    setSentCount(snapshot.size);
  });
};

// sent_mail 컬렉션 내용을 가져오는 함수
export const subscribeToSentMails = (setMessages) => {
  const auth = getAuth();
  const user = auth.currentUser; // 로그인한 사용자 정보

  if (!user) {
    // 유저 정보가 없는 경우
    showToast("로그인 정보가 없습니다.");
    console.error("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid; // 실제 유저 ID 가져오기

  const sentMailRef = collection(db, "user_info", userId, "sent_mail");

  // ✅ 최신 메시지가 위로 오도록 `timestamp` 기준으로 정렬
  const q = query(sentMailRef, orderBy("timestamp", "desc"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(messages);
    setMessages(messages); // UI 업데이트
  });
};
