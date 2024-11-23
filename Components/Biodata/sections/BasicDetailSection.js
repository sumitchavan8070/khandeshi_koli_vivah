import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useContext, useState } from "react";
import { stylesBiodata as styles } from "./SectionStyle";

import { Dropdown } from "react-native-element-dropdown";
import MaritalStatusFormComponent from "../FormComponent/MaritalStatusFormComponent";
import DateTimePicker from "@react-native-community/datetimepicker"; // For date and time picking
import ComplexionFormComponent from "../FormComponent/ComplexionFormComponent";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

const BasicDetailSection = ({ formData, handleInputChange, setFormData }) => {
  const { translations } = useContext(LanguageContext);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Regular expression to allow only alphabet characters
  const nameValidationRegex = /^[A-Za-z]+$/;

  const handleMaritalStatusChange = (maritalStatus) => {
    handleInputChange("maritalStatus", maritalStatus);
  };

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
      currentDate < new Date(birthDate.setFullYear(currentDate.getFullYear()))
    ) {
      setFormData((prevData) => ({ ...prevData, age: age - 1 }));
    } else {
      setFormData((prevData) => ({ ...prevData, age }));
    }

    // Validation: Candidate must be at least 18 years old
    if (age < 18) {
      alert("Candidate must be at least 18 years old.");
    }
  };

  const handleNameChange = (key, text) => {
    const validatedText = text.replace(/[ .]/g, "");
    handleInputChange(key, validatedText);
  };

  const candidateTypeOptions = [
    { label: translations.candidateTypeFemale, value: "Female" },
    { label: translations.candidateTypeMale, value: "Male" },
  ];

  // console.log(candidateTypeOptions);
  const maritalStatusData = [
    { label: translations.single, value: "single" },
    { label: translations.married, value: "married" },
    { label: translations.divorced, value: "divorced" },
    { label: translations.widowed, value: "widowed" },
  ];

  const complexionOptions = [
    { label: translations.very_fair, value: "very_fair" },
    { label: translations.fair, value: "fair" },
    { label: translations.light, value: "light" },
    { label: translations.medium, value: "medium" },
    { label: translations.olive, value: "olive" },
    { label: translations.tan, value: "tan" },
    { label: translations.brown, value: "brown" },
    { label: translations.dark, value: "dark" },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{translations.basicDetailTitle}</Text>

      <Text style={[styles.label]}>{translations.candidateType}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          { borderColor: themeColor.appColorLightExtra },
        ]}
        data={candidateTypeOptions}
        labelField="label"
        valueField="value"
        placeholder={translations.selectCandidateTypePlaceHolder}
        value={formData.candidateType}
        onChange={(item) => handleInputChange("candidateType", item.value)}
      />

      <Text style={[styles.label]}>{translations.nameTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.namePlaceholder}
        value={formData.name}
        onChangeText={(text) => handleNameChange("name", text)}
      />

      <Text style={[styles.label]}>{translations.middleNameTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.middleNamePlaceHolder}
        value={formData.middleName}
        onChangeText={(text) => handleNameChange("middleName", text)}
      />

      <Text style={[styles.label]}>{translations.surnameTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.surnamePlaceHolder}
        value={formData.surname}
        onChangeText={(text) => handleNameChange("surname", text)}
      />

      <Text style={[styles.label]}>{translations.fullNameTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder="Full Name"
        value={formData.fullName}
        editable={false}
      />

      <Text style={[styles.label]}>{translations.dob}</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text
          style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        >
          {formData.dob.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const date = selectedDate || formData.dob;
            setShowDatePicker(false);
            handleInputChange("dob", date);
            calculateAge(date);
          }}
        />
      )}

      <Text style={[styles.label]}>{translations.ageTitle}</Text>
      <Text
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
      >
        {formData.age}
      </Text>

      <Text style={[styles.label]}>{translations.maritalStatusTitle}</Text>
      <MaritalStatusFormComponent
        maritalStatusData={maritalStatusData} // Pass the marital status data here
        onMaritalStatusChange={handleMaritalStatusChange}
        containerStyle={{}} // Optional: Custom styling
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        placeholder={translations.maritalStatusPlaceholder}
        labelStyle={{ color: "gray" }}
      />

      <ComplexionFormComponent
        complexionData={complexionOptions}
        onComplexionChange={(text) => handleInputChange("complexion", text)}
        labelText={translations.complexion}
        labelStyle={{ color: "gray" }}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        placeholder={translations.complexionPlaceholder}
      />
    </View>
  );
};

export default BasicDetailSection;
