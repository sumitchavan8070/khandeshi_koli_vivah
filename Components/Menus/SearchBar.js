import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { SvgXml } from "react-native-svg";

const SearchBar = () => {
  const [biodataNumber, setBiodataNumber] = useState("");

  //   const locationSvg = `
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#007bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
  //       <path d="M21 10c0 5.25-9 13-9 13s-9-7.75-9-13a9 9 0 1 1 18 0z"></path>
  //       <circle cx="12" cy="10" r="3"></circle>
  //     </svg>
  //   `;

  const profileSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  const searchSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `;

  return (
    <View style={styles.searchContainer}>
      <SvgXml xml={profileSvg} width={24} height={24} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Enter Biodata Number"
        placeholderTextColor="#a6a6a6"
        value={biodataNumber}
        onChangeText={setBiodataNumber}
      />
      <TouchableOpacity style={styles.searchButton}>
        <SvgXml xml={searchSvg} width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    margin: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  searchButton: {
    padding: 10,
  },
});

export default SearchBar;
