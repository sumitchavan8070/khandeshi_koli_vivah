import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const FloatingActionButton = ({
  onCreateBiodata,
  onChooseTemplate,
  onUploadPhoto,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              onCreateBiodata();
            }}
          >
            <FontAwesome5 name="file-alt" size={20} color="#fff" />
            <Text style={styles.menuItemText}>Create Biodata</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              onChooseTemplate();
            }}
          >
            <MaterialCommunityIcons
              name="image-frame"
              size={25}
              color="white"
            />
            <Text style={styles.menuItemText}>Choose Template</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              toggleMenu();
              onUploadPhoto();
            }}
          >
            <FontAwesome5 name="camera" size={20} color="#fff" />
            <Text style={styles.menuItemText}>Upload Banner Photo</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <FontAwesome5
          name={menuVisible ? "times" : "plus"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    right: 20,
    alignItems: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#066AC9",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  menu: {
    // position: "absolute",
    bottom: 70,
    right: 0,
    backgroundColor: "#066AC9",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
});

export default FloatingActionButton;
