import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-vQxxSWHwVmSrBZEtCEPMe1GQO2dSgY8", // Firebase 프로젝트 API 키
  authDomain: "glassbottle-38567.firebaseapp.com", // Firebase Authentication에서 사용되는 도메인
  projectId: "glassbottle-38567", // Firebase 프로젝트의 고유 식별자
  storageBucket: "glassbottle-38567.appspot.com", // Firebase Storage에서 파일을 저장할 수 있는 버킷의 URL
  messagingSenderId: "991056051804", // Firebase Cloud Messaging에서 알림을 보내는 데 사용하는 발신자 ID
  appId: "1:991056051804:web:4b7c165cef80b41390f099", // Firebase 프로젝트에 연결된 앱의 고유 ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Auth 초기화
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore 초기화
const db = getFirestore(app);

export { auth, db };
