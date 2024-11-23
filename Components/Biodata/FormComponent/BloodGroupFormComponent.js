import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const BloodGroupFormComponent = ({
  bloodGroupData,
  onBloodGroupChange,
  containerStyle,
  dropdownStyle,
  lableText,
  lableStyle,
  placeholder,
}) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);

  // Update the parent component with the selected blood group value
  useEffect(() => {
    if (onBloodGroupChange) {
      onBloodGroupChange(selectedBloodGroup);
    }
  }, [selectedBloodGroup]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, lableStyle]}>{lableText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={bloodGroupData} // Use bloodGroupData prop for options
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedBloodGroup}
        onChange={(item) => setSelectedBloodGroup(item.value)}
        showsVerticalScrollIndicator={false}
        placeholderStyle={lableStyle}
      />

      {/* Disabled input field to display selected blood group */}
      {/* <TextInput
        style={styles.disabledInput}
        value={`Blood Group: ${
          selectedBloodGroup ? selectedBloodGroup : "N/A"
        }`}
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

export default BloodGroupFormComponent;

// import React from "react";
// import { ScrollView } from "react-native";
// import BloodGroupFormComponent from "./BloodGroupFormComponent"; // Adjust the import based on your file structure

// const bloodGroupData = [
//   { label: "A+", value: "A+" },
//   { label: "A-", value: "A-" },
//   { label: "B+", value: "B+" },
//   { label: "B-", value: "B-" },
//   { label: "AB+", value: "AB+" },
//   { label: "AB-", value: "AB-" },
//   { label: "O+", value: "O+" },
//   { label: "O-", value: "O-" },
// ];

// const MyComponent = () => {
//   const handleBloodGroupChange = (bloodGroup) => {
//     console.log("Selected Blood Group:", bloodGroup);
//   };

//   return (
//     <ScrollView>
//       <BloodGroupFormComponent
//         bloodGroupData={bloodGroupData} // Pass the blood group data here
//         onBloodGroupChange={handleBloodGroupChange}
//       />
//     </ScrollView>
//   );
// };

// export default MyComponent;
