import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import {
  getRequest,
  getRequestWithParams,
} from "../../utils/network_service/api_request";
import APIEndPoints from "../../utils/network_service/api_endpoints";
import { AuthContext } from "../../Context/authContext";
import { themeColor } from "../../constants/Colors";

const ProfileModal = ({ visible, onClose, navigateToTemplate }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [state] = useContext(AuthContext);

  useEffect(() => {
    if (visible) {
      fetchProfiles();
    }
  }, [visible]);

  const fetchProfiles = async () => {
    try {
      const apiEndPoint = APIEndPoints.get_inpayment_profiles;
      const userId = state._id;
      const response = await getRequestWithParams(apiEndPoint, { userId });
      // const response = await getRequest(apiUrl);
      setProfiles(response.profiles);
    } catch (error) {
      // console.log(error);
      Alert.alert("Error", "Failed to load profiles.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSelect = (profile) => {
    onClose(); // Close modal
    navigateToTemplate(profile); // Navigate to BiodataTemplateScreen with profile data
  };

  const renderProfileItem = ({ item }) => (
    <TouchableOpacity
      style={styles.profileItem}
      onPress={() => handleProfileSelect(item)}
    >
      <View style={styles.profileList}>
        <Image
          source={require("../../assets/user.png")} // Path to your static image
          style={styles.profileImage}
        />
        <View style={{}}>
          <Text style={styles.profileName}>{item.fullName || "N/A"}</Text>
          <Text style={{ color: "lightgray", fontSize: 12 }}>
            Age : <Text>{item.age}</Text>
          </Text>
        </View>
        <Text
          style={{
            paddingHorizontal: 10,
            borderColor: themeColor.appColorLightExtra,
            borderWidth: 1,
            borderRadius: 15,
            paddingVertical: 2,
            color: "green",
            fontSize: 10,
          }}
        >
          {item.biodataStatus}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Choose Profile</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={profiles}
              keyExtractor={(item) => item._id}
              renderItem={renderProfileItem}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No profiles available.</Text>
              }
              showsVerticalScrollIndicator={false}
              bounces={false}
            />
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   profileTextContainer: {
//     flex: 1,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//     maxHeight: "70%",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   profileItem: {
//     width: "100%",
//     // padding: 10,
//     borderBottomWidth: 0.5,
//     borderColor: "#ddd",
//   },
//   profileList: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 20,
//   },
//   profileName: {
//     fontSize: 14,
//     // fontWeight: "bold",

//     flex: "wrap",
//   },
//   profileDetails: {
//     fontSize: 14,
//     color: "#555",
//   },
//   emptyText: {
//     fontSize: 14,
//     color: "#999",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

const styles = StyleSheet.create({
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    maxHeight: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  profileItem: {
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  profileList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 5,
  },
  profileDetails: {
    fontSize: 14,
    color: "#555",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: "#28A745",
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: "center",
    color: "#28A745",
    fontSize: 12,
    fontWeight: "500",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileModal;
