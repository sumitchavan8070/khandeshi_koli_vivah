import { View, Text, useColorScheme } from "react-native";
import React, { useContext } from "react";
import CustomImagePicker from "../sections/ImagePicker"; // Adjust the path as per your project structure
import { stylesBiodata as styles } from "./SectionStyle";

import { LanguageContext } from "../../../Context/LanguageContext";

const AlbumSection = ({ formData, handleInputChange }) => {
  const { translations } = useContext(LanguageContext);

  return (
    <View style={styles.section}>
      <Text type="subtitle" style={styles.sectionHeader}>
        {translations.album}
      </Text>

      <CustomImagePicker
        images={formData.album}
        maxImages={6}
        onImagesChange={(newImages) => handleInputChange("album", newImages)}
      />
      <Text style={styles.infoTextBelow}>{translations.albumGuideText}</Text>
    </View>
  );
};

export default AlbumSection;
