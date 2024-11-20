import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { SvgXml } from "react-native-svg";

const navBarData = [
  {
    key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.02 2.83998L3.63 7.03998C2.73 7.73998 2 9.22998 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.28998 21.19 7.73998 20.2 7.04998L14.02 2.71998C12.62 1.73998 10.37 1.78998 9.02 2.83998Z" stroke="#263238" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
    value: "/main-board",
  },
  {
    key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.2533 16.7467 2 11.5 2C6.25329 2 2 6.2533 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="#292D32" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            <path opacity="0.4" d="M22 22L20 20" stroke="#292D32" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
    value: "/sme",
  },
  {
    key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.745 21.5022C12.3754 21.6326 11.7666 21.6326 11.397 21.5022C8.24448 20.426 1.2002 15.9363 1.2002 8.32678C1.2002 4.9677 3.90703 2.25 7.24436 2.25C9.22285 2.25 10.9731 3.20663 12.071 4.68506C13.169 3.20663 14.93 2.25 16.8976 2.25C20.235 2.25 22.9418 4.9677 22.9418 8.32678C22.9418 15.9363 15.8975 20.426 12.745 21.5022Z" stroke="#51526C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
    value: "/buy-back",
  },
  {
    key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
    value: "/blogs",
  },
];

const BlurBottomNavigationBar = ({ selectedIndex, onItemTapped }) => {
  return (
    <View style={styles.container}>
      {navBarData.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onItemTapped(index, item.value)}
          style={[
            styles.navItem,
            selectedIndex === index && styles.selectedNavItem,
          ]}
        >
          <SvgXml xml={item.key} width={24} height={24} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    margin: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(69, 90, 100, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    overflow: "hidden",
  },
  navItem: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedNavItem: {
    color: "#6200EE",
  },
});

BlurBottomNavigationBar.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  onItemTapped: PropTypes.func.isRequired,
};

export default BlurBottomNavigationBar;
