import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const OccupationFormComponent = ({
  occupations,
  onOccupationChange,
  containerStyle,
  dropdownStyle,
  lableText,
  lableStyle,
  placeholder,
}) => {
  const [selectedOccupation, setSelectedOccupation] = useState(null);
  const [customOccupation, setCustomOccupation] = useState(""); // For manual entry when "Other" is selected

  // Update the parent component with the selected occupation value
  useEffect(() => {
    if (onOccupationChange) {
      // onOccupationChange({
      //   occupation:
      //     selectedOccupation === "Other"
      //       ? customOccupation
      //       : selectedOccupation,
      // });
      onOccupationChange(
        selectedOccupation === "Other" ? customOccupation : selectedOccupation
      );
    }
  }, [selectedOccupation, customOccupation]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, lableStyle]}>{lableText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={occupations}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedOccupation}
        onChange={(item) => {
          setSelectedOccupation(item.value);
          setCustomOccupation(""); // Reset custom occupation when switching from "Other"
        }}
        placeholderStyle={lableStyle}
      />

      {selectedOccupation === "Other" && (
        <View style={styles.column}>
          <Text style={styles.label}>Enter Occupation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your occupation"
            value={customOccupation}
            onChangeText={setCustomOccupation}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  column: {
    // marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
});

export default OccupationFormComponent;
