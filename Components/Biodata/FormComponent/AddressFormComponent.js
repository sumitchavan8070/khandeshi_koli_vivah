// // Instirctions

// /* To use This Component we need to do following in the componenet where we are using this component
//  ****************    const [selectedAddress, setSelectedAddress] = useState({
//     district: null,
//     subDistrict: null,
//     village: null,
//      });

//   // Handle address change when user selects district, sub-district, and village
//  ***************** const handleAddressChange = (address) => {
//     setSelectedAddress(address);
//   };

//   // Custom submit handler
//   *****************const handleAddressSubmit = () => {
//     if (
//       selectedAddress.district &&
//       selectedAddress.subDistrict &&
//       selectedAddress.village
//     ) {
//       Alert.alert("Selected Address", JSON.stringify(selectedAddress, null, 2));
//     } else {
//       Alert.alert("Error", "Please select all fields");
//     }
//   };
//  ******************<AddressFormComponent
//           cities={cities}
//           onAddressChange={handleAddressChange}
//           containerStyle={{}} // Optional: Custom styling
//           dropdownStyle={{ borderColor: "blue" }} // Optional: Custom dropdown styling
//         />

//         */

import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";
const AddressFormComponent = ({
  cities,
  onAddressChange,
  containerStyle,
  dropdownStyle,
  lableText,
  lableStyle,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const { translations } = useContext(LanguageContext);

  // Get districts from JSON
  const districts =
    cities?.districts?.map((district) => ({
      label: district.district,
      value: district.district,
    })) ?? [];

  // Get sub-districts based on selected district
  const subDistricts = selectedDistrict
    ? cities?.districts
        ?.find((d) => d.district === selectedDistrict)
        ?.subDistricts?.map((subDistrict) => ({
          label: subDistrict.subDistrict,
          value: subDistrict.subDistrict,
        })) ?? []
    : [];

  // Get villages based on selected sub-district
  const villages = selectedSubDistrict
    ? cities?.districts
        ?.find((d) => d.district === selectedDistrict)
        ?.subDistricts?.find((subD) => subD.subDistrict === selectedSubDistrict)
        ?.villages?.map((village) => ({
          label: village,
          value: village,
        })) ?? []
    : [];

  // Update the parent component with the selected address values
  useEffect(() => {
    if (onAddressChange) {
      onAddressChange({
        district: selectedDistrict,
        subDistrict: selectedSubDistrict,
        village: selectedVillage,
      });
    }
  }, [selectedDistrict, selectedSubDistrict, selectedVillage]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, lableStyle]}>{lableText}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          dropdownStyle,
          { backgroundColor: themeColor.filedDisableColor },
        ]}
        data={[
          {
            label: cities?.state ?? "Maharashtra",
            value: cities?.state ?? "Maharashtra",
          },
        ]}
        value={cities?.state ?? "Maharashtra"}
        labelField="label"
        valueField="value"
        disable={true}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          {/* <Text style={styles.label}>Select District</Text> */}
          <Dropdown
            style={[styles.dropdown, dropdownStyle]}
            data={districts}
            labelField="label"
            valueField="value"
            placeholder={translations.District}
            value={selectedDistrict}
            onChange={(item) => {
              setSelectedDistrict(item.value);
              setSelectedSubDistrict(null); // Reset sub-district and village on district change
              setSelectedVillage(null);
            }}
            showsVerticalScrollIndicator={false}
            search
            searchPlaceholder={translations.Search}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={lableStyle}
          />
        </View>

        {selectedDistrict && (
          <View style={styles.column}>
            {/* <Text style={styles.label}>Select Sub-District</Text> */}
            <Dropdown
              style={[styles.dropdown, dropdownStyle]}
              data={subDistricts}
              labelField="label"
              valueField="value"
              placeholder={translations.Subdistrict}
              value={selectedSubDistrict}
              onChange={(item) => {
                setSelectedSubDistrict(item.value);
                setSelectedVillage(null); // Reset village on sub-district change
              }}
              showsVerticalScrollIndicator={false}
              search
              searchPlaceholder={translations.Search}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={lableStyle}
            />
          </View>
        )}
      </View>

      {selectedSubDistrict && (
        <View style={styles.row}>
          <View style={styles.column}>
            {/* <Text style={styles.label}>Select Village</Text> */}
            <Dropdown
              style={[styles.dropdown, dropdownStyle]}
              data={villages}
              labelField="label"
              valueField="value"
              placeholder={translations.Village}
              value={selectedVillage}
              onChange={(item) => setSelectedVillage(item.value)}
              showsVerticalScrollIndicator={false}
              search
              searchPlaceholder={translations.Search}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={lableStyle}
            />
          </View>
        </View>
      )}

      {selectedVillage && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.disabledInput}
            value={`${selectedDistrict ? selectedDistrict : ""}${
              selectedSubDistrict ? "," + selectedSubDistrict : ""
            }${selectedVillage ? "," + selectedVillage : ""}`}
            editable={false}
            selectTextOnFocus={false}
          />

          <MaterialCommunityIcons
            name="map-marker-check-outline"
            size={28}
            color="green"
            style={styles.icon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 5,
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
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    color: "black",
    width: "97%",
    alignSelf: "flex-start",
  },
});

export default AddressFormComponent;
