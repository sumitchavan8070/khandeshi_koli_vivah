import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RouteNavigation from "./RouteNavigation";
import TabView from "./utils/constants/tab_navigation_view";
import Toast from "react-native-toast-message";
import { toastConfig } from "./toastConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RouteNavigation></RouteNavigation>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
