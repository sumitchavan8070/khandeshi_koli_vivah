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

import AddressFormComponent from "../FormComponent/AddressFormComponent";
import cities from "../../../constants/test.json";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

const FamilyInfoSection = ({
  formData,
  handleInputChange,
  handleMaternatityUnclePlaceChange,
}) => {
  const { translations } = useContext(LanguageContext);

  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionHeader}>
        {translations.familyInfoTitle}
      </Text>

      <Text style={[styles.label]}>{translations.fatherNameTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.fatherNamePlaceholder}
        value={formData.fatherName}
        onChangeText={(text) => handleInputChange("fatherName", text)}
      />

      <Text style={[styles.label]}>{translations.fatherOccupationTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.fatherOccupationPlaceholder}
        value={formData.fatherOccupation}
        onChangeText={(text) => handleInputChange("fatherOccupation", text)}
      />

      <Text style={[styles.label]}>{translations.motherNameTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.motherNamePlaceholder}
        value={formData.motherName}
        onChangeText={(text) => handleInputChange("motherName", text)}
      />

      <Text style={[styles.label]}>{translations.totalBrotherTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder="0"
        value={formData.totalBrothersCount}
        onChangeText={(text) => handleInputChange("totalBrothersCount", text)}
        keyboardType="number-pad"
      />

      <Text style={[styles.label]}>
        {translations.totalMarriedBrotherTitle}
      </Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder="0"
        value={formData.totalMarriedBorthersCount}
        onChangeText={(text) =>
          handleInputChange("totalMarriedBorthersCount", text)
        }
        keyboardType="number-pad"
      />

      <Text style={[styles.label]}>{translations.totalSisterTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder="0"
        value={formData.totalSistersCount}
        onChangeText={(text) => handleInputChange("totalSistersCount", text)}
        keyboardType="number-pad"
      />

      <Text style={[styles.label]}>{translations.totalMarriedSisterTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder="0"
        value={formData.totalMarriedSistersCount}
        onChangeText={(text) =>
          handleInputChange("totalMarriedSistersCount", text)
        }
        keyboardType="number-pad"
      />

      <Text style={[styles.label]}>{translations.maternalUncleTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.maternalUnclePlaceHolder}
        value={formData.maternalUncleName}
        onChangeText={(text) => handleInputChange("maternalUncleName", text)}
      />

      <AddressFormComponent
        cities={cities}
        onAddressChange={handleMaternatityUnclePlaceChange}
        containerStyle={{}} // Optional: Custom styling
        dropdownStyle={{ borderColor: themeColor.appColorLightExtra }} // Optional: Custom dropdown styling
        lableText={translations.maternalUnclePlace}
        lableStyle={{ color: "gray" }}
      />
    </View>
  );
};

export default FamilyInfoSection;
