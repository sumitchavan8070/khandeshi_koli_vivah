import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { LanguageContext } from "../../../Context/LanguageContext";

const DisabilityFormComponent = ({
  onDisabilityChange,
  containerStyle,
  dropdownStyle,
  labelText,
  lableStyle,
  placeholder,
}) => {
  const [selectedDisability, setSelectedDisability] = useState(null);
  const { translations } = useContext(LanguageContext);

  // Update the parent component with the selected disability value
  useEffect(() => {
    if (onDisabilityChange) {
      onDisabilityChange(selectedDisability);
    }
  }, [selectedDisability]);

  const disabilityOptions = [
    { label: translations.Yes, value: "yes" },
    { label: translations.No, value: "no" },
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, lableStyle]}>{labelText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={disabilityOptions} // Yes/No options
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedDisability}
        onChange={(item) => setSelectedDisability(item.value)}
        showsVerticalScrollIndicator={false}
        placeholderStyle={lableStyle}
      />
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
    marginBottom: 15,
  },
});

export default DisabilityFormComponent;
