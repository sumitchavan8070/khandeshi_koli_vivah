import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BlurBottomNavigationBar from "./BlurBottomNavigationBar"; // Update this path as needed

function SettingsScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemTapped = (index, value) => {
    setSelectedIndex(index);
    console.log("Navigating to:", value);
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "flex-end", // Ensure the navigation bar stays at the bottom
      padding: 16,
    },
  });

  return (
    <View style={styles.screen}>
      <BlurBottomNavigationBar
        selectedIndex={selectedIndex}
        onItemTapped={handleItemTapped}
      />
    </View>
  );
}

export default SettingsScreen;
