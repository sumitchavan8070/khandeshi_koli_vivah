import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode"; // Add this to decode tokens
import AsyncStorage from "@react-native-async-storage/async-storage"; // For token storage
import GRADIENT_COLORS from "../constants/Colors"; // Gradient colors
import { LanguageContext } from "../Context/LanguageContext"; // Context for language selection
import { token_storage } from "../utils/AsyncStorageLocal/AsyncStorgaeLocal";
import { AuthContext } from "../Context/authContext";
import LoadingAnimation from "../Components/Loader/loader";

const LanguageSelectionScreen = () => {
  const loadingAnimation = require("../assets/ganesha.json");
  const navigation = useNavigation();
  const { setLang } = useContext(LanguageContext);
  const [state, setState] = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const navigateToLogin = () => {
    navigation.navigate("Home"); // Adjust the screen name for navigation
  };

  const tokenCheck = async () => {
    setLoading(true); // Start loading animation

    try {
      const app_access_token = await token_storage.get("app_access_token");
      const app_refresh_token = await token_storage.get("app_refresh_token");

      // console.log(app_access_token, app_refresh_token);

      if (app_access_token) {
        const decodedAccessToken = jwtDecode(app_access_token);
        const decodedRefreshToken = jwtDecode(app_refresh_token);
        const currentTime = Date.now() / 1000;

        if (decodedRefreshToken?.exp < currentTime) {
          Alert.alert("Session Expired", "Please login again.");
          navigateToLogin();
          setLoading(false);
          return;
        }

        if (decodedAccessToken?.exp < currentTime) {
          // Handle token refresh logic
          try {
            await refreshTokens(); // Implement your refresh token logic
          } catch (error) {
            Alert.alert("Error", "Session Expired. Please login again.");
            navigateToLogin();
            setLoading(false);
            return;
          }
        } else {
          // Token is valid, navigate to home
          // navigation.navigate("Home");

          let data = await token_storage.get("client_data");
          let user = JSON.parse(data);
          console.log("user", user);
          setState(user);

          // return;
        }
      } else {
        // navigateToLogin
        return;
      }
    } catch (error) {
      console.error("Token check error:", error);
      navigateToLogin();
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleLanguageSelection = (lang) => {
    setLang(lang);
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        {/* <LottieView
          source={loadingAnimation}
          autoPlay
          loop
          style={styles.animation}
        /> */}
        {loading && <LoadingAnimation visible={loading} loop={true} />}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={GRADIENT_COLORS.primaryGradient}
      style={styles.container}
    >
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={styles.animation}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Select Language / भाषा निवडा</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleLanguageSelection("en")}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/India-flag-a4.jpg",
            }}
            style={styles.flag}
          />
          <View style={styles.textContainer}>
            <Text style={styles.language}>English (IN)</Text>
            <Text style={styles.subtext}>English</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => handleLanguageSelection("mr")}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/2/2c/India-flag-a4.jpg",
            }}
            style={styles.flag}
          />
          <View style={styles.textContainer}>
            <Text style={styles.language}>Marathi (MH)</Text>
            <Text style={styles.subtext}>मराठी</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#007aff",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  flag: {
    width: 40,
    height: 25,
    marginRight: 15,
    borderRadius: 3,
  },
  textContainer: {
    flex: 1,
  },
  language: {
    fontSize: 18,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 14,
    color: "gray",
  },
  animation: {
    width: "80%",
    height: "40%",
    marginBottom: 10,
  },
});

export default LanguageSelectionScreen;
