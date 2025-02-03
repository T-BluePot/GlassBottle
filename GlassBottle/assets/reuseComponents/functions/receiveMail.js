import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../../../data/firebase";
import showToast from "./showToast";

// 받은 메일 저장 함수
export const saveRecieveMail = async (currentLetter) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    showToast("로그인 정보가 없습니다.");
    console.error("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid; // 실제 유저 ID 가져오기

  try {
    const receiveMailRef = collection(db, "user_info", userId, "received_mail");
    const letterData = {
      // 저장할 형태
      message: currentLetter?.message ?? "",
      receiver: currentLetter?.receiver ?? "",
      sender: currentLetter?.sender.name ?? "",
      timestamp: new Date().toISOString(),
    };
    await addDoc(receiveMailRef, letterData);
    console.log("받은 메일이 추가되었습니다.");
  } catch (error) {
    console.error("저장에 실패하였습니다", error);
  }
};

// 받은 편지의 총 갯수
export const getReceiveCount = (setReceiveCount) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    showToast("로그인 정보가 없습니다.");
    console.error("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid;
  const receiveMailRef = collection(db, "user_info", userId, "received_mail");

  return onSnapshot(
    receiveMailRef,
    (snapshot) => {
      console.log(`받은 편지 개수: ${snapshot.size}`);
      setReceiveCount(snapshot.size);
    },
    (error) => {
      if (error.code === "permission-denied") {
        console.log(
          "getReceiveCount listener: permission-denied 오류 무시",
          error
        );
      } else {
        console.error("getReceiveCount listener 오류:", error);
      }
    }
  );
};

// receive_mail 컬렉션 구독
export const subscribeToReceiveMails = (setMessages) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    showToast("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid; // 실제 유저 ID 가져오기
  const receiveMailRef = collection(db, "user_info", userId, "received_mail");

  // 최신 메시지가 위로 오도록 `timestamp` 기준으로 정렬
  const q = query(receiveMailRef, orderBy("timestamp", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messages); // UI 업데이트
    },
    (error) => {
      if (error.code === "permission-denied") {
        console.log(
          "subscribeToReceiveMails listener: permission-denied 오류 무시",
          error
        );
      } else {
        console.error("subscribeToReceiveMails listener 오류:", error);
      }
    }
  );
};

// 받은 메세지 삭제
export const deleteItem = async (docId) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    showToast("로그인 정보가 없습니다.");
    return;
  }

  const userId = user.uid; // 실제 유저 ID 가져오기
  try {
    // 예를 들어 "myCollection" 이라는 컬렉션 내의 문서를 삭제
    await deleteDoc(doc(db, "user_info", userId, "received_mail", docId));
    console.log("문서가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.error("문서를 삭제하는 중 오류가 발생했습니다: ", error);
  }
};
