import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/yogaboy.json";

const NoItemYogaBoy = () => {
  return (
    <LottieView
      source={loadingAnimation}
      autoPlay
      loop={true}
      style={styles.animation}
    />
  );
};

export default NoItemYogaBoy;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  animation: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
});
