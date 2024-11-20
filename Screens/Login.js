import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GRADIENT_COLORS from "../constants/Colors";
import LottieView from "lottie-react-native";
import { postRequest } from "../utils/network_service/api_request";
import { useNavigation } from "@react-navigation/native";
import APIEndPoints from "../utils/network_service/api_endpoints";
import { token_storage } from "../utils/AsyncStorageLocal/AsyncStorgaeLocal";
import { AuthContext } from "../Context/authContext";

const Login = () => {
  const loadingAnimation = require("../assets/ganesha.json");
  const [state, setState] = useContext(AuthContext);

  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userExists, setUserExists] = useState(null);

  const navigation = useNavigation(); // React Navigation hook for navigation

  const handleLogin = async () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert(
        "Invalid Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      const isExists = await checkUserExists();
      setUserExists(isExists);
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error("Error checking user:", error);
    }
  };

  const handleSubmit = async () => {
    if (!userExists) {
      // Alert.alert("Error", "user Not Exists");

      if (!password) {
        Alert.alert("Error", "Please enter your password.");
        return;
      }

      const apiEndPoint = APIEndPoints.register;
      const postData = {
        phoneNumber: mobileNumber,
        name,
        password,
      };

      const response = await postRequest(apiEndPoint, postData);

      token_storage.set("app_access_token", response.tokens.access_token);
      token_storage.set("app_refresh_token", response.tokens.refresh_token);
      token_storage.set("client_data", response.user);

      setState(response.user);

      // return;
      navigation.navigate("Home");
    }

    if (userExists) {
      // Alert.alert("Error", "userExists");
      const apiEndPoint = APIEndPoints.login;
      const postData = { phoneNumber: mobileNumber, password };

      const response = await postRequest(apiEndPoint, postData);
      if (response.status == 0) {
        Alert.alert("Invalid credentials");
        return;
      }

      token_storage.set("app_access_token", response.tokens.access_token);
      token_storage.set("app_refresh_token", response.tokens.refresh_token);
      token_storage.set("client_data", response.user);

      setState(response.user);

      console.log(
        "--------------------------response.user----------",
        response.user
      );

      // navigation.navigate("Home");
      // return;
    }
  };

  const checkUserExists = async () => {
    const apiEndPoint = APIEndPoints.checkUser;
    const postData = { phoneNumber: mobileNumber };

    try {
      const response = await postRequest(apiEndPoint, postData);

      return response.exists;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  };

  const handlePhoneNumberChange = (text) => {
    setMobileNumber(text);
    setUserExists(null);
  };

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
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Login/Register with your mobile number
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobileNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>

        {userExists === false && (
          <TextInput
            style={styles.inputField}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
        )}

        {userExists !== null && (
          <TextInput
            style={styles.inputField}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={userExists === null ? handleLogin : handleSubmit}
        >
          <LinearGradient
            colors={GRADIENT_COLORS.buttonGradient}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.buttonBackground}
          >
            <Text style={styles.buttonText}>
              {userExists ? "Login" : "Register"}
            </Text>
          </LinearGradient>
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007aff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: "#007aff",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputField: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonBackground: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  animation: {
    width: "80%",
    height: "40%",
    marginBottom: 10,
  },
});

export default Login;
