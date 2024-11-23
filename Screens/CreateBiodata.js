import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
  useColorScheme,
  SafeAreaView,
} from "react-native";

import { stylesBiodata as styles } from "../Components/Biodata/sections/SectionStyle";
import PersonalInfoSection from "../Components/Biodata//sections/PersonalInfoSection";
import BasicDetailSection from "../Components/Biodata//sections/BasicDetailSection";
import FamilyInfoSection from "../Components/Biodata/sections/FamilyInfoSection";
import LocationInfoSection from "../Components/Biodata/sections/LocationInfoSection";
import ContactInfoSection from "../Components/Biodata/sections/ContactInfoSection";
import AlbumSection from "../Components/Biodata/sections/AlbumSection";
import ExpectationSection from "../Components/Biodata/sections/ExpectationSection";

import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

// import { uploadAlbumToCloudinary } from "@/redux/actions/uploadColudinary";

import axios from "axios";
// import { createBiodta } from "@/redux/actions/userAction";
import BiodataSubmitLoader from "../Components/Loader/BiodataSubmitLoader";
import { LanguageContext } from "../Context/LanguageContext";
import GRADIENT_COLORS, { themeColor } from "../constants/Colors";
import APIEndPoints from "../utils/network_service/api_endpoints";
import { postRequest } from "../utils/network_service/api_request";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../Context/authContext";

const CreateBioData = ({ route }) => {
  // Set default form state, including auto-prefill from props
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const navigation = useNavigation(); // React Navigation hook for navigation

  // const preFilledData = useGlobalSearchParams();
  // const { preFilledData = {} } = route.params || {}; // Get params from navigation route
  const { preFilledData } = route.params || {}; // Extract passed data

  // console.log("preFilledData", preFilledData);

  // const user = useSelector(selectUser); // Access user state

  const [formData, setFormData] = useState({
    candidateType: preFilledData?.candidateType || "",
    name: preFilledData?.name || "",
    middleName: preFilledData?.middleName || "",
    surname: preFilledData?.surname || "",
    fullName: `${preFilledData?.name || ""} ${
      preFilledData?.middleName || ""
    } ${preFilledData?.surname || ""}`,
    dob: preFilledData?.dob ? new Date(preFilledData?.dob) : new Date(),
    age: preFilledData?.age || "",
    complexion: preFilledData?.complexion || "",
    birthTime: preFilledData?.birthTime || {
      timeOfDay: "",
      hour: "",
      minute: "",
    },
    birthPlace: preFilledData?.birthPlace || "",
    occupation: preFilledData?.occupation || "",
    occupationMoreInfo: preFilledData?.occupationMoreInfo || "",
    gender: preFilledData?.gender || "",
    maritalStatus: preFilledData?.maritalStatus || "",
    caste: preFilledData?.caste || "",
    height: preFilledData?.height || {
      feet: "",
      inch: "",
    },
    bloodGroup: preFilledData?.bloodGroup || "",
    skinTone: preFilledData?.skinTone || "",
    candidateLocation: preFilledData?.candidateLocation || "",
    qualification: preFilledData?.qualification || "",
    qualificationMoreInfo: preFilledData?.qualificationMoreInfo || "",
    candidateMobileNumber: preFilledData?.candidateMobileNumber || "",
    totalBrothers: preFilledData?.totalBrothers || "",
    totalSisters: preFilledData?.totalSisters || "",
    familyAddress: preFilledData?.familyAddress || "",
    properVillage: preFilledData?.properVillage || "",
    locationInfo: preFilledData?.locationInfo || [],
    album: preFilledData?.album || [],
    // brotherName: preFilledData.brotherName || [],
    // sisterName: preFilledData.sisterName || [],

    //Family Info
    maternalUncleName: preFilledData?.maternalUncleName || "",
    maternalUncleLocationInfo: preFilledData?.maternalUncleLocationInfo || [],
    totalBrothersCount: preFilledData?.totalBrothersCount || "",
    totalSistersCount: preFilledData?.totalSistersCount || "",
    totalMarriedBorthersCount: preFilledData?.totalMarriedBorthersCount || "",
    totalMarriedSistersCount: preFilledData?.totalMarriedSistersCount || "",
    familyMobileNumber: preFilledData?.familyMobileNumber || "",
    fatherName: preFilledData?.fatherName || "",
    fatherOccupation: preFilledData?.fatherOccupation || "",
    motherName: preFilledData?.motherName || "",
    motherOccupation: preFilledData?.motherOccupation || "",

    //Personal Info
    annualIncome: preFilledData?.annualIncome || "",
    workLocationInfo: preFilledData?.workLocationInfo || [],
    isPhysicalDisabled: preFilledData?.isPhysicalDisabled || [],

    //Expectations Info
    expectations: preFilledData?.expectations || [],

    //contact info
    email: preFilledData?.email || "",
  });

  const { translations } = useContext(LanguageContext);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fullName: `${prevData.name} ${prevData.middleName} ${prevData.surname}`,
    }));
  }, [formData.dob, formData.name, formData.middleName, formData.surname]);

  // const handleInputChange = (field, value) => {
  //   setFormData({ ...formData, [field]: value });
  // };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
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

  const handleSubmit = async () => {
    // if (!formData.candidateType) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.selectCandidateType },
    //   });
    // }

    // if (!formData.name) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterName },
    //   });
    // }

    // if (!formData.middleName) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterMiddleName },
    //   });
    // }

    // if (!formData.surname) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterSurname },
    //   });
    // }

    // if (Number(formData.age) < 18) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.ageRequirement },
    //   });
    // }

    // if (!formData.maritalStatus) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseMaritalStatus },
    //   });
    // }

    // if (!formData.complexion) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseComplexion },
    //   });
    // }

    // if (!formData.album) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.selectPhoto },
    //   });
    // }

    // if (formData.album.length < 2) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.minimumPhotos },
    //   });
    // }

    // if (!formData.caste) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseCaste },
    //   });
    // }

    // if (!formData.isPhysicalDisabled) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.choosePhysicalStatus },
    //   });
    // }

    // if (!formData.height.feet) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseHeightFeet },
    //   });
    // }

    // if (!formData.height.inch) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseHeightInch },
    //   });
    // }

    // if (!formData.birthPlace.district) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseBirthDistrict },
    //   });
    // }

    // if (!formData.birthPlace.subDistrict) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseBirthSubDistrict },
    //   });
    // }

    // if (!formData.birthPlace.village) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseBirthVillage },
    //   });
    // }

    // if (
    //   !formData.birthTime.hour ||
    //   !formData.birthTime.minute ||
    //   !formData.birthTime.timeOfDay
    // ) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseBirthTime },
    //   });
    // }

    // if (!formData.qualification) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseQualification },
    //   });
    // }

    // if (!formData.occupation) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseOccupation },
    //   });
    // }

    // if (!formData.annualIncome) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseIncome },
    //   });
    // }

    // if (!formData.workLocationInfo.district) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseWorkDistrict },
    //   });
    // }

    // if (!formData.workLocationInfo.subDistrict) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseWorkSubDistrict },
    //   });
    // }

    // if (!formData.workLocationInfo.village) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseWorkVillage },
    //   });
    // }

    // if (!formData.fatherName) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterFatherName },
    //   });
    // }

    // if (!formData.motherName) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterMotherName },
    //   });
    // }

    // if (!formData.maternalUncleName) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterMaternalUncleName },
    //   });
    // }

    // if (!formData.maternalUncleLocationInfo.district) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseMaternalDistrict },
    //   });
    // }

    // if (!formData.maternalUncleLocationInfo.subDistrict) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseMaternalSubDistrict },
    //   });
    // }

    // if (!formData.maternalUncleLocationInfo.village) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseMaternalVillage },
    //   });
    // }

    // if (!formData.locationInfo.district) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseLocationDistrict },
    //   });
    // }

    // if (!formData.locationInfo.subDistrict) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseLocationSubDistrict },
    //   });
    // }

    // if (!formData.locationInfo.village) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.chooseLocationVillage },
    //   });
    // }

    // if (!formData.candidateMobileNumber) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterCandidateMobile },
    //   });
    // }

    // if (!formData.familyMobileNumber) {
    //   return Toast.show({
    //     type: "warningToast",
    //     props: { msg: translations.enterFamilyMobile },
    //   });
    // }

    // console.log("Submitted Data: ", formData);
    // router.push({
    //   pathname: "/(biodata)/biodata-template", // Path of biodata-template.tsx
    //   params: { formData: JSON.stringify(formData) }, // Send formData as a parameter
    // });

    // const uploadedPublicIds = await uploadAlbumToCloudinary(
    //   formData.album,
    //   user._id,
    //   preFilledData.biodataId
    // );

    // if (!uploadedPublicIds) {
    //   setLoading(false);
    //   Alert.alert("Upload Failed", "Failed to upload images.");
    //   return;
    // }

    // Step 2: Update formData with the uploaded image IDs
    setLoading(true);

    const updatedFormData = {
      ...formData,
      // album: uploadedPublicIds, // Replace album array with uploaded public IDs
      album: [], // Replace album array with uploaded public IDs
      createdBy: state._id,
      biodataStatus: "inpayment",
    };

    // Step 3: Proceed with form submission (e.g., send data to the server)
    // console.log("Final Form Data:", updatedFormData);

    // const response = await dispatch(createBiodta(updatedFormData));

    const apiEndPoint = APIEndPoints.create_biodata;
    // console.log("apiEndPoint", apiEndPoint);

    // const postData = {  };
    const response = await postRequest(apiEndPoint, updatedFormData);
    // console.log(response);

    if (response.status == 0) {
      setLoading(false);
      return Alert.alert("Error while creating biodata , please try again!");
    }

    if (response.status == 1) {
      setLoading(false);
      // console.log("------> res in 1 :", response.profile);
      const formData = response.profile;
      // navigation.navigate("BiodataTemplateScreen", JSON.stringify(formData));
      navigation.navigate(
        "BiodataTemplateScreen",
        JSON.stringify(formData) // Serialize formData
      );
    }
  };

  const [selectedBirthTime, setSelectedBirthTime] = useState({
    timeOfDay: null,
    hour: null,
    minute: null,
  });

  const handleBirthTimeChange = (time) => {
    // console.log("-->" + JSON.stringify(time));

    const updatedBirthTime = { ...selectedBirthTime, ...time };
    setSelectedBirthTime(updatedBirthTime);
    handleInputChange("birthTime", updatedBirthTime);
  };

  const [selectedHeight, setSelectedHeight] = useState({
    feet: null,
    inch: null,
  });

  const handleHeightChange = (text) => {
    const updatedHeight = { ...selectedHeight, ...text };
    setSelectedHeight(updatedHeight);
    handleInputChange("height", updatedHeight); // Use updated height
  };

  const [selectedAddress, setSelectedAddress] = useState({
    district: null,
    subDistrict: null,
    village: null,
  });

  const [selectedBirthPlace, setSelectedBirthPlace] = useState({
    district: null,
    subDistrict: null,
    village: null,
  });

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const handleBirthPlaceChange = (place) => {
    const updatedPlace = { ...selectedBirthPlace, ...place }; // Merge the new data
    setSelectedBirthPlace(updatedPlace); // Update the state
    handleInputChange("birthPlace", updatedPlace); // Use updatedPlace instead of selectedBirthPlace
  };

  const [selectMaternatityUnclePlace, setSelectedMaternityUnclePlace] =
    useState({
      district: null,
      subDistrict: null,
      village: null,
    });

  const handleMaternatityUnclePlaceChange = (place) => {
    const updatedPlace = { ...selectMaternatityUnclePlace, ...place };
    setSelectedMaternityUnclePlace(updatedPlace);
    handleInputChange("maternalUncleLocationInfo", updatedPlace); // Use updated height
  };

  const [selectWorkPlace, setSelectedWorkPlace] = useState({
    district: null,
    subDistrict: null,
    village: null,
  });

  const handleWorkPlaceChange = (place) => {
    const updatedPlace = { ...selectWorkPlace, ...place };
    setSelectedWorkPlace(updatedPlace);
    handleInputChange("workLocationInfo", updatedPlace); // Use updated height
  };

  const handleAddressSubmit = () => {
    if (
      selectedAddress.district &&
      selectedAddress.subDistrict &&
      selectedAddress.village
    ) {
      Alert.alert("Selected Address", JSON.stringify(selectedAddress, null, 2));
    } else {
      Alert.alert("Error", "Please select all fields");
    }
  };

  const [selectedTime, setSelectedTime] = useState({
    timeOfDay: null,
    minute: null,
    hour: null,
    ampm: null,
  });

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmitBirthTime = () => {
    if (selectedTime.timeOfDay && selectedTime.hour && selectedTime.minute) {
      Alert.alert(
        "Selected Time",
        `${selectedTime.timeOfDay} ${selectedTime.hour}: ${selectedTime.minute}`
      );
    } else {
      Alert.alert("Error", "Please select all fields");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {loading && <BiodataSubmitLoader visible={loading} loop={true} />}

      <Text style={[styles.headerText]}>❉ {translations.biodataTitle} ❉</Text>

      <BasicDetailSection
        formData={formData}
        handleInputChange={handleInputChange}
        setFormData={setFormData}
      />

      <AlbumSection formData={formData} handleInputChange={handleInputChange} />

      <PersonalInfoSection
        formData={formData}
        handleInputChange={handleInputChange}
        handleBirthPlaceChange={handleBirthPlaceChange}
        handleBirthTimeChange={handleBirthTimeChange}
        handleHeightChange={handleHeightChange}
        handleWorkPlaceChange={handleWorkPlaceChange}
      />

      <FamilyInfoSection
        formData={formData}
        handleInputChange={handleInputChange}
        handleMaternatityUnclePlaceChange={handleMaternatityUnclePlaceChange}
      />

      <ExpectationSection
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <LocationInfoSection
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <ContactInfoSection
        formData={formData}
        handleInputChange={handleInputChange}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <LinearGradient
          // colors={["#FF6F61", "#FFAB61"]}
          colors={GRADIENT_COLORS.buttonGradient}
          start={{ x: 2, y: 0 }}
          end={{ x: 0, y: 1 }}
          // start={[0, 0]}
          // end={[1, 1]}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>{translations.submit}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateBioData;
