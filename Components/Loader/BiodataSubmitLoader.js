import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/havan.json";

const BiodataSubmitLoader = ({ visible, loop }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <LottieView
          source={loadingAnimation}
          autoPlay
          loop={loop}
          style={styles.animation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay with adjustable opacity
    justifyContent: "flex-end", // Align animation at the bottom
    alignItems: "center",
    paddingBottom: 30, // Distance from the bottom of the screen
    zIndex: 999,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    bottom: "7%",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default BiodataSubmitLoader;
