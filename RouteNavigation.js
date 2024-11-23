import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./Context/authContext";
import ScreenMenu from "./Components/Menus/ScreenMenu";
import { LanguageProvider } from "./Context/LanguageContext"; // Adjust path as needed
import TabView from "./utils/constants/tab_navigation_view";
import Toast from "react-native-toast-message";
import { toastConfig } from "./toastConfig";

const RouteNavigation = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ScreenMenu></ScreenMenu>
        <Toast
          config={toastConfig}
          visibilityTime={2500}
          bottomOffset={0}
          swipeable={false}
          position="bottom"
        />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default RouteNavigation;
