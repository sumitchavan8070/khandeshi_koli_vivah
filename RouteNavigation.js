import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./Context/authContext";
import ScreenMenu from "./Components/Menus/ScreenMenu";
import { LanguageProvider } from "./Context/LanguageContext"; // Adjust path as needed
import TabView from "./utils/constants/tab_navigation_view";

const RouteNavigation = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ScreenMenu></ScreenMenu>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default RouteNavigation;
