import React, { useContext, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
// import { deleteAlbumImage } from "@/redux/actions/userAction";
// import { useDispatch } from "react-redux";
import LoadingAnimation from "../../Loader/loader";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

// Replace with your Cloudinary base URL and cloud name
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/sdchavan/image/upload/";

const CustomImagePicker = ({ images = [], maxImages = 6, onImagesChange }) => {
  const [loading, setLoading] = useState(false);

  const processedImagesnew = Array.isArray(images) ? images : [images];

  // Ensure images is an array, even if it comes in as something else
  const processedImages = Array.isArray(processedImagesnew)
    ? processedImagesnew.reduce((acc, image) => {
        if (typeof image === "string") {
          const splitImages = image.split(",").map((id) => {
            return id.startsWith("K")
              ? `${CLOUDINARY_BASE_URL}${id.trim()}`
              : id.startsWith("file://")
              ? id.trim()
              : id.trim();
          });
          return acc.concat(splitImages);
        }
        return acc.concat(image);
      }, [])
    : [];

  const [selectedImages, setSelectedImages] = useState(processedImages);
  const [profileFileIndex, setProfileFileIndex] = useState(
    processedImages.length > 0 ? 0 : null
  );

  const { translations } = useContext(LanguageContext);

  const pickImage = async (indexToReplace = null) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission denied",
        "You need to grant permission to access media."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;
      let updatedImages;

      if (indexToReplace !== null) {
        updatedImages = [...selectedImages];
        updatedImages[indexToReplace] = newImage;
      } else {
        updatedImages = [...selectedImages, newImage];
      }

      setSelectedImages(updatedImages);
      onImagesChange(updatedImages);

      if (profileFileIndex === null && updatedImages.length > 0) {
        setProfileFileIndex(0);
      }
    }
  };

  // const removeImage = (index) => {
  //   const updatedImages = selectedImages.filter((_, i) => i !== index);
  //   setSelectedImages(updatedImages);
  //   onImagesChange(updatedImages);

  //   if (profileFileIndex === index) {
  //     setProfileFileIndex(updatedImages.length > 0 ? 0 : null);
  //   } else if (profileFileIndex > index) {
  //     setProfileFileIndex(profileFileIndex - 1);
  //   }
  // };

  const removeImage = async (index) => {
    setLoading(true);

    const imageUri = selectedImages[index];

    // // Check if the image URI contains "K" (indicating it's a Cloudinary image)
    // if (imageUri.includes("K")) {
    //   // Extract Cloudinary public ID (if it's a Cloudinary image)
    //   const cloudinaryPattern =
    //     /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(.+)/;
    //   const match = imageUri.match(cloudinaryPattern);
    //   const cloudinaryPublicId = match ? match[1] : null;

    //   if (cloudinaryPublicId) {
    //     // Remove any query parameters (e.g., ?sig=...) from the public ID if present
    //     const publicId = cloudinaryPublicId.split("?")[0];
    //     const res = await dispatch(deleteAlbumImage(publicId));

    //     if (res.data.message) {
    //       setLoading(false);
    //       alert(res.data.message);
    //     }
    //   } else {
    //     setLoading(false);
    //     console.error("Could not extract public ID from Cloudinary image URL.");
    //   }
    // }

    // Remove image from selected images regardless of whether it's a Cloudinary image or not
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages);

    // Update profile image index
    if (profileFileIndex === index) {
      setProfileFileIndex(updatedImages.length > 0 ? 0 : null);
    } else if (profileFileIndex > index) {
      setProfileFileIndex(profileFileIndex - 1);
    }
    setLoading(false);
  };

  const markAsProfilePic = (index) => {
    setProfileFileIndex(index);
    console.log(`Image at index ${index} marked as Profile Picture.`);
  };

  return (
    <>
      {loading && <LoadingAnimation visible={loading} loop={true} />}

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {[...Array(maxImages)].map((_, index) => (
            <View key={index} style={styles.imageWrapper}>
              {selectedImages[index] ? (
                <>
                  <Image
                    source={{ uri: selectedImages[index] }}
                    style={styles.image}
                  />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.urlButton,
                      profileFileIndex === index && styles.urlButtonActive,
                    ]}
                    onPress={() => markAsProfilePic(index)}
                  >
                    <Text style={styles.urlButtonText}>
                      {profileFileIndex === index
                        ? translations.profilePicture
                        : translations.useAsProfilePicture}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.placeholder}
                  onPress={() => pickImage(index)}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={40}
                    color={themeColor.appColorLight}
                  />
                  <Text style={styles.addText}>
                    {translations.addImageTitle}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  placeholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: themeColor.appColorLightExtra,
    borderRadius: 5,
  },
  addText: {
    marginTop: 5,
    fontSize: 12,
    color: "#888",
  },
  removeButton: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  urlButton: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "blue",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  urlButtonActive: {
    backgroundColor: "green",
  },
  urlButtonText: {
    color: "white",
    fontSize: 10,
  },
});

export default CustomImagePicker;
