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

import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";

const ContactInfoSection = ({ formData, handleInputChange }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionHeader}>
        {translations.contactInfoTitle}
      </Text>

      <Text style={[styles.label]}>{translations.emailTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder={translations.emailPlaceholder}
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
      />

      <Text style={[styles.label]}>{translations.candidateContactTitle}</Text>
      <TextInput
        style={[styles.input, { borderColor: themeColor.appColorLightExtra }]}
        placeholder="eg. 987654321"
        value={formData.candidateMobileNumber}
        onChangeText={(text) =>
          handleInputChange("candidateMobileNumber", text)
        }
        keyboardType="number-pad"
      />

      <Text style={[styles.label]}>
        {translations.familyMemberContactTitle}
      </Text>

      <TextInput
        style={[
          styles.input,
          { borderColor: themeColor.appColorLightExtra, marginBottom: 4 },
        ]}
        placeholder="eg. 987654321"
        value={formData.familyMobileNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => handleInputChange("familyMobileNumber", text)}
      />
      <Text style={styles.infoTextBelow}>
        {translations.contactGuideInfoText}
      </Text>
    </View>
  );
};

export default ContactInfoSection;
