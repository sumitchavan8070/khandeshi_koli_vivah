import React from "react";
import { StyleSheet, View, Animated, Platform, Text } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { themeColor } from "../../constants/Colors";

function CustomToastMessage({ type, msg }) {
  let bgColor = `${themeColor.appColorLight}`;
  let textColor = "#000000";
  let icon = null;

  //   console.log("called" + type);

  switch (type) {
    case "successToast":
      bgColor = "lightgreen"; // You can define this color in your palette
      icon = (
        <Ionicons
          name="checkmark-circle-sharp"
          size={RFValue(16)}
          color={"black"}
        />
      );
      break;

    case "warningToast":
      bgColor = "#fcba03"; // Yellow-ish background for warning
      textColor = "#000"; // You can define a lighter text color for contrast
      icon = (
        <Ionicons
          name="warning-outline"
          size={RFValue(16)}
          color={"#000"} // Warning icon color
        />
      );
      break;

    case "normalToast":
      bgColor = "lightblue"; // Custom neutral color (define this in your palette)
      textColor = "#000";
      icon = (
        <Ionicons
          name="information-circle-outline"
          size={RFValue(16)}
          color={"black"}
        />
      );
      break;

    default:
      // In case of an unknown toast type, provide a fallback
      bgColor = themeColor.appColorLight;
      textColor = "#000";
      break;
  }

  return (
    <Animated.View style={[styles.modal, { backgroundColor: bgColor }]}>
      <View style={styles.subContainer}>
        {icon}
        <Text style={{ color: "#000" }}>{msg}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  modal: {
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? RFPercentage(4) : 16,
    paddingHorizontal: RFPercentage(3),
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 8, // Optional: Adds rounded corners to the toast
  },
});

export default CustomToastMessage;
