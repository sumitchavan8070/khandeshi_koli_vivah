import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const MaritalStatusFormComponent = ({
  maritalStatusData,
  onMaritalStatusChange,
  containerStyle,
  dropdownStyle,
  placeholder,
  labelStyle,
}) => {
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(null);

  // Update the parent component with the selected marital status value
  useEffect(() => {
    if (onMaritalStatusChange) {
      onMaritalStatusChange(selectedMaritalStatus);
    }
  }, [selectedMaritalStatus]);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <Text style={styles.label}>Select Marital Status</Text> */}
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={maritalStatusData} // Use maritalStatusData prop for options
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedMaritalStatus}
        onChange={(item) => setSelectedMaritalStatus(item.value)}
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
    marginBottom: 20,
  },
});

export default MaritalStatusFormComponent;

// import React from "react";
// import { ScrollView } from "react-native";
// import MaritalStatusFormComponent from "./MaritalStatusFormComponent"; // Adjust the import based on your file structure

// const maritalStatusData = [
//   { label: "Single", value: "Single" },
//   { label: "Married", value: "Married" },
//   { label: "Divorced", value: "Divorced" },
//   { label: "Widowed", value: "Widowed" },
// ];

// const MyComponent = () => {
//   const handleMaritalStatusChange = (maritalStatus) => {
//     console.log("Selected Marital Status:", maritalStatus);
//   };

//   return (
//     <ScrollView>
//       <MaritalStatusFormComponent
//         maritalStatusData={maritalStatusData} // Pass the marital status data here
//         onMaritalStatusChange={handleMaritalStatusChange}
//       />
//     </ScrollView>
//   );
// };

// export default MyComponent;
