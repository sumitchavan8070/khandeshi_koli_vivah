import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const QualificationFormComponent = ({
  qualifications,
  onQualificationChange,
  containerStyle,
  dropdownStyle,
  labelText,
  labelStyle,
  placeholder,
}) => {
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [customQualification, setCustomQualification] = useState(""); // For manual entry when "Other" is selected

  // Update the parent component with the selected qualification value
  useEffect(() => {
    if (onQualificationChange) {
      onQualificationChange(
        selectedQualification === "Other"
          ? customQualification
          : selectedQualification
      );
    }
  }, [selectedQualification, customQualification]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={qualifications}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedQualification}
        onChange={(item) => {
          setSelectedQualification(item.value);
          setCustomQualification(""); // Reset custom qualification when switching from "Other"
        }}
        placeholderStyle={labelStyle}
      />

      {selectedQualification === "Other" && (
        <View style={styles.column}>
          <Text style={styles.label}>Please Specify Qualification</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your qualification"
            value={customQualification}
            onChangeText={setCustomQualification}
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
    marginBottom: 20,
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

export default QualificationFormComponent;
