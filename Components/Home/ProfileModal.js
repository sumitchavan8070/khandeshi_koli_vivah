// import React, { useState, useEffect, useContext } from "react";
// import {
//   Modal,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import axios from "axios";
// import {
//   getRequest,
//   getRequestWithParams,
// } from "../../utils/network_service/api_request";
// import APIEndPoints from "../../utils/network_service/api_endpoints";
// import { AuthContext } from "../../Context/authContext";

// const ProfileModal = ({ visible, onClose, navigateToTemplate }) => {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [state, setState] = useContext(AuthContext);

//   useEffect(() => {
//     if (visible) {
//       fetchProfiles();
//     }
//   }, [visible]);

//   const fetchProfiles = async () => {
//     try {
//       //   const response = await axios.get("YOUR_BACKEND_API_URL"); // Replace with your API URL
//       const apiEndPoint = APIEndPoints.get_inpayment_profiles;
//       const userId = state._id;
//       const response = await getRequestWithParams(apiEndPoint, { userId });

//       setProfiles(response.profiles);
//     } catch (error) {
//       console.log(error);

//       Alert.alert("Error", "Failed to load profiles.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileSelect = (profile) => {
//     onClose(); // Close modal
//     navigateToTemplate(profile); // Navigate to BiodataTemplateScreen with profile data
//   };

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={styles.modalContainer}>
//         <View style={styles.modalContent}>
//           <Text style={styles.title}>Choose Profile</Text>
//           {loading ? (
//             <ActivityIndicator size="large" color="#000" />
//           ) : (
//             <FlatList
//               data={profiles}
//               keyExtractor={(item) => item._id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.profileItem}
//                   onPress={() => handleProfileSelect(item)}
//                 >
//                   <Text style={styles.profileName}>
//                     {item.fullName || "N/A"}
//                   </Text>
//                   <Text style={styles.profileDetails}>
//                     {item.gender || "N/A"}, {item.age || "N/A"} years
//                   </Text>
//                 </TouchableOpacity>
//               )}
//               ListEmptyComponent={
//                 <Text style={styles.emptyText}>No profiles available.</Text>
//               }
//             />
//           )}
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     padding: 20,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   profileItem: {
//     width: "100%",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//   },
//   profileName: {
//     fontSize: 16,
//     fontWeight: "bold",
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

// export default ProfileModal;

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
import { getRequestWithParams } from "../../utils/network_service/api_request";
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

      setProfiles(response.profiles);
    } catch (error) {
      console.log(error);
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
        <View>
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
            alignSelf: "center",
            paddingVertical: 2,
            color: "green",
            fontSize: 12,
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

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    maxHeight: "70%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileItem: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  profileList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  profileName: {
    fontSize: 14,
    // fontWeight: "bold",
  },
  profileDetails: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileModal;
