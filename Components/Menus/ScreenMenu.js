import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../Context/authContext";
import Home from "../../Screens/Home";
import LanguageSelectionScreen from "../../Screens/LanguageSelectionScreen";
import Register from "../../Screens/Register";
import Login from "../../Screens/Login";
import TabView from "../../utils/constants/tab_navigation_view";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state._id;

  console.log("----------authenticatedUser--------", authenticatedUser);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={authenticatedUser ? "TabNavigation" : "Splash"}
    >
      {authenticatedUser ? (
        <>
          <Stack.Screen
            name="Home"
            component={TabView}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TabNavigation"
            component={TabView}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Splash"
            component={LanguageSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenu;
