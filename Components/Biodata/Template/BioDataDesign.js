import React, { useContext, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library"; // For saving to gallery
import { LanguageContext } from "../../../Context/LanguageContext";
import BiodataPrice from "../BiodataPrice/BiodataPrice";
import { themeColor } from "../../../constants/Colors";
import BiodataShareandDownloadBtn from "../../Buttons/BiodataShareandDownloadBtn";

const BiodataDesign = ({ formData }) => {
  const viewShot = useRef(null);
  const [uri, setUri] = useState("");
  const { translations } = useContext(LanguageContext);

  // Function to capture the screen and save or share the image
  const captureScreen = async (shouldSaveToGallery) => {
    try {
      const capturedUri = await viewShot.current.capture({
        format: "png",
        quality: 1,
        width: Dimensions.get("window").width * 2,
        height: Dimensions.get("window").height * 2,
      });
      console.log("uri: " + capturedUri);
      setUri(capturedUri);
      if (shouldSaveToGallery) {
        await saveToGallery(capturedUri);
      } else {
        await shareImage(capturedUri);
      }
    } catch (error) {
      console.error("Error capturing screen:", error);
    }
  };

  // Function to share the captured image
  const shareImage = async (capturedUri) => {
    try {
      await Sharing.shareAsync(capturedUri, {
        dialogTitle: "Share Biodata",
        UTI: "public.png",
        filename: "biodata.png",
      });
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  // Function to request media library permissions and save image
  const saveToGallery = async (capturedUri) => {
    try {
      // Request permissions to save to the gallery
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(capturedUri);
        await MediaLibrary.createAlbumAsync("Biodata", asset, false);
        console.log("Image saved to gallery:", asset.uri);
      } else {
        console.log("Permission to access gallery denied");
      }
    } catch (error) {
      console.error("Error saving image to gallery:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const candidateTypeLabel =
    translations[`candidateType${formData.candidateType}`] || "-";
  const complexionLabel = translations[`${formData.complexion}`] || "-";
  const maritalStatusLabel = translations[`${formData.maritalStatus}`] || "-";
  const casteLabel = translations[`${formData.caste}`] || "-";
  const occupationLabel = translations[`${formData.occupation}`] || "-";
  const eduactionLable = translations[`${formData.qualification}`] || "-";

  return (
    <>
      <ViewShot ref={viewShot} style={styles.container}>
        <ImageBackground
          source={require("../../../assets/biodata1.png")} // Your background image path
          style={[styles.backgroundImage]}
          resizeMode="contain"
        >
          <View style={{ flexDirection: "row", width: "100%", height: "100%" }}>
            <View style={styles.leftSection}>
              {formData.album[0] && (
                <Image
                  source={{ uri: formData.album[0] }}
                  style={[
                    styles.profileImage,
                    formData.maritalStatus !== "Single"
                      ? { marginBottom: "5%" }
                      : { marginBottom: "18%" },
                  ]}
                />
              )}

              <View style={styles.aadavaDetails}>
                <Text style={styles.sectionHeader}>
                  ❉ {translations.overview} ❉
                </Text>

                <Text
                  style={[
                    styles.leftContent,
                    formData.maritalStatus !== "single" && {
                      backgroundColor: "#fff",
                      color: "black",
                      textAlign: "center",
                      borderRadius: 5,
                      marginRight: 8,
                      paddingVertical: 2,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {translations.vaivahikStiti}: {maritalStatusLabel}
                </Text>

                <Text style={styles.leftContent}>
                  {translations.vyavsay} : {occupationLabel}
                </Text>
                <Text style={styles.leftContent}>
                  {translations.jat} : {casteLabel}
                </Text>

                <Text style={styles.leftContent}>
                  {translations.raktgat} : {formData.bloodGroup || "-"}
                </Text>
                <Text style={styles.leftContent}>
                  {translations.gav} : {formData.locationInfo.village || "-"}
                </Text>
                <Text style={styles.leftContent}>
                  {translations.taluka} :{" "}
                  {formData.locationInfo.subDistrict || "-"}
                </Text>
                <Text style={styles.leftContent}>
                  {translations.jilha} : {formData.locationInfo.district || "-"}
                </Text>
                <Text style={styles.leftContent}>
                  {translations.mamacheGav} :{" "}
                  {`${formData.maternalUncleLocationInfo.village} (${formData.maternalUncleLocationInfo.subDistrict},${formData.maternalUncleLocationInfo.district})`}
                </Text>
                <Text
                  style={[
                    styles.leftContent,
                    formData.isPhysicalDisabled === "yes"
                      ? {
                          backgroundColor: "#fff",
                          color: "black",
                          textAlign: "center",
                          borderRadius: 5,
                          marginRight: 8,
                          paddingVertical: 2,
                          fontWeight: "bold",
                        }
                      : {},
                  ]}
                >
                  {translations.apangatva} :{" "}
                  {formData.isPhysicalDisabled === "yes"
                    ? translations.Yes
                    : translations.No}
                </Text>
              </View>

              <View style={styles.kundaliDetails}>
                <Text style={[styles.sectionHeader, { fontSize: 9 }]}>
                  ❉ {translations.janmakundaliMahiti} ❉
                </Text>
                {/* <Text style={styles.leftContent}>
                    जन्म :
                    {` ${formData.birthTime.timeOfDay}, ${
                      formData.birthTime.hour
                    }:${formData.birthTime?.minute || "00"}`}
                  </Text> */}
                <Text style={styles.leftContent}>
                  {translations.janma} :{" "}
                  {`${
                    translations[`timeOfDay${formData.birthTime.timeOfDay}`] ||
                    formData.birthTime.timeOfDay
                  }, ${formData.birthTime.hour}:${
                    formData.birthTime?.minute || "00"
                  }`}
                </Text>

                <Text style={styles.leftContent}>
                  {translations.janmasthan} : {`${formData.birthPlace.village}`}
                </Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              <Text style={styles.title}>॥ श्री गणेशाय नमः ॥</Text>

              <Text style={styles.subtitle}>
                {translations.biodata}{" "}
                <Text
                  style={{ color: "green", fontWeight: "bold", fontSize: 12 }}
                >
                  {"(" +
                    (formData.candidateType === "Male"
                      ? translations.candidateTypeMale
                      : translations.candidateTypeFemale) +
                    ")"}
                </Text>
              </Text>

              <Text style={styles.candidateName}>
                {"कु."} {formData.name.trim()} {formData.middleName.trim()}{" "}
                {formData.surname.trim()}
              </Text>

              <View style={styles.infoSection}>
                <Text style={styles.infoHeader}>
                  ❉ {translations.vaiyaktikMahiti} ❉
                </Text>

                <Text style={styles.infoText}>
                  {translations.sampurnaNav} : {formData.name.trim()}{" "}
                  {formData.middleName.trim()} {formData.surname.trim()}
                </Text>

                <Text style={styles.infoText}>
                  {translations.janmatarih} : {formatDate(formData.dob)}
                </Text>

                <Text style={styles.infoText}>
                  {translations.vay} : {formData.age || "-"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.varn} : {complexionLabel}
                </Text>
                <Text style={styles.infoText}>
                  {translations.jat} : {casteLabel}
                </Text>

                <Text style={styles.infoText}>
                  {translations.unchi} :{" "}
                  {`${formData.height.feet} ${translations.feet} ${formData.height.inch} ${translations.inch}`}
                </Text>

                <Text style={styles.infoText}>
                  {translations.shaikshanikMahiti} : {eduactionLable}
                </Text>
                <Text style={styles.infoText}>
                  {translations.nokriVyavsay} : {occupationLabel}
                </Text>
                <Text style={styles.infoText}>
                  {translations.varshikUtpan} : {formData.annualIncome || "-"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.nokricheThikan} :{" "}
                  {`${formData.workLocationInfo.village} (${formData.workLocationInfo.subDistrict},${formData.workLocationInfo.district})`}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoHeader}>
                  ❉ {translations.kautumbikParshwabhumiTapsil} ❉
                </Text>
                <Text style={styles.infoText}>
                  {translations.vadilNav} : {formData.fatherName || "-"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.vadilVyavsay} :{" "}
                  {formData.fatherOccupation || "-"}
                </Text>

                <Text style={styles.infoText}>
                  {translations.aicheNav} : {formData.motherName || "-"}
                </Text>

                <Text style={styles.infoText}>
                  {translations.ekunBhav} : {formData.totalBrothersCount || "0"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.vivahitBhav} :{" "}
                  {formData.totalMarriedBorthersCount || "0"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.ekunBahin} : {formData.totalSistersCount || "0"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.vivahitBahin} :{" "}
                  {formData.totalMarriedSistersCount || "0"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.mamacheSampurnaNav} :{" "}
                  {formData.maternalUncleName || "-"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.mamacheGav} :{" "}
                  {`${formData.maternalUncleLocationInfo.village} (${formData.maternalUncleLocationInfo.subDistrict},${formData.maternalUncleLocationInfo.district})`}
                </Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.infoHeader}>
                  ❉ {translations.samparkachiMahiti} ❉
                </Text>
                <Text style={styles.infoText}>
                  {translations.samparkKramank} :{" "}
                  {formData.familyMobileNumber || "-"}
                </Text>
                <Text style={styles.infoText}>
                  {translations.kaimchaPatta} :{" "}
                  {`${formData.locationInfo.village} (${formData.locationInfo.subDistrict},${formData.locationInfo.district})`}
                </Text>
              </View>
              <View style={styles.infoSection}>
                <Text style={[styles.infoHeader, { borderBottomWidth: 0 }]}>
                  ❉ {translations.apeksha} ❉
                </Text>
                {formData.expectations && formData.expectations.length > 0 ? (
                  formData.expectations.map((expectation, index) => {
                    // Translate the expectation directly
                    const expectationLabel =
                      translations[`${expectation}`] || expectation; // Fallback to original text if translation not found

                    return (
                      <Text key={index} style={styles.infoText}>
                        {`\u2022 ${expectationLabel}`}
                      </Text>
                    );
                  })
                ) : (
                  <Text style={styles.infoText}>
                    {translations.noSpecialExpectations ||
                      translations.koniVisheshApekshaNahi}{" "}
                    {/* Fallback to default message */}
                  </Text>
                )}
              </View>

              {/* QR Code Implementation  */}
              <View style={styles.qrSection}>
                <View style={{}}>
                  <Image
                    source={require("../../../assets/googleqrcolor.png")}
                    style={styles.qrImage}
                  />
                </View>
                <View style={{}}>
                  <Text style={styles.qrUid}>UID : 100205</Text>
                  <Text style={styles.qrInfo}>
                    {translations.adhikMahitiSathi} *
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 4,
                  bottom: "3.5%",
                  position: "absolute",
                  color: "green",
                  fontWeight: "bold",
                  right: "8%",
                }}
              >
                {translations.haIdMobileAppSearch} *
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ViewShot>
      <BiodataShareandDownloadBtn captureScreen={captureScreen} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  btn: {
    marginHorizontal: 10,
    padding: 8,
    // backgroundColor: "#ddd",
    // backgroundColor: themeColor,
    borderRadius: 5,
  },

  btnTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  previewImage: { width: 200, height: 200, backgroundColor: "#fff" },
  heading: {
    alignSelf: "center",
  },

  leftSection: {
    width: "40%",
    // backgroundColor: "#ff6b00",
    padding: 20,
    justifyContent: "center",
    left: "1.6%",
  },
  rightSection: {
    width: "65%",
    padding: 20,
  },
  profileImage: {
    width: 90, // Adjust as needed
    height: 90, // Adjust as needed
    borderRadius: 50, // Make it circular
    marginTop: "41%",
    backgroundColor: "#e0e0e0", // Optional: Add a background color for better visibility
  },
  leftContent: {
    fontSize: 10,
    color: "#fff",
    marginTop: "7%",
  },
  sectionHeader: {
    fontSize: 10,
    color: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    // marginBottom: 10,
    textAlign: "center",
  },

  aadavaDetails: {
    marginTop: "8%",
  },

  kundaliDetails: {
    marginTop: "45%",
  },

  title: {
    fontSize: 10,
    color: "#000",
    textAlign: "center",
    marginTop: "8%",
    left: "-5%",
  },
  subtitle: {
    fontSize: 8,
    color: "#000",
    textAlign: "center",
    // marginBottom: 20,
    right: "7%",
  },

  infoSection: {
    marginTop: "8%",
    right: "10%",
  },
  infoHeader: {
    fontSize: 12,
    color: "#ff6b00",
    borderBottomWidth: 1,
    borderBottomColor: "#ff6b00",
  },

  infoText: {
    fontSize: 9,
    marginTop: "1%",
  },
  candidateName: {
    marginTop: "5%",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f828be",
    fontStyle: "italic",
    right: "5%",
  },
  qrSection: {
    borderWidth: 1,
    borderColor: "#ff6b00",
    bottom: "5%",
    right: "8%",
    position: "absolute",
    padding: "2%",
    // flexDirection: "row",
    borderStyle: "dotted",
    borderRadius: 10,
  },
  qrImage: { width: 30, height: 30, alignSelf: "center" },
  qrUid: { fontSize: 8, textAlign: "center" },
  qrInfo: { fontSize: 4, textAlign: "center" },
});

export default BiodataDesign;
