import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useContext, useState } from "react";
import { stylesBiodata as styles } from "./SectionStyle";

import AddressFormComponent from "../FormComponent/AddressFormComponent";
import cities from "../../../constants/MaharashtraCities.json";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

const LocationInfoSection = ({ formData, handleInputChange }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionHeader}>
        {translations.loacationInfoTitle}
      </Text>

      {/* <Text style={[styles.label]}>{"My Current Address : "}</Text>
      <CustomLocationInput
        inputValue={formData.candidateLocation}
        onLocationChange={(text) =>
          handleInputChange("candidateLocation", text)
        }
      /> */}

      {/* <Text style={[styles.label]}>{"Family Address : "}</Text>
      <TextInput
        style={styles.input}
        placeholder="Family Address"
        value={formData.familyAddress}
        onChangeText={(text) => handleInputChange("familyAddress", text)}
      /> */}

      <AddressFormComponent
        cities={cities}
        onAddressChange={(text) => handleInputChange("locationInfo", text)}
        containerStyle={{}} // Optional: Custom styling
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        lableText={translations.permanantAddresstitle}
        lableStyle={{ color: "gray" }}
      />
    </View>
  );
};

export default LocationInfoSection;
