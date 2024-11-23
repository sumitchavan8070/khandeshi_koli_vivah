import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import SearchBar from "../../Components/Menus/SearchBar";
import { LinearGradient } from "expo-linear-gradient";
import GRADIENT_COLORS from "../../constants/Colors";
import NewsTicker from "../../Components/Home/AutoScrollImageCarousel";
import ButtonBiodata from "../../Components/Home/ButtonBiodata";
import Recommendations from "../../Components/Home/Recommendations";
import FloatingActionButton from "../../Components/Home/FloatingActionButton";
import { menuSvg, notificationSvg } from "../../constants/Svg";
import { useNavigation } from "@react-navigation/native";
import ProfileModal from "../../Components/Home/ProfileModal";

const LandingView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation(); // React Navigation hook for navigation
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const imageUrls = [
    "https://www.k4fashion.com/wp-content/uploads/2022/09/The-Picture-Perfect-Family-Portrait-wedding-photos-750x460.jpg",
    "https://weddingaffair.co.in/wp-content/uploads/2023/06/role-of-parents-in-preparing-wedding-ceremonies-wedding-affair.webp",
    "https://i.pinimg.com/originals/ba/fd/a2/bafda2827f525c94abdaa372c7fd7b43.jpg",
    "http://jodilogik.com/wp-content/uploads/2017/11/Hindu-Weddings.jpg",
    "https://i.pinimg.com/originals/72/ca/1a/72ca1a5c8a67a132017b929bf7537f43.jpg",
  ];

  // const handleMockTestPress = () => {
  //   Alert.alert("Mock Tests Page", "Navigate to the Mock Tests Page!");
  // };

  const handlePracticeTestPress = () => {
    Alert.alert("Practice Tests Page", "Navigate to the Practice Tests Page!");
  };

  const handleCreateBiodata = () => {
    // Alert.alert("Create Biodata", "Navigate to the Create Biodata Page!");
    navigation.navigate("CreateBiodata");
  };

  const handleChooseTemplate = () => {
    setModalVisible(true);
    // Alert.alert("Choose Template", "Navigate to the Choose Template Page!");
  };

  const navigateToTemplate = (profile) => {
    navigation.navigate("BiodataTemplateScreen", { profile });
  };

  const handleUploadPhoto = () => {
    Alert.alert("Upload Photo", "Navigate to the Upload Family Photo Page!");
  };

  return (
    <SafeAreaView style={{ marginTop: 20 }}>
      <LinearGradient colors={GRADIENT_COLORS.backgroundGradient}>
        <ScrollView style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <SvgXml xml={menuSvg} width={40} height={40} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Koli Vivah</Text>
            <SvgXml xml={notificationSvg} width={40} height={40} />
          </View>

          <SearchBar />

          {/* <AutoScrollImageCarousel images={imageUrls} interval={1500} /> */}
          <NewsTicker images={imageUrls} />

          <View style={styles.containerButtons}>
            <ButtonBiodata
              title="Create Biodata"
              description="create new biodata here!"
              imageSource={require("../../assets/resume.png")} // Replace with your image path
              onPress={handleCreateBiodata}
            />
            <ButtonBiodata
              title="Choose Template"
              description="choose template here!"
              imageSource={require("../../assets/biodata.png")} // Replace with your image path
              onPress={handleChooseTemplate}
            />
          </View>
          <Recommendations />

          <View style={{ margin: 50 }}></View>

          <ProfileModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            navigateToTemplate={navigateToTemplate}
          />
        </ScrollView>
        <FloatingActionButton
          onCreateBiodata={handleCreateBiodata}
          onChooseTemplate={handleChooseTemplate}
          onUploadPhoto={handleUploadPhoto}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transprent",
    marginBottom: 20,
  },
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a73e8",
  },
  searchBar: {
    flex: 1,
    marginLeft: 20,
  },
  searchInput: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  countryFlags: {
    flexDirection: "row",
    gap: 10,
  },
  flagButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#ddd",
    borderWidth: 0,
    cursor: "pointer",
  },
  nearLocation: {
    padding: 20,
  },
  hotelList: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
  },
  hotelCard: {
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  hotelImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  hotelInfo: {
    padding: 10,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hotelLocation: {
    fontSize: 14,
    color: "#555",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a73e8",
  },
  rating: {
    fontSize: 14,
    color: "#ff9800",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1a73e8",
    color: "#fff",
    borderWidth: 0,
    marginTop: 10,
  },
});

export default LandingView;
