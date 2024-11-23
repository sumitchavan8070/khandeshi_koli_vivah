import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const CustomLocationInput = ({ inputValue, onLocationChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (onLocationChange) {
      onLocationChange(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchLocationInfo = async (latitude, longitude) => {
    try {
      const locationInfo = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (locationInfo && locationInfo.length > 0) {
        // console.log("-------" + JSON.stringify(locationInfo));

        const { city, country, postalCode } = locationInfo[0];
        setSelectedLocation(`${city}, ${country} ${postalCode}`);
      }
    } catch (error) {
      console.error("Error fetching location info:", error);
    }
  };

  const handleAddLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please enable location access in settings."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("location" + JSON.stringify(location));

      fetchLocationInfo(latitude, longitude);
    } catch (error) {
      console.error("Error getting current location:", error);
      Alert.alert(
        "Error",
        "Failed to get current location. Please try again later."
      );
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.disabledInput}
        placeholder="Tap on icon to retrieve current address"
        value={inputValue}
        onChangeText={(item) => setSelectedLocation(item)}
        editable={false}
      />
      <TouchableOpacity onPress={handleAddLocation}>
        <Ionicons
          name="location"
          size={26}
          color={"green"}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 20,
    bottom: -5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  disabledInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    // marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#f0f0f0", // Light gray background for disabled input
    color: "black",
    width: "100%",
    alignSelf: "flex-start",
  },
});

export default CustomLocationInput;
