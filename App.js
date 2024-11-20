import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RouteNavigation from "./RouteNavigation";
import TabView from "./utils/constants/tab_navigation_view";

export default function App() {
  return (
    <NavigationContainer>
      <RouteNavigation></RouteNavigation>
    </NavigationContainer>
  );
}
