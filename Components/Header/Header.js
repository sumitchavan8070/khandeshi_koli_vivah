import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import { menuSvg, notificationSvg } from "../../constants/Svg";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 20,
      }}
    >
      <SvgXml xml={menuSvg} width={40} height={40} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Koli Vivah</Text>
      <SvgXml xml={notificationSvg} width={40} height={40} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
