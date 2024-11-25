import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Svg, { Rect, Line } from "react-native-svg";

const ViewSwitchButton = ({ onToggle }) => {
  const [isGridView, setIsGridView] = useState(true);

  const handleToggle = () => {
    setIsGridView(!isGridView);
    onToggle && onToggle(!isGridView);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle} style={styles.button}>
        {isGridView ? (
          // Grid View Icon
          <Svg width="20" height="20" viewBox="0 0 20 20">
            <Rect x="1" y="1" width="8" height="8" fill="#009688" />
            <Rect x="12" y="1" width="8" height="8" fill="#009688" />
            <Rect x="1" y="12" width="8" height="8" fill="#009688" />
            <Rect x="12" y="12" width="8" height="8" fill="#009688" />
          </Svg>
        ) : (
          // List View Icon
          <Svg width="20" height="20" viewBox="0 0 20 20">
            <Rect x="2" y="2" width="6" height="6" fill="#03A9F4" />
            <Line
              x1="12"
              y1="5"
              x2="18"
              y2="5"
              stroke="#03A9F4"
              strokeWidth="2"
            />
            <Rect x="2" y="12" width="6" height="6" fill="#03A9F4" />
            <Line
              x1="12"
              y1="15"
              x2="18"
              y2="15"
              stroke="#03A9F4"
              strokeWidth="2"
            />
          </Svg>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // margin: 10,
  },
  button: {
    padding: 10,
  },
});

export default ViewSwitchButton;
