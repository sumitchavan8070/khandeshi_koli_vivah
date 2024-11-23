import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";

import BioDataDesign from "./BioDataDesign"; // Template Card
import Biodata2 from "./Biodata2"; // Template Card
import Biodata3 from "./Biodata3"; // Template Card
import Biodata4 from "./Biodata4"; // Template Card
import Biodata5 from "./Biodata5"; // Template Card
import Biodata6 from "./Biodata6"; // Template Card

import ChooseLangButton from "../../Buttons/ChooseLangButton";
import NoItemYogaBoy from "../../NoItemFound/NoItemYogaBoy";
import { LanguageContext } from "../../../Context/LanguageContext";
import GRADIENT_COLORS, { themeColor } from "../../../constants/Colors";
import globalStrings from "../../../utils/globalStrings";
import { ScrollView } from "react-native";

const templates = [
  {
    id: 1,
    component: BioDataDesign,
    image: require("../../../assets/biodata1.png"),
  },
  {
    id: 2,
    component: Biodata2,
    image: require("../../../assets/biodata2.jpg"),
  },
  {
    id: 3,
    component: Biodata3,
    image: require("../../../assets/biodata3.jpg"),
  },
  {
    id: 4,
    component: Biodata4,
    image: require("../../../assets/biodata4.jpg"),
  },
  {
    id: 5,
    component: Biodata5,
    image: require("../../../assets/biodata5.jpg"),
  },
  {
    id: 6,
    component: Biodata6,
    image: require("../../../assets/biodata6.jpg"),
  },
];

const BioDataScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const formData = route.params || {};
  const parsedFormData = formData ? JSON.parse(formData) : null;
  const { translations } = useContext(LanguageContext);

  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
    setModalVisible(false);
  };

  const renderTemplatePreview = ({ item }) => (
    <TouchableOpacity
      style={styles.templatePreview}
      onPress={() => handleSelectTemplate(item.id)}
    >
      <View style={styles.scaledContainer}>
        {item.image ? (
          <Image source={item.image} style={styles.templateImage} />
        ) : (
          <Text>{translations.noImageAvailable}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const { width } = useWindowDimensions();

  const renderSelectedTemplate = () => {
    if (!parsedFormData) {
      return <NoItemYogaBoy />;
    }

    if (!selectedTemplate) {
      return <Text>{translations.noTemplateSelected}</Text>;
    }

    const SelectedTemplateComponent = selectedTemplate.component;
    const finalFormData = { ...parsedFormData, selectedTemplateId };

    const biodataStatus = parsedFormData?.biodataStatus;

    return (
      <>
        <View style={styles.pagePreview}>
          <SelectedTemplateComponent formData={finalFormData} />
        </View>

        {biodataStatus === "inpayment" ? (
          <TouchableOpacity style={styles.buttonContainer}>
            <LinearGradient
              colors={GRADIENT_COLORS.buttonGradient}
              start={{ x: 2, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientButton}
            >
              <View style={styles.buttonContent}>
                <FontAwesome name="lock" size={20} color="#fff" />
                <Text style={styles.buttonText}>
                  Pay ₹{globalStrings.BIODATA_PRICE}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.buttonContainer}
          >
            <LinearGradient
              colors={GRADIENT_COLORS.buttonGradient}
              start={{ x: 2, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>
                {translations.downloadBiodata}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </>
    );
  };

  const handleSubmit = () => {
    console.log("Submitted");
    navigation.navigate("NextScreen", { selectedTemplateId });
  };

  return (
    <ScrollView style={{ flex: 1, marginTop: 20 }}>
      <GestureHandlerRootView style={styles.container}>
        <ChooseLangButton />

        <TouchableOpacity
          style={[
            styles.templateButtonChoose,
            { borderColor: themeColor.appColorLight },
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="image-outline"
            size={24}
            color={themeColor.appColorLight}
          />
          <Text style={styles.addText}>{translations.chooseTemplate}</Text>
        </TouchableOpacity>

        <View style={styles.templateContainer}>{renderSelectedTemplate()}</View>

        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={templates}
              renderItem={renderTemplatePreview}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.bottomSheetContent}
              numColumns={3}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Modal>
      </GestureHandlerRootView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orignalPriceOfferText: {
    color: "white",
    fontSize: 12,
    textDecorationLine: "line-through",
    left: "15%",
  },
  percentageOfferText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    // alignSelf: "flex-end",
    left: "15%",
  },
  pagePreview: {
    width: "100%",
    height: "94%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
  },
  templateContainer: {
    flex: 1,
    marginVertical: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    maxHeight: "70%",
    top: "30%",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomSheetContent: {
    padding: 20,
  },
  templatePreview: {
    flex: 1 / 3,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    height: 100,
  },
  scaledContainer: {
    transform: [{ scale: 1 }],
    width: 150,
    maxHeight: 200,
    justifyContent: "center",
  },
  templateButtonChoose: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    gap: 10,
    borderStyle: "dotted",
  },
  addText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: "2%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  templateImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 5,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10, // Space between icon and text
  },
});

export default BioDataScreen;
