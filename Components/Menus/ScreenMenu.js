import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";
import {
  createNativeStackNavigator,
  TransitionPresets,
  StackNavigationOptions,
} from "@react-navigation/native-stack";
import { AuthContext } from "../../Context/authContext";
import Home from "../../Screens/Home";
import LanguageSelectionScreen from "../../Screens/LanguageSelectionScreen";
import Register from "../../Screens/Register";
import Login from "../../Screens/Login";
import TabView from "../../utils/constants/tab_navigation_view";
import CreateBioData from "../../Screens/CreateBiodata";
import BiodataTemplateScreen from "../Biodata/Template/BiodataTemplateScreen";
import ProfileScreen from "../Biodata/Search/ProfileScreen";

const ScreenMenu = () => {
  const [state] = useContext(AuthContext);
  const authenticatedUser = state._id;

  console.log("----------authenticatedUser--------", authenticatedUser);

  const Stack = createNativeStackNavigator();

  // const screenAOptions = useMemo(() => ({ headerLeft: () => null }), []);

  return (
    <Stack.Navigator
      initialRouteName={authenticatedUser ? "TabNavigation" : "Splash"}
      screenOptions={{ safeAreaInsets: { top: 0 } }}
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

          <Stack.Screen
            name="CreateBiodata"
            component={CreateBioData}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BiodataTemplateScreen"
            component={BiodataTemplateScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
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
