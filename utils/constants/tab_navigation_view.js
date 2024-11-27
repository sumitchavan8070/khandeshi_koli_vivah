import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
import Home from "../../Screens/Home";
import SettingsScreen from "./set_screen_view";
import LandingView from "../../home_module/view/landing_view";
import BiodataFilter from "../../Components/Biodata/Search/BiodataFilter";
import UserScreen from "../../Screens/UserScreen";

// Screen Components
function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <BiodataFilter></BiodataFilter>
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={styles.screen}>
      <UserScreen />
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function TabView() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconXml;

          const homeSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

          const searchSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.2533 16.7467 2 11.5 2C6.25329 2 2 6.2533 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#292D32" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
              <path opacity="0.4" d="M22 22L20 20" stroke="#292D32" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

          const heartSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.745 21.5022C12.3754 21.6326 11.7666 21.6326 11.397 21.5022C8.24448 20.426 1.2002 15.9363 1.2002 8.32678C1.2002 4.9677 3.90703 2.25 7.24436 2.25C9.22285 2.25 10.9731 3.20663 12.071 4.68506C13.169 3.20663 14.93 2.25 16.8976 2.25C20.235 2.25 22.9418 4.9677 22.9418 8.32678C22.9418 15.9363 15.8975 20.426 12.745 21.5022Z" stroke="#51526C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

          const profileSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;

          switch (route.name) {
            case "Home":
              iconXml = homeSvg;
              break;
            case "Profile":
              iconXml = searchSvg;
              break;
            case "Favorites":
              iconXml = heartSvg;
              break;
            case "About":
              iconXml = profileSvg;
              break;
            default:
              iconXml = homeSvg;
          }

          return <SvgXml xml={iconXml} width={24} height={24} />;
        },
        tabBarActiveTintColor: "#6949ff",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,

        tabBarStyle: {
          height: 60,
          margin: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 16,
          borderWidth: 1,
          position: "absolute",

          // backgroundColor: "transparent",
        },
      })}
    >
      <Tab.Screen name="Home" component={LandingView} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Favorites" component={SettingsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
