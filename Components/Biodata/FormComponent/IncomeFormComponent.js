import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const IncomeFormComponent = ({
  incomeData,
  onIncomeChange,
  containerStyle,
  dropdownStyle,
  labelText,
  labelStyle,
  placeholder,
}) => {
  const [selectedIncome, setSelectedIncome] = useState(null);

  // Update the parent component with the selected income value
  useEffect(() => {
    if (onIncomeChange) {
      onIncomeChange(selectedIncome);
    }
  }, [selectedIncome]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{labelText}</Text>
      <Dropdown
        style={[styles.dropdown, dropdownStyle]}
        data={incomeData} // Use incomeData prop for options
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selectedIncome}
        onChange={(item) => setSelectedIncome(item.value)}
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

export default IncomeFormComponent;
