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

import MultiSelectExpectationsComponent from "../FormComponent/MultiSelectExpectationsComponent";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

const ExpectationSection = ({ formData, handleInputChange }) => {
  const { translations } = useContext(LanguageContext);

  const occupations = [
    { label: translations.Engineer, value: "Engineer" },
    { label: translations.Doctor, value: "Doctor" },
    { label: translations.Driver, value: "Driver" },
    { label: translations.Teacher, value: "Teacher" },
    { label: translations.Lawyer, value: "Lawyer" },
    { label: translations.Nurse, value: "Nurse" },
    { label: translations.Architect, value: "Architect" },
    { label: translations.Electrician, value: "Electrician" },
    { label: translations.Plumber, value: "Plumber" },
    { label: translations.Carpenter, value: "Carpenter" },
    { label: translations.Chef, value: "Chef" },
    { label: translations.Pilot, value: "Pilot" },
    { label: translations.Artist, value: "Artist" },
    { label: translations.Farmer, value: "Farmer" },
    { label: translations.Mechanic, value: "Mechanic" },
    { label: translations.Scientist, value: "Scientist" },
    { label: translations.Pharmacist, value: "Pharmacist" },
    { label: translations.SoftwareDeveloper, value: "Software Developer" },
    { label: translations.Accountant, value: "Accountant" },
    { label: translations.PoliceOfficer, value: "Police Officer" },
    { label: translations.Other, value: "Other" }, // "Other" option
  ];

  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionHeader}>
        {translations.expectationSectionTitle}
      </Text>

      <MultiSelectExpectationsComponent
        expectationsData={occupations}
        onExpectationsChange={(text) => handleInputChange("expectations", text)}
        labelText={translations.expectationsTitle}
        containerStyle={{}}
        labelStyle={{ color: "gray" }}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        place={translations.expectationsPlaceholder}
      />

      <Text style={styles.infoTextBelow}>
        {translations.expectationGuideText}
      </Text>
    </View>
  );
};

export default ExpectationSection;
