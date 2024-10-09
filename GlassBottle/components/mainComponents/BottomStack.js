import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
// Stack으로 관리할 Screen Stack
import HomeStack from "./homeComponents/HomeStack";
import UserProfileStack from "./userProfileComponents/UserProfileStack";
// design 관련
import { Gray_Color, Main_color } from "../../assets/colors/theme_colors";
import bottomImage_path from "../../assets/images/Icons/BottomBar_Icons/bottomImage_path";

const Tab = createBottomTabNavigator();

export default function BottomStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false, // 하단바 라벨(글씨) 여부
        tabBarStyle: {
          // 하단바 디자인
          height: 60,
          backgroundColor: Main_color.mainHard_20, // 하단바 색상
        },
        tabBarActiveTintColor: Main_color.main_10, // 하단 아이콘 활성화 시 색상
        tabBarInactiveTintColor: Main_color.main_30, // 하단 아이콘 비활성화 시 색상
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Image
                source={bottomImage_path.home}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: focused ? color : color,
                }}
              ></Image>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="UserStack"
        component={UserProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            return (
              <Image
                source={bottomImage_path.user}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: focused ? color : color,
                }}
              ></Image>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
