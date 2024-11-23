import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { LanguageContext } from "../../Context/LanguageContext";
import { themeColor } from "../../constants/Colors";

const ChooseLangButton = () => {
  const { setLang } = useContext(LanguageContext);
  const [selectedLang, setSelectedLang] = useState("mr"); // Default language

  const handleLanguageSelection = (lang) => {
    setLang(lang);
    setSelectedLang(lang);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedLang === "mr" && {
            backgroundColor: themeColor.appColorLight,
          },
          {
            borderColor: themeColor.appColorLight,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          },
        ]}
        onPress={() => handleLanguageSelection("mr")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedLang === "mr" && styles.activeText,
          ]}
        >
          मराठी
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[
          styles.button,
          selectedLang === "hi" && {
            backgroundColor: themeColor.appColorLightExtra,
          },
          { borderColor: themeColor.appColorLight },
        ]}
        onPress={() => handleLanguageSelection("hi")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedLang === "hi" && styles.activeText,
          ]}
        >
          हिंदी
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[
          styles.button,
          selectedLang === "en" && {
            backgroundColor: themeColor.appColorLight,
          },
          {
            borderColor: themeColor.appColorLight,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
          },
        ]}
        onPress={() => handleLanguageSelection("en")}
      >
        <Text
          style={[
            styles.buttonText,
            selectedLang === "en" && styles.activeText,
          ]}
        >
          English
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    // borderRadius: 4,
    // marginHorizontal: 5,
    backgroundColor: "#fff", // Background color for non-active buttons
    elevation: 2, // Optional: Add shadow for better visibility on Android
    borderStyle: "dotted",
  },
  activeButton: {
    // backgroundColor: "#007bff", // Background color for active button
  },
  buttonText: {
    fontSize: 12,
    color: "#000", // Text color for non-active buttons
  },
  activeText: {
    color: "#fff", // Text color for active button
  },
});

export default ChooseLangButton;
