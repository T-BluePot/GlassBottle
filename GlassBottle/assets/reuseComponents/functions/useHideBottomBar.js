import { useEffect } from "react";
import { Main_color, Gray_Color } from "../../colors/theme_colors";

const useHideBottomBar = (navigation) => {
  useEffect(() => {
    // 하단 바 숨기기
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      // 화면 떠날 때 다시 보이게
      navigation.getParent()?.setOptions({
        tabBarShowLabel: false, // 하단바 라벨(글씨) 여부
        tabBarStyle: {
          // 하단바 디자인
          height: 60,
          backgroundColor: Main_color.mainHard_20, // 하단바 색상
        },
        tabBarActiveTintColor: Main_color.main_10, // 하단 아이콘 활성화 시 색상
        tabBarInactiveTintColor: Main_color.main_30, // 하단 아이콘 비활성화 시 색상
      });
    };
  }, [navigation]);
};

export default useHideBottomBar;
