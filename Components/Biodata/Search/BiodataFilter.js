import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";
import { deleteSvg, filterSvg } from "../../../constants/Svg";
import SearchBar from "./SearchBar";
import Header from "../../Header/Header";
import BiodataItemList from "./BiodataItemList";
import ViewSwitchButton from "./ViewSwitchButton";
import BiodataItemGrid from "./BiodataItemGrid";
import APIEndPoints from "../../../utils/network_service/api_endpoints";
import { getRequest } from "../../../utils/network_service/api_request";

const BiodataFilter = () => {
  const [gender, setGender] = useState("All");
  const [occupation, setOccupation] = useState(null);
  const [district, setDistrict] = useState(null);

  const occupationData = [
    { label: "Engineer", value: "Engineer" },
    { label: "Doctor", value: "Doctor" },
    { label: "Teacher", value: "Teacher" },
  ];

  const districtData = [
    { label: "District 1", value: "District1" },
    { label: "District 2", value: "District2" },
    { label: "District 3", value: "District3" },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  // Function to generate JSON and handle API call
  const applyFilters = () => {
    const filterData = {
      gender: gender,
      occupation: occupation || "All",
      district: district || "All",
    };

    // Example: Fetch data from the server using the filters
    console.log("Filter Data:", filterData);

    // Simulating a success response (replace with an actual fetch/axios call)
    Alert.alert("Filters Applied", JSON.stringify(filterData, null, 2));

    // Close the modal
    setModalVisible(false);
  };

  // const biodata = [
  //   {
  //     location: "Alice Springs NT 0870, London",
  //     title: "Shubham Dnyandeo Chavan",
  //     occupation: "Doctor",
  //     maritalStatus: "Single",
  //     age: 25,
  //     image:
  //       "https://media.istockphoto.com/photos/young-beautiful-woman-stock-photo-picture-id1345121223?b=1&k=20&m=1345121223&s=170667a&w=0&h=d58OIgmOyWGecmp87ohjY2TAoTGZfHHUmoV_qOd8kiQ=",
  //   },
  //   {
  //     location: "Downtown NY 10013, New York",
  //     title: "Piyush Laxman Kuwar",
  //     occupation: "Enginneer",
  //     maritalStatus: "Married",
  //     age: 25,
  //     image:
  //       "https://media.istockphoto.com/photos/young-beautiful-woman-stock-photo-picture-id1345121223?b=1&k=20&m=1345121223&s=170667a&w=0&h=d58OIgmOyWGecmp87ohjY2TAoTGZfHHUmoV_qOd8kiQ=",
  //   },
  // ];
  const [biodata, setBiodata] = useState([]); // State for fetched profiles
  const [isGridView, setIsGridView] = useState(true);

  const fetchProfiles = async () => {
    const apiEndPoint = APIEndPoints.get_all_biodata;
    const response = await getRequest(apiEndPoint);
    console.log("responce", response);

    setBiodata(response.profiles);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleToggle = (value) => {
    setIsGridView(value); // Update the state with the passed value
    // console.log("View mode:", value ? "Grid" : "List");
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: "5%" }}>
      <View style={styles.mainContainer}>
        <Header />
        <SearchBar />

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.text}>Filters</Text>
            <SvgXml xml={filterSvg} width="18" height="18" fill="#03A9F4" />
          </TouchableOpacity>

          <ViewSwitchButton onToggle={handleToggle} />
        </View>
        {/* <BiodataItemList data={hotelData} />

        <BiodataItemGrid data={hotelData} /> */}

        <View style={{ flex: 1 }}>
          {isGridView ? (
            <BiodataItemGrid data={biodata} />
          ) : (
            <BiodataItemList data={biodata} />
          )}
        </View>

        <View style={{ marginTop: 70, backgroundColor: "transparent" }}></View>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Filter Options</Text>

              {/* Gender Filters */}
              <View style={styles.filterGroup}>
                {["All", "Male", "Female"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setGender(item)}
                    style={[
                      styles.filterOption,
                      gender === item && styles.activeFilter,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        gender === item && styles.activeFilterText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Occupation Dropdown */}
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={occupationData}
                labelField="label"
                valueField="value"
                placeholder="Select Occupation"
                value={occupation}
                onChange={(item) => setOccupation(item.value)}
              />

              {/* District Dropdown */}
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={districtData}
                labelField="label"
                valueField="value"
                placeholder="Select District"
                value={district}
                onChange={(item) => setDistrict(item.value)}
              />

              {/* Apply Filters Button */}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F4F7FE",
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  filterGroup: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  filterOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    width: Dimensions.get("window").width / 4 - 20,
  },
  activeFilter: {
    backgroundColor: "#e0f4ff",
    borderColor: "#007BFF",
  },
  filterOptionText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  dropdown: {
    marginBottom: 16,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  applyButton: {
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  text: {
    color: "#000",
    fontSize: 14,
    // fontWeight: "bold",
    marginRight: 5,
  },
});

export default BiodataFilter;
