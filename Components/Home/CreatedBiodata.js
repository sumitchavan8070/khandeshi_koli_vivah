import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"; // Install if not already
import { deleteSvg, editSvg } from "../../constants/Svg";
import { SvgXml } from "react-native-svg";

const CreatedBiodata = ({ data, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Created Biodata</Text>

      {/* List of Biodata */}
      <View style={styles.list}>
        {data.map((item) => (
          <View key={item._id} style={styles.row}>
            {/* Avatar */}
            <View style={styles.rankAvatar}>
              <Image
                source={require("../../assets/user.png")}
                style={styles.avatar}
              />
            </View>

            {/* Username */}
            <Text style={styles.username}>{item.fullName}</Text>

            {/* Edit Icon */}
            <TouchableOpacity
              onPress={() => onEdit(item)}
              style={styles.iconContainer}
            >
              {/* <FontAwesome5 name="edit" size={20} color="#4CAF50" /> */}
              <MaterialCommunityIcons
                name="file-document-edit-outline"
                size={24}
                color="#4CAF50"
              />
            </TouchableOpacity>

            {/* Delete Icon */}
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Delete Biodata",
                  "Are you sure you want to delete this biodata?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: () => onDelete(item._id) },
                  ]
                )
              }
              style={styles.iconContainer}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color="#F44336"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CreatedBiodata;

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rankAvatar: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    flex: 1,
    fontSize: 16,
  },
  iconContainer: {
    marginHorizontal: 15,
  },
});
