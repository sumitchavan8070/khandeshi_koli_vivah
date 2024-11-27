// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   Dimensions,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import { Dropdown } from "react-native-element-dropdown";
// import { SvgXml } from "react-native-svg";
// import { deleteSvg, filterSvg } from "../../../constants/Svg";
// import SearchBar from "./SearchBar";
// import Header from "../../Header/Header";
// import BiodataItemList from "./BiodataItemList";
// import ViewSwitchButton from "./ViewSwitchButton";
// import BiodataItemGrid from "./BiodataItemGrid";
// import APIEndPoints from "../../../utils/network_service/api_endpoints";
// import { getRequest } from "../../../utils/network_service/api_request";
// import LoadingAnimation from "../../Loader/loader";
// import cities from "../../../constants/MaharashtraCities.json";
// import { LanguageContext } from "../../../Context/LanguageContext";

// const BiodataFilter = () => {
//   const [gender, setGender] = useState("All");
//   const [occupation, setOccupation] = useState(null);
//   const [district, setDistrict] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [biodata, setBiodata] = useState([]); // State for fetched profiles
//   const [isGridView, setIsGridView] = useState(true);

//   const { translations } = useContext(LanguageContext);

//   const districts =
//     cities?.districts?.map((district) => ({
//       label: district.district,
//       value: district.district,
//     })) ?? [];

//   const occupationData = [
//     { label: translations.Unemployed, value: "Unemployed" },
//     { label: translations.Business, value: "Business" },

//     { label: translations.Engineer, value: "Engineer" },
//     { label: translations.Doctor, value: "Doctor" },
//     { label: translations.Driver, value: "Driver" },
//     { label: translations.Teacher, value: "Teacher" },
//     { label: translations.Lawyer, value: "Lawyer" },
//     { label: translations.Nurse, value: "Nurse" },
//     { label: translations.Architect, value: "Architect" },
//     { label: translations.Electrician, value: "Electrician" },
//     { label: translations.Plumber, value: "Plumber" },
//     { label: translations.Carpenter, value: "Carpenter" },
//     { label: translations.Chef, value: "Chef" },
//     { label: translations.Pilot, value: "Pilot" },
//     { label: translations.Artist, value: "Artist" },
//     { label: translations.Farmer, value: "Farmer" },
//     { label: translations.Mechanic, value: "Mechanic" },
//     { label: translations.Scientist, value: "Scientist" },
//     { label: translations.Pharmacist, value: "Pharmacist" },
//     { label: translations.SoftwareDeveloper, value: "SoftwareDeveloper" },
//     { label: translations.Accountant, value: "Accountant" },
//     { label: translations.PoliceOfficer, value: "PoliceOfficer" },
//     { label: translations.Other, value: "Other" }, // "Other" option
//   ];

//   const [modalVisible, setModalVisible] = useState(false);

//   // Function to generate JSON and handle API call
//   // const applyFilters = () => {
//   //   const filterData = {
//   //     gender: gender,
//   //     occupation: occupation || "All",
//   //     district: district || "All",
//   //   };

//   //   // Example: Fetch data from the server using the filters
//   //   // console.log("Filter Data:", filterData);

//   //   // Simulating a success response (replace with an actual fetch/axios call)
//   //   Alert.alert("Filters Applied", JSON.stringify(filterData, null, 2));

//   //   // Close the modal
//   //   setModalVisible(false);
//   // };

//   const applyFilters = () => {
//     const filterData = {
//       gender: gender,
//       occupation: occupation || "All",
//       district: district || "All",
//     };

//     const filteredData = biodata.filter((item) => {
//       const genderMatch =
//         filterData.gender === "All" || item.gender === filterData.gender;
//       const occupationMatch =
//         filterData.occupation === "All" ||
//         item.occupation === filterData.occupation;
//       const districtMatch =
//         filterData.district === "All" || item.district === filterData.district;

//       return genderMatch && occupationMatch && districtMatch;
//     });

//     setBiodata(filteredData);

//     Alert.alert("Filters Applied", JSON.stringify(filterData, null, 2));
//     setModalVisible(false);
//   };

//   const fetchProfiles = async () => {
//     setLoading(true);
//     const apiEndPoint = APIEndPoints.get_all_biodata;
//     const response = await getRequest(apiEndPoint);
//     console.log("--->", response);
//     setBiodata(response.profiles);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProfiles();
//   }, []);

//   const handleToggle = (value) => {
//     setIsGridView(value); // Update the state with the passed value
//     // console.log("View mode:", value ? "Grid" : "List");
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, paddingTop: "5%" }}>
//       <View style={styles.mainContainer}>
//         <Header />
//         <SearchBar />

//         <View style={styles.menuContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setModalVisible(true)}
//           >
//             <Text style={styles.text}>Filters</Text>
//             <SvgXml xml={filterSvg} width="18" height="18" fill="#03A9F4" />
//           </TouchableOpacity>

//           <ViewSwitchButton onToggle={handleToggle} />
//         </View>

//         <View style={{ flex: 1 }}>
//           {isGridView ? (
//             <BiodataItemGrid data={biodata} />
//           ) : (
//             <BiodataItemList data={biodata} />
//           )}
//         </View>

//         <View style={{ marginTop: 70, backgroundColor: "transparent" }}></View>

//         {loading && <LoadingAnimation visible={loading} loop={true} />}

//         {/* Modal */}
//         <Modal
//           visible={modalVisible}
//           animationType="slide"
//           transparent={true}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={styles.modalTitle}>Filter Options</Text>

//               {/* Gender Filters */}
//               <View style={styles.filterGroup}>
//                 {["All", "Male", "Female"].map((item) => (
//                   <TouchableOpacity
//                     key={item}
//                     onPress={() => setGender(item)}
//                     style={[
//                       styles.filterOption,
//                       gender === item && styles.activeFilter,
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.filterOptionText,
//                         gender === item && styles.activeFilterText,
//                       ]}
//                     >
//                       {item}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               {/* Occupation Dropdown */}
//               <Dropdown
//                 style={styles.dropdown}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 data={occupationData}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select Occupation"
//                 value={occupation}
//                 onChange={(item) => setOccupation(item.value)}
//               />

//               {/* District Dropdown */}
//               <Dropdown
//                 style={styles.dropdown}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 inputSearchStyle={styles.inputSearchStyle}
//                 data={districts}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Select District"
//                 value={district}
//                 onChange={(item) => setDistrict(item.value)}
//                 maxHeight={"60%"}
//               />

//               {/* Apply Filters Button */}
//               <TouchableOpacity
//                 style={styles.applyButton}
//                 onPress={applyFilters}
//               >
//                 <Text style={styles.applyButtonText}>Apply Filters</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
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
import LoadingAnimation from "../../Loader/loader";
import cities from "../../../constants/MaharashtraCities.json";
import { LanguageContext } from "../../../Context/LanguageContext";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
const BiodataFilter = () => {
  const [gender, setGender] = useState("All");
  const [occupation, setOccupation] = useState(null);
  const [district, setDistrict] = useState(null);
  const [loading, setLoading] = useState(false);

  const [biodata, setBiodata] = useState([]); // State for fetched profiles
  const [filteredBiodata, setFilteredBiodata] = useState([]); // State for filtered profiles
  const [isGridView, setIsGridView] = useState(true);

  const { translations } = useContext(LanguageContext);

  const districts =
    cities?.districts?.map((district) => ({
      label: district.district,
      value: district.district,
    })) ?? [];

  const occupationData = [
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

  const [modalVisible, setModalVisible] = useState(false);

  const applyFilters = () => {
    const filterData = {
      gender: gender,
      occupation: occupation || "All",
      district: district || "All",
    };

    const filteredData = biodata.filter((item) => {
      const genderMatch =
        filterData.gender === "All" || item.candidateType === filterData.gender;
      const occupationMatch =
        filterData.occupation === "All" ||
        item.occupation === filterData.occupation;
      const districtMatch =
        filterData.district === "All" ||
        item.locationInfo?.district === filterData.district;

      return genderMatch && occupationMatch && districtMatch;
    });

    setFilteredBiodata(filteredData);
    // Alert.alert("Filters Applied", JSON.stringify(filterData, null, 2));
    setModalVisible(false);
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const apiEndPoint = APIEndPoints.get_all_biodata;
      const response = await getRequest(apiEndPoint);
      setBiodata(response.profiles);
      setFilteredBiodata(response.profiles); // Initialize filteredBiodata with all profiles
    } catch (error) {
      console.error("Error fetching profiles:", error);
      Alert.alert("Error", "Failed to fetch biodata profiles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleToggle = (value) => {
    setIsGridView(value);
  };

  const removeFilterGender = () => {
    setGender("All");
    setFilteredBiodata(biodata); // Reset filtered data to original data
  };

  const removeFilterOccupation = () => {
    setOccupation(null);
    setFilteredBiodata(biodata); // Reset filtered data to original data
  };
  const removeFilterDistrict = () => {
    setDistrict(null);
    setFilteredBiodata(biodata); // Reset filtered data to original data
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

        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {gender !== "All" && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>{gender}</Text>
              <TouchableOpacity onPress={() => removeFilterGender("gender")}>
                <SimpleLineIcons name="close" size={18} color="gray" />
              </TouchableOpacity>
            </View>
          )}
          {occupation && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>{occupation}</Text>
              <TouchableOpacity
                onPress={() => removeFilterOccupation("occupation")}
              >
                {/* <SvgXml xml={deleteSvg} width="14" height="14" /> */}
                <SimpleLineIcons name="close" size={18} color="gray" />
              </TouchableOpacity>
            </View>
          )}
          {district && (
            <View style={styles.activeFilterTag}>
              <Text style={styles.activeFilterText}>{district}</Text>
              <TouchableOpacity
                onPress={() => removeFilterDistrict("district")}
              >
                {/* <SvgXml xml={deleteSvg} width="14" height="14" /> */}
                <SimpleLineIcons name="close" size={18} color="gray" />
              </TouchableOpacity>
            </View>
          )}
          {/* {(gender !== "All" || occupation || district) && (
            <TouchableOpacity
              onPress={() => {
                setGender("All");
                setOccupation(null);
                setDistrict(null);
                applyFilters();
              }}
              style={styles.clearAllButton}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          )} */}
        </View>

        <View style={{ flex: 1 }}>
          {isGridView ? (
            <BiodataItemGrid data={filteredBiodata} />
          ) : (
            <BiodataItemList data={filteredBiodata} />
          )}
        </View>

        {loading && <LoadingAnimation visible={loading} loop={true} />}

        <View style={{ marginTop: 60 }}></View>

        {/* Filter Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.modalTitle}>Filter Options</Text>
                <SimpleLineIcons
                  name="close"
                  size={24}
                  color="#007BFF"
                  style={{ bottom: "20%", right: "5%" }}
                  onPress={() => setModalVisible(false)}
                />
              </View>

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
                data={districts}
                labelField="label"
                valueField="value"
                placeholder="Select District"
                value={district}
                onChange={(item) => setDistrict(item.value)}
              />

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
    backgroundColor: "transparent",
  },
  mainContainer: {
    flex: 1,
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

  activeFilterTag: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#e0f4ff",
    backgroundColor: "white",
    padding: 8,
    margin: 5,
    borderRadius: 20,
  },
  activeFilterText: {
    fontSize: 14,
    color: "#007BFF",
    marginRight: 5,
  },
  clearAllButton: {
    backgroundColor: "#ff5555",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 5,
  },
  clearAllText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default BiodataFilter;
