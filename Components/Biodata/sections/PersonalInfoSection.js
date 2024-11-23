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
import CasteFormComponent from "../FormComponent/CasteFormComponent";
import HeightFormComponent from "../FormComponent/HeightFormComponent";

import AddressFormComponent from "../FormComponent/AddressFormComponent";
import cities from "../../../constants/MaharashtraCities.json";
import timeOptions from "../../../constants/timeOptions.json";
import heightOptions from "../../../constants/heightOptions.json";
import BloodGroupFormComponent from "../FormComponent/BloodGroupFormComponent";
import BirthTimePickerComponent from "../FormComponent/BirthTimePickerComponent";
import OccupationFormComponent from "../FormComponent/OccupationFormComponent";
import QualificationFormComponent from "../FormComponent/QualificationFormComponent";
import IncomeFormComponent from "../FormComponent/IncomeFormComponent";
import DisabilityFormComponent from "../FormComponent/DisabilityFormComponent";
import { themeColor } from "../../../constants/Colors";

import { LanguageContext } from "../../../Context/LanguageContext";

const PersonalInfoSection = ({
  formData,
  handleInputChange,
  handleBirthPlaceChange,
  handleBirthTimeChange,
  handleHeightChange,
  handleWorkPlaceChange,
}) => {
  // const colorScheme = useColorScheme();
  // const themeColor = colorScheme === "dark" ? Colors.dark : Colors.light;
  const { translations } = useContext(LanguageContext);

  const occupations = [
    { label: translations.Unemployed, value: "Unemployed" },
    { label: translations.Business, value: "Business" },

    { label: translations.Engineer, value: "Engineer" },
    { label: translations.Doctor, value: "Doctor" },
    { label: translations.Driver, value: "Driver" },
    { label: translations.Teacher, value: "Teacher" },
    { label: translations.Lawyer, value: "Lawyer" },
    { label: translations.Nurse, value: "Nurse" },
    { label: translations.Architect, value: "Architect" },
    { label: translations.Electrician, value: "Electrician" },
    { label: translations.Plumber, value: "Plumber" },
    { label: translations.Carpenter, value: "Carpenter" },
    { label: translations.Chef, value: "Chef" },
    { label: translations.Pilot, value: "Pilot" },
    { label: translations.Artist, value: "Artist" },
    { label: translations.Farmer, value: "Farmer" },
    { label: translations.Mechanic, value: "Mechanic" },
    { label: translations.Scientist, value: "Scientist" },
    { label: translations.Pharmacist, value: "Pharmacist" },
    { label: translations.SoftwareDeveloper, value: "SoftwareDeveloper" },
    { label: translations.Accountant, value: "Accountant" },
    { label: translations.PoliceOfficer, value: "PoliceOfficer" },
    { label: translations.Other, value: "Other" }, // "Other" option
  ];

  const casteData = [
    { label: translations.TokareKoli, value: "TokareKoli" },
    { label: translations.MahadevKoli, value: "MahadevKoli" },
    { label: translations.DhorKoli, value: "DhorKoli" },
    { label: translations.Koli, value: "Koli" },
    { label: translations.Other, value: "Other" },
  ];

  const qualifications = [
    { label: translations.twelvth, value: "twelvth" },
    { label: translations.tenth, value: "tenth" },
    { label: translations.Engineer, value: "Engineering" },
    { label: translations.BachelorDegree, value: "BachelorDegree" },
    { label: translations.MasterDegree, value: "MasterDegree" },
    { label: translations.PhD, value: "PhD" },
    { label: translations.Diploma, value: "Diploma" },
    { label: translations.Certificate, value: "Certificate" },
    { label: translations.AssociateDegree, value: "Associate Degree" },
    { label: translations.VocationalTraining, value: "Vocational Training" },
    {
      label: translations.ProfessionalQualification,
      value: "Professional Qualification",
    },
    { label: translations.Other, value: "Other" },
    // Add more qualifications as needed
  ];

  const bloodGroupData = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: translations.DontKnow, value: "Dont_Know" },
  ];

  const incomeRanges = [
    { label: "Less than 1,00,000", value: "less than - 1,00,000" },
    { label: "1,00,001 - 3,00,000", value: "1,00,001 - 3,00,000" },
    { label: "3,00,001 - 5,00,000", value: "3,00,001 - 5,00,000" },
    { label: "5,00,001 - 7,00,000", value: "5,00,001 - 7,00,000" },
    { label: "7,00,001 - 10,00,000", value: "7,00,001 - 10,00,000" },
    { label: "10,00,001 - 15,00,000", value: "10,00,001 - 15,00,000" },
    { label: "Above 15,00,000", value: "above 1500000" },
    { label: translations.DontKnow, value: "Dont_Know" },
  ];

  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionHeader}>
        {translations.personalInfoHeading}
      </Text>

      <CasteFormComponent
        casteData={casteData}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        lableText={translations.casteTitle}
        lableStyle={{ color: "gray" }}
        onCasteChange={(text) => {
          handleInputChange("caste", text);
        }}
        placeholder={translations.castPlaceHolder}
      />

      <BloodGroupFormComponent
        bloodGroupData={bloodGroupData} // Pass the blood group data here
        onBloodGroupChange={(text) => {
          handleInputChange("bloodGroup", text);
        }}
        lableText={translations.bloodGroupTitle}
        lableStyle={{ color: "gray" }}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        placeholder={translations.bloodGroupPlaceHolder}
      />

      <DisabilityFormComponent
        onDisabilityChange={(text) => {
          handleInputChange("isPhysicalDisabled", text);
        }}
        lableStyle={{ color: "gray" }}
        labelText={translations.physicalDisabledTitle}
        placeholder={translations.physicalDisablePlaceholder}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }}
      />

      <HeightFormComponent
        heightOptions={heightOptions}
        onHeightChange={handleHeightChange}
        lableText={translations.heightTitle}
        lableStyle={{ color: "gray" }}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        feetPlaceholder={translations.feetPlaceholder}
        inchPlaceholder={translations.inchPlaceholder}
      />

      <AddressFormComponent
        cities={cities}
        onAddressChange={handleBirthPlaceChange}
        containerStyle={{}} // Optional: Custom styling
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        lableText={translations.birthPlaceTitle}
        lableStyle={{ color: "gray" }}
      />

      <BirthTimePickerComponent
        timeOptions={timeOptions}
        onTimeChange={handleBirthTimeChange}
        containerStyle={{}} // Optional: Custom styling
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        lableText={translations.birthTimeTitle}
        lableStyle={{ color: "gray" }}
        placeholderTime={translations.timePlaceholder}
        placeholderHour={translations.hourPlaceholder}
        placeholderMinute={translations.minutePlaceholder}
      />

      <QualificationFormComponent
        qualifications={qualifications}
        onQualificationChange={(selected) =>
          handleInputChange("qualification", selected)
        }
        labelText={translations.qualificationTitle}
        containerStyle={{}}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        labelStyle={{ color: "gray" }}
        placeholder={translations.qualificationPlaceholder}
      />

      <OccupationFormComponent
        occupations={occupations}
        onOccupationChange={(selected) =>
          handleInputChange("occupation", selected)
        }
        containerStyle={{}}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }}
        lableText={translations.occupationTitle}
        lableStyle={{ color: "gray" }}
        placeholder={translations.occupationPlaceholder}
      />

      <Text style={[styles.label]}>{translations.occupationMoreInfoTitle}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: themeColor.appColorLightExtra,
            maxHeight: 100,
          },
        ]}
        multiline={true} // Enable multiline input
        placeholder={translations.occupationMoreinfoPlaceholder}
        value={formData.occupationMoreInfo}
        onChangeText={(text) => handleInputChange("occupationMoreInfo", text)}
      />

      <IncomeFormComponent
        incomeData={incomeRanges}
        onIncomeChange={(text) => handleInputChange("annualIncome", text)}
        labelText={translations.yearlyincomeTitle}
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        labelStyle={{ color: "gray" }}
        placeholder={translations.yearlyincomePlaceholder}
      />

      <AddressFormComponent
        cities={cities}
        onAddressChange={handleWorkPlaceChange}
        containerStyle={{}} // Optional: Custom styling
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        lableText={translations.candidateWorkPlaceTitle}
        lableStyle={{ color: "gray" }}
      />
    </View>
  );
};

export default PersonalInfoSection;
