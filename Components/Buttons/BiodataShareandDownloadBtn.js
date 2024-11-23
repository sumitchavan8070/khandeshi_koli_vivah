import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import BiodataPrice from "../Biodata/BiodataPrice/BiodataPrice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { themeColor } from "../../constants/Colors";

const BiodataShareandDownloadBtn = ({ captureScreen }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => captureScreen(false)} style={styles.btn}>
        <FontAwesome5
          name="share-alt"
          size={20}
          color={themeColor.appColorLight}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => captureScreen(true)}
        style={[styles.btn, { right: "20%" }]}
      >
        <FontAwesome5
          name="download"
          size={20}
          color={themeColor.appColorLight}
        />
      </TouchableOpacity>
      <BiodataPrice />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});

export default BiodataShareandDownloadBtn;
