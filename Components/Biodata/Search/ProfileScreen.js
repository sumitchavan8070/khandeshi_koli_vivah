import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  useColorScheme,
  Animated,
  Alert,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { LanguageContext } from "../../../Context/LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeColor } from "../../../constants/Colors";

import Icon from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// const ProfileScreen = ({ route }) => {
//   const { profileData } = route.params; // Access passed data

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{profileData.fullName}</Text>
//       <Text style={styles.details}>Age: {profileData.age}</Text>
//       <Text style={styles.details}>Occupation: {profileData.occupation}</Text>
//       <Text style={styles.details}>
//         Location: {profileData.locationInfo?.district},{" "}
//         {profileData.locationInfo?.subDistrict},{" "}
//         {profileData.locationInfo?.village}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   details: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

const defaultProfilePic = "https://via.placeholder.com/300";
const defaultAlbumImage = "https://via.placeholder.com/150";
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/sdchavan/image/upload/";
import Feather from "@expo/vector-icons/Feather";

const ProfileScreen = ({ route }) => {
  const { user } = route.params; // Access passed data

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(defaultAlbumImage);

  const { translations } = useContext(LanguageContext);

  const [bookmark, setBookmark] = useState(false);

  const slideAnim = new Animated.Value(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("Item Recived " + JSON.stringify(user));
    renderBookmark(user?._id);
  }, []);

  const requestAlbumPermission = () => {
    //TODO
    Alert.alert("Will Implement Soon");
  };

  const showMeLocationInGoogleMap = () => {
    //TODO
    //https://www.npmjs.com/package/react-native-google-maps-directions
    Alert.alert("Will Implement Soon");
  };

  const requestPersonalInfoPermission = () => {
    Alert.alert("Will Implement Soon");
  };

  const requestToViewHomeAddress = () => {
    Alert.alert("Will Implement Soon");
  };

  const requestToViewMobileNumber = () => {
    Alert.alert("Will Implement Soon");
  };

  const onPressSendIntrest = () => {
    //To Do Send Intrest Notifiaction to User
    Linking.openURL(`tel:${user?.familyMobileNumber}`);
  };

  const onBookmarkPress = () => {
    Alert.alert("Will Implement Soon");
  };
  const onInfoPress = () => {
    Alert.alert("Will Implement Soon");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  const saveBookmark = async (itemId) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((val) => val === itemId);
        if (data == null) {
          res.push(itemId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          // alert("Item Saved");
        }
      } else {
        let bookmark = [];
        bookmark.push(itemId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        // alert("Item Saved");
      }
    });
  };

  const removeBookmark = async (itemId) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((id) => id !== itemId);
    });

    AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    // alert("Item Unsaved");
  };

  const renderBookmark = async (itemId) => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);

      if (res !== null) {
        let data = res.find((val) => val === itemId);
        return data == null ? setBookmark(false) : setBookmark(true);
      }
    });
  };

  const albumImages = user.album && user.album.length > 0 ? user.album : null;

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderAlbumImages = () => {
    if (!albumImages || albumImages.length === 0) {
      return (
        <View style={[styles.noAlbum, { borderColor: themeColor.appColor }]}>
          <Ionicons
            name="image-outline"
            size={30}
            color={themeColor.icon}
            style={{ paddingTop: 15 }}
          />
          <Text style={[{ color: themeColor.text }]}>
            {translations.noAlbumWarning}
          </Text>
        </View>
      );
    }

    // If album is private, show overlay with lock icon and request button
    if (user.isAlbumPrivate) {
      return (
        <View
          style={[
            styles.privateAlbumContainer,
            {
              marginTop: 10,
              alignContent: "center",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: themeColor.appColor,
            },
            {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          ]}
        >
          <Ionicons
            name="lock-closed"
            size={30}
            color={themeColor.appColor}
            style={{ alignSelf: "center" }}
          />
          <Text style={[styles.privateAlbumText, { color: themeColor.text }]}>
            {translations.albumPrivateText}
          </Text>
          <TouchableOpacity
            style={[
              styles.requestButton,
              { backgroundColor: themeColor.appColor },
            ]}
            onPress={requestAlbumPermission}
          >
            <Text style={styles.requestButtonText}>
              {translations.requestAlbumPermission}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.albumGrid,
          {
            borderColor: themeColor.appColor,
          },
        ]}
      >
        {albumImages.map((imageUri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(imageUri)}
          >
            <Image
              source={{ uri: `${CLOUDINARY_BASE_URL}${imageUri}` }}
              style={styles.albumImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Helper component to display each detail row
  const DetailRow = ({ label, value }) => (
    <View style={{ flexDirection: "row", marginVertical: 4 }}>
      <Text style={{ width: 150, fontWeight: "bold" }}>{label}:</Text>
      <Text>{value}</Text>
    </View>
  );

  const renderPersonalInformation = () => {
    if (user.isPersonalInformationIsPrivate) {
      return (
        <View
          style={[
            styles.privateAlbumContainer,
            {
              marginTop: 10,
              alignContent: "center",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: themeColor.appColor,
            },
            {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          ]}
        >
          <Ionicons
            name="lock-closed"
            size={30}
            color={themeColor.appColor}
            style={{ alignSelf: "center" }}
          />
          <Text style={[styles.privateAlbumText, { color: themeColor.text }]}>
            {translations.personalInfoPrivateText}
          </Text>
          <TouchableOpacity
            style={[
              styles.requestButton,
              { backgroundColor: themeColor.appColor },
            ]}
            onPress={requestPersonalInfoPermission}
          >
            <Text style={styles.requestButtonText}>
              {translations.requestForPersonalInformation}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.personalDetailSection,
          {
            borderColor: themeColor.appColor,
          },
        ]}
      >
        {/* Personal Details Section */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 20,
            color: themeColor.appColor,
          }}
        >
          🕵️ Personal Details 🔻
        </Text>
        <DetailRow label="Full Name" value={user.fullName} />
        <DetailRow label="Caste" value={user.caste} />
        <DetailRow label="DOB" value={user.dob} />
        {/* <DetailRow label="Birth Time" value={user.birthTime} /> */}
        {/* <DetailRow label="Birth Place" value={user.birthPlace} /> */}
        {/* <DetailRow label="Height" value={user.height} /> */}
        <DetailRow label="Blood Group" value={user.bloodGroup} />
        <DetailRow label="Skin Tone" value={user.skinTone} />
        <DetailRow label="Qualification" value={user.qualification} />
        <DetailRow label="Occupation" value={user.occupation} />
      </View>
    );
  };

  const renderFamilyInformation = () => {
    if (user.isPersonalInformationIsPrivate) {
      return (
        <View
          style={[
            styles.privateAlbumContainer,
            {
              marginTop: 10,
              alignContent: "center",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: themeColor.appColor,
            },
            {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          ]}
        >
          <Ionicons
            name="lock-closed"
            size={30}
            color={themeColor.appColor}
            style={{ alignSelf: "center" }}
          />
          <Text style={[styles.privateAlbumText, { color: themeColor.text }]}>
            {translations.familyInfoPrivateText}
          </Text>
          <TouchableOpacity
            style={[
              styles.requestButton,
              { backgroundColor: themeColor.appColor },
            ]}
            onPress={requestPersonalInfoPermission}
          >
            <Text style={styles.requestButtonText}>
              {translations.requestForfamilyInformation}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.familyDetailSection,
          {
            borderColor: themeColor.appColor,
          },
        ]}
      >
        {/* Family Information Section */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 20,
            color: themeColor.appColor,
          }}
        >
          👥 Family Information 🔻
        </Text>
        <DetailRow label="Father's Name" value={user.fatherName} />
        <DetailRow label="Father's Occupation" value={user.fatherOccupation} />

        <DetailRow
          label="Mobile Number"
          value={
            user.isMobileNumberIsPrivate
              ? translations.private
              : user.mobileNumber
          }
        />
        <DetailRow label="Mother's Name" value={user.motherName} />
        <DetailRow label="Total Brothers" value={user.totalBrothers} />
        <DetailRow label="Total Sisters" value={user.totalSisters} />
        <DetailRow
          label="Family Address"
          value={
            user.isHomeAddressIsPrivate
              ? translations.private
              : user.familyAddress
          }
        />
        <DetailRow
          label="Maternal Uncle's Name"
          value={user.maternalUncleName}
        />
        <DetailRow label="Proper Village" value={user.properVillage} />
        {/* Expectations Array Display */}
        <View style={{ marginTop: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Expectations:</Text>
          {user.expectations.map((expectation, index) => (
            <Text key={index} style={{ marginLeft: 16 }}>
              - {expectation}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderLocationInformation = () => {
    if (user.isHomeAddressIsPrivate) {
      return (
        <View
          style={[
            styles.privateAlbumContainer,
            {
              marginTop: 10,
              alignContent: "center",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: themeColor.appColor,
            },
            {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          ]}
        >
          <Ionicons
            name="lock-closed"
            size={30}
            color={themeColor.appColor}
            style={{ alignSelf: "center" }}
          />
          <Text style={[styles.privateAlbumText, { color: themeColor.text }]}>
            {translations.homeAddressInfoPrivateText}
          </Text>
          <TouchableOpacity
            style={[
              styles.requestButton,
              { backgroundColor: themeColor.appColor },
            ]}
            onPress={requestToViewHomeAddress}
          >
            <Text style={styles.requestButtonText}>
              {translations.requestForHomeAddress}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.bottomLocationContainer,
          {
            borderColor: themeColor.appColor,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          },
        ]}
      >
        <Ionicons
          name="location-outline"
          size={30}
          color={themeColor.appColor}
          style={{ marginLeft: 10 }}
        />
        <Text style={[{ color: themeColor.text }]}>
          {user.locationInfo?.district},{user.locationInfo?.subDistrict},
          {user.locationInfo?.village}
        </Text>

        {/* <TouchableOpacity
          style={[
            styles.catchLocationButton,
            {
              backgroundColor: themeColor.appColor,
              marginRight: 10,
            },
          ]}
          onPress={showMeLocationInGoogleMap}
        >
          <Text style={styles.catchLocationButtonText}>
            {translations.direction} ✈︎
          </Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderMobileNumber = () => {
    if (user.isMobileNumberIsPrivate) {
      return (
        <View
          style={[
            styles.privateAlbumContainer,
            {
              marginTop: 10,
              alignContent: "center",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: themeColor.appColor,
            },
            {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          ]}
        >
          <Entypo
            name="old-mobile"
            size={30}
            color={themeColor.appColor}
            style={{ alignSelf: "center", marginLeft: 10 }}
          />

          <Text style={[styles.privateAlbumText, { color: themeColor.text }]}>
            {translations.mobileNumberInfoPrivateText}
          </Text>
          <TouchableOpacity
            style={[
              styles.requestButton,
              { backgroundColor: themeColor.appColor },
            ]}
            onPress={requestToViewMobileNumber}
          >
            <Text style={styles.requestButtonText}>
              {translations.requestForMobileNumber}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.bottomMobileContainer,
          { borderColor: themeColor.appColor },
        ]}
      >
        <Entypo
          name="old-mobile"
          size={30}
          color={themeColor.appColor}
          style={{ marginLeft: 10 }}
        />

        <Text style={[{ color: themeColor.text }]}>
          {`${user?.familyMobileNumber?.slice(0, -5)}XXXXX`}
        </Text>

        <TouchableOpacity
          style={[
            styles.catchLocationButton,
            {
              backgroundColor: themeColor.appColor,
              marginRight: 10,
            },
          ]}
          onPress={() => Linking.openURL(`tel:${user?.familyMobileNumber}`)}
        >
          <Text style={styles.catchLocationButtonText}>
            {translations.contact} 😊
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: themeColor.background,
        }}
      >
        {/* Profile Header with Gradient Overlay */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri:
                `${CLOUDINARY_BASE_URL}${user?.album[0]}` || defaultProfilePic,
            }}
            style={styles.profilePic}
          />
          {/* <View style={styles.overlay} /> */}
        </View>

        <View
          style={[styles.container, { backgroundColor: themeColor.background }]}
        >
          {/* Profile Info Card */}

          <View
            style={[
              styles.profileInfoCard,
              {
                backgroundColor: themeColor.background,
                borderWidth: 1,
                borderColor: themeColor.appColor,
                borderStyle: "dashed",
              },
            ]}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginBottom: 5,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() =>
                  bookmark ? removeBookmark(user._id) : saveBookmark(user._id)
                }
              >
                <Ionicons
                  name={bookmark ? "bookmark" : "bookmark-outline"}
                  size={25}
                  color={"red"}
                />
              </TouchableWithoutFeedback>
              {/* <TouchableOpacity onPress={onInfoPress}>
                <Entypo
                  name="info-with-circle"
                  size={25}
                  color={themeColor.appColor}
                />
              </TouchableOpacity> */}
            </View>
            <Text
              style={[
                styles.name,
                { color: themeColor.text, marginBottom: 20 },
              ]}
            >{`${user.name} ${user.middleName} ${user.surname}`}</Text>
            {/* <View style={styles.verifiedContainer}>
              {user.isVerified ? (
                <MaterialIcons name="verified" size={20} color="blue" />
              ) : (
                <Ionicons name="close-circle" size={20} color="red" />
              )}
              <Text style={[styles.verifiedText, { color: themeColor.text }]}>
                {translations.verifiedTextHomePage}
              </Text>
            </View> */}

            {/* Personal Details */}
            <View style={styles.detailsSection}>
              <Icon name="cake" size={18} color={themeColor.appColor} />
              <Text style={[styles.details, { color: themeColor.text }]}>
                {translations.age} : {user.age}
              </Text>
            </View>
            <View style={styles.detailsSection}>
              <Icon name="school" size={18} color={themeColor.appColor} />
              <Text style={[styles.details, { color: themeColor.text }]}>
                {translations.qualification} : {user.qualification}
              </Text>
            </View>
            <View style={styles.detailsSection}>
              <Icon name="work" size={18} color={themeColor.appColor} />
              <Text style={[styles.details, { color: themeColor.text }]}>
                {translations.occupation} : {user.occupation}
              </Text>
            </View>
            <View style={styles.detailsSection}>
              <Icon name="place" size={18} color={themeColor.appColor} />
              <Text style={[styles.details, { color: themeColor.text }]}>
                {translations.location} : {user.locationInfo?.district},
                {user.locationInfo?.subDistrict}, {user.locationInfo?.village}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.requestButton,
                {
                  backgroundColor: themeColor.appColor,
                  marginTop: 15,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 20,
                },
              ]}
              onPress={onPressSendIntrest}
            >
              <Feather name="phone-call" size={24} color="white" />
              <Text
                style={[
                  styles.requestButtonText,
                  { alignSelf: "center", fontSize: 16 },
                ]}
              >
                {translations.call}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Album Section */}
          <Text style={[styles.sectionTitle, { color: themeColor.text }]}>
            📷 {translations.album} -
          </Text>
          {renderAlbumImages()}

          {renderPersonalInformation()}

          {renderFamilyInformation()}

          <View style={styles.profileHeaderFull}>
            <Image
              source={{
                uri:
                  `${CLOUDINARY_BASE_URL}${user?.album[0]}` ||
                  defaultProfilePic,
              }}
              style={styles.profilePicFull}
            />
            {/* <View style={styles.overlay} /> */}
          </View>
          {renderLocationInformation()}

          {renderMobileNumber()}

          {/* Full Image Modal */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={30} color="white" />
              </Pressable>

              <Image
                source={{ uri: `${CLOUDINARY_BASE_URL}${selectedImage}` }}
                style={styles.modalImage}
              />
            </View>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  profileHeader: {
    width: "100%",
    height: 400,
    // position: "relative",
    marginTop: "5%",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: "stretch",
  },

  profileHeaderFull: {
    width: "100%",
    maxHeight: 400,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: themeColor.appColor,
    padding: 10,
    borderRadius: 10,
  },
  profilePicFull: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: "contain",
    marginBottom: 20,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileInfoCard: {
    marginTop: -60,
    borderRadius: 15,
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  verifiedContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  verifiedText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  detailsSection: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  details: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  albumGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderWidth: 1,
    borderStyle: "dashed",
    margin: 5,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginTop: 20,
  },
  albumImage: {
    width: Dimensions.get("window").width / 3 - 25,
    height: Dimensions.get("window").width / 3 - 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  noAlbum: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 15,
    borderStyle: "dashed",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCloseButton: {
    // position: "absolute",
    // top: 50,
    // right: 20,
  },
  modalImageContainer: {
    width: "90%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  errorText: {
    color: "#f00",
    fontSize: 18,
    textAlign: "center",
  },
  privateAlbumContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    borderRadius: 10,
  },
  privateAlbumText: {
    fontSize: 16,
    marginVertical: 10,
  },
  requestButton: {
    // backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  requestButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  personalDetailSection: {
    borderStyle: "dashed",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    marginBottom: 16,
    borderWidth: 1,
  },
  familyDetailSection: {
    borderStyle: "dashed",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    marginBottom: 16,
    borderWidth: 1,
  },
  bottomLocationContainer: {
    width: "100%",
    maxHeight: 200,
    minHeight: 50,
    paddingVertical: 5,
    borderWidth: 1,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 15,
    borderStyle: "dashed",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
    justifyContent: "center",
  },

  bottomMobileContainer: {
    width: "100%",
    height: 50,
    padding: 5,
    borderWidth: 1,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 15,
    borderStyle: "dashed",
    flexDirection: "row",
    gap: 10,
    alignContent: "center",
    justifyContent: "space-between",
  },

  catchLocationButton: {
    // backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    // marginTop: 10,
  },
  catchLocationButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
