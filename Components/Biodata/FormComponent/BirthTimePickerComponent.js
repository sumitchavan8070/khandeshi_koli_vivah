import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BirthTimePickerComponent = ({
  timeOptions,
  onTimeChange,
  containerStyle,
  dropdownStyle,
  lableText,
  lableStyle,
  placeholderTime,
  placeholderHour,
  placeholderMinute,
}) => {
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  // const [ampm, setAmpm] = useState(null);

  // Notify the parent component of the time changes
  useEffect(() => {
    if (onTimeChange) {
      onTimeChange({
        timeOfDay,
        hour,
        minute,
        // ampm,
      });
    }
  }, [timeOfDay, hour, minute]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, lableStyle]}>{lableText}</Text>
      <View style={styles.row}>
        <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          data={timeOptions.timeOfDay}
          labelField="label"
          valueField="value"
          placeholder={placeholderTime}
          value={timeOfDay}
          onChange={(item) => setTimeOfDay(item.value)}
          showsVerticalScrollIndicator={false}
          placeholderStyle={lableStyle}
        />
        <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          data={timeOptions.hours}
          labelField="label"
          valueField="value"
          placeholder={placeholderHour}
          value={hour}
          onChange={(item) => setHour(item.value)}
          showsVerticalScrollIndicator={false}
          placeholderStyle={lableStyle}
        />
        <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          data={timeOptions.minutes}
          labelField="label"
          valueField="value"
          placeholder={placeholderMinute}
          value={minute}
          onChange={(item) => setMinute(item.value)}
          showsVerticalScrollIndicator={false}
          placeholderStyle={lableStyle}
        />
        {/* <Dropdown
          style={[styles.dropdown, dropdownStyle]}
          data={timeOptions.ampm}
          labelField="label"
          valueField="value"
          placeholder="AM/PM"
          value={ampm}
          onChange={(item) => setAmpm(item.value)}
        /> */}
      </View>

      {minute && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.disabledInput}
            value={`${timeOfDay ? timeOfDay + "," : ""} ${
              hour ? hour + ":" : ""
            }${minute ? minute : ""}`}
            editable={false}
            selectTextOnFocus={false}
          />

          <MaterialCommunityIcons
            name="clock-check-outline"
            size={25}
            color="green"
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

export default BirthTimePickerComponent;
