import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const HeightPickerComponent = ({
  heightOptions,
  onHeightChange,
  containerStyle,
  dropdownStyle,
  labelText,
  labelStyle,
}) => {
  const [feet, setFeet] = useState(null);
  const [inch, setInch] = useState(null);

  // Notify the parent component of the height changes
  useEffect(() => {
    if (onHeightChange) {
      onHeightChange({
        feet,
        inch,
      });
    }
  }, [feet, inch]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      <View style={styles.row}>
        <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          data={heightOptions.feet}
          labelField="label"
          valueField="value"
          placeholder="Feet"
          value={feet}
          onChange={(item) => setFeet(item.value)}
          showsVerticalScrollIndicator={false}
        />
        <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          data={heightOptions.inches}
          labelField="label"
          valueField="value"
          placeholder="Inch"
          value={inch}
          onChange={(item) => setInch(item.value)}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {feet && inch && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.disabledInput}
            value={`${feet ? feet + " ft " : ""}${inch ? inch + " in" : ""}`}
            editable={false}
            selectTextOnFocus={false}
          />
          <MaterialCommunityIcons
            name="ruler"
            size={25}
            color="blue"
            style={styles.icon}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dropdown: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    position: "absolute",
    right: 20,
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
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#f0f0f0", // Light gray background for disabled input
    color: "black",
    width: "97%",
    alignSelf: "flex-start",
  },
});

export default HeightPickerComponent;
