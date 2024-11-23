import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const CasteFormComponent = ({
  casteData,
  onCasteChange,
  containerStyle,
  dropdownStyle,
  lableText,
  lableStyle,
  placeholder,
}) => {
  const [selectedCaste, setSelectedCaste] = useState(null);

  // Update the parent component with the selected caste value
  useEffect(() => {
    if (onCasteChange) {
      onCasteChange(selectedCaste);
    }
  }, [selectedCaste]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, lableStyle]}>{lableText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={casteData} // Use casteData prop for options
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedCaste}
        onChange={(item) => setSelectedCaste(item.value)}
        showsVerticalScrollIndicator={false}
        placeholderStyle={lableStyle}
      />

      {/* Disabled input field to display selected caste */}
      {/* <TextInput
        style={styles.disabledInput}
        value={`Caste: ${selectedCaste ? selectedCaste : "N/A"}`}
        editable={false}
        selectTextOnFocus={false}
      /> */}
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
  disabledInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 20,
    backgroundColor: "#f0f0f0", // Light gray background for disabled input
    color: "black",
  },
});

export default CasteFormComponent;

// import React from "react";
// import { ScrollView } from "react-native";
// import CasteFormComponent from "./CasteFormComponent"; // Adjust the import based on your file structure

// const casteData = [
//   { label: "General", value: "General" },
//   { label: "OBC", value: "OBC" },
//   { label: "SC", value: "SC" },
//   { label: "ST", value: "ST" },
// ];

// const MyComponent = () => {
//   const handleCasteChange = (caste) => {
//     console.log("Selected Caste:", caste);
//   };

//   return (
//     <ScrollView>
//       <CasteFormComponent
//         casteData={casteData} // Pass the caste data here
//         onCasteChange={handleCasteChange}
//       />
//     </ScrollView>
//   );
// };

// export default MyComponent;
