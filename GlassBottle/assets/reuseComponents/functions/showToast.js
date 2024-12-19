import { ToastAndroid } from "react-native";

// toast message를 띄워주기 위한 함수
const showToast = (message) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM
  );
};

export default showToast;
