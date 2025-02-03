import { db } from "../../../data/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import showToast from "./showToast";

// user가 작성한 메세지 저장
// user_info 컬렉션에 sent_mail 서브 컬렉션
const saveToSentMail = async (title, content) => {
  const auth = getAuth();
  const user = auth.currentUser; // 로그인한 사용자 정보

  if (!user) {
    showToast("로그인 정보가 없습니다.");
    console.error("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid; // 실제 유저 ID 가져오기

  try {
    // 특정 사용자의 sent_mail 서브컬렉션 참조
    const sentMailRef = collection(db, "user_info", userId, "sent_mail");

    const newMessage = {
      receiver: title || "익명",
      message: content,
      timestamp: new Date().toISOString(),
    };

    await addDoc(sentMailRef, newMessage); // 새로운 문서 추가

    console.log("Message saved successfully!");
  } catch (error) {
    console.error("Error adding message:", error);
  }
};

export default saveToSentMail;
