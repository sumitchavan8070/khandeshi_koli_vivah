import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const ComplexionFormComponent = ({
  complexionData,
  onComplexionChange,
  containerStyle,
  dropdownStyle,
  labelText,
  labelStyle,
  placeholder,
}) => {
  const [selectedComplexion, setSelectedComplexion] = useState(null);

  // Update the parent component with the selected complexion value
  useEffect(() => {
    if (onComplexionChange) {
      onComplexionChange(selectedComplexion);
    }
  }, [selectedComplexion]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={complexionData} // Use complexionData prop for options
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedComplexion}
        onChange={(item) => setSelectedComplexion(item.value)}
        showsVerticalScrollIndicator={false}
        placeholderStyle={labelStyle}
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

export default ComplexionFormComponent;
