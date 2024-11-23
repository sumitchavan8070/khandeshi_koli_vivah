import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

const MultiSelectExpectationsComponent = ({
  expectationsData,
  onExpectationsChange,
  containerStyle,
  dropdownStyle,
  labelText,
  labelStyle,
  place,
}) => {
  const [selectedExpectations, setSelectedExpectations] = useState([]);

  const { translations } = useContext(LanguageContext);

  // Update the parent component with the selected expectations value
  useEffect(() => {
    if (onExpectationsChange) {
      onExpectationsChange(selectedExpectations);
    }
  }, [selectedExpectations]);

  const handleSelect = (item) => {
    if (selectedExpectations.includes(item.value)) {
      // Remove item if already selected
      setSelectedExpectations(
        selectedExpectations.filter((value) => value !== item.value)
      );
    } else {
      // Add item if not selected
      setSelectedExpectations([...selectedExpectations, item.value]);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      <MultiSelect
        style={[styles.dropdown, dropdownStyle]}
        data={expectationsData}
        labelField="label"
        valueField="value"
        placeholder={place}
        value={selectedExpectations}
        // onChange={(item) => {
        //   setSelectedExpectations(item);
        // }}
        onChange={(item) => {
          // Check if the count of selected items is already 3
          if (item.length > 3) {
            Alert.alert(
              translations.expectationAlertTitle,
              translations.expectationAlertText
            );
          } else {
            setSelectedExpectations(item);
          }
        }}
        multiSelect
        showsVerticalScrollIndicator={false}
        activeColor={themeColor.appColorLight}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
              <AntDesign color={themeColor.appColor} name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
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
    // marginBottom: 15,
  },
  selectedItem: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 2,
  },

  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default MultiSelectExpectationsComponent;
