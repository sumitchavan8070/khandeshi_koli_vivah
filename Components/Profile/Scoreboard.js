import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"; // Install if not already
import { themeColor } from "../../constants/Colors";

const Scoreboard = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return null;
  }
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.rankContainer}>
        <Image
          //  source={{ uri: item.avatar }}
          source={require("../../assets/profile.png")}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.username}>{item?.fullName}</Text>

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
          size={22}
          color="#F44336"
        />
      </TouchableOpacity>

      {item.biodataStatus == "draft" ||
        (item.biodataStatus == "inpayment" && (
          <TouchableOpacity
            onPress={() => onEdit(item)}
            style={styles.iconContainer}
          >
            {/* <FontAwesome5 name="edit" size={20} color="#4CAF50" /> */}
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={22}
              color="#4CAF50"
            />
          </TouchableOpacity>
        ))}

      {item.biodataStatus == "inpayment" && (
        <Text
          style={{
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderWidth: 0.5,
            borderRadius: 8,
            backgroundColor: themeColor.appColor,
            color: "white",
          }}
        >
          Pay
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Created Biodata</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Profile 👤</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Name 😎</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Actions 🛠️</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item?._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 20,
  },
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rankContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  rank: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  username: {
    flex: 2,
    fontSize: 14,
    color: "#333",
  },
  streak: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#FF5722",
  },
  score: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#FFC107",
  },
});

export default Scoreboard;
