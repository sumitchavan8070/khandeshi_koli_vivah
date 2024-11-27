// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   useColorScheme,
//   View,
//   Image,
// } from "react-native";
// import React, { useContext, useEffect, useState } from "react";
// import { useIsFocused } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LanguageContext } from "../../../Context/LanguageContext";
// import { themeColor } from "../../../constants/Colors";
// import APIEndPoints from "../../../utils/network_service/api_endpoints";
// import BiodataItemGrid from "../Search/BiodataItemGrid";
// import { getRequest } from "../../../utils/network_service/api_request";
// import LoadingAnimation from "../../Loader/loader";
// import BiodataItemList from "../Search/BiodataItemList";
// import Header from "../../Header/Header";

// const Bookmarks = () => {
//   const [bookmarkItem, setBookmarkItem] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [biodata, setBiodata] = useState([]);

//   const { translations } = useContext(LanguageContext);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (isFocused) {
//       fetchProfiles();
//     }
//   }, [isFocused]);

//   const fetchBookmark = async () => {
//     try {
//       const storedBookmarks = await AsyncStorage.getItem("bookmark");
//       const bookmarkedIds = JSON.parse(storedBookmarks) || [];
//       // console.log("Bookmarked IDs:", bookmarkedIds);

//       const matchedProfiles = bookmarkedIds
//         .map((id) => biodata.find((profile) => profile._id === id))
//         .filter((profile) => profile !== undefined); // Filter out unmatched IDs

//       // console.log("Matched Profiles:", matchedProfiles);
//       setBookmarkItem(matchedProfiles);
//     } catch (error) {
//       console.error("Error fetching bookmarks:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchProfiles = async () => {
//     setIsLoading(true);
//     try {
//       const apiEndPoint = APIEndPoints.get_all_biodata;
//       const response = await getRequest(apiEndPoint);
//       // console.log("Fetched Profiles Response:", response);

//       setBiodata(response.profiles || []);
//       await fetchBookmark(); // Call fetchBookmark after biodata is set
//     } catch (error) {
//       console.error("Error fetching profiles:", error);
//       Alert.alert("Error", "Failed to fetch biodata profiles.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View
//       style={{ backgroundColor: themeColor.background, flex: 1, padding: 10 }}
//     >
//       {isLoading ? (
//         <LoadingAnimation visible={isLoading} loop={true} />
//       ) : (
//         <>
//           <Header></Header>
//           <View style={{ marginTop: 20 }}>
//             <Text style={styles.sectionTitle}>Favorites :</Text>

//             <BiodataItemList data={bookmarkItem} />
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default Bookmarks;

// const styles = StyleSheet.create({
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
// });

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LanguageContext } from "../../../Context/LanguageContext";
import { themeColor } from "../../../constants/Colors";
import APIEndPoints from "../../../utils/network_service/api_endpoints";
import BiodataItemGrid from "../Search/BiodataItemGrid";
import { getRequest } from "../../../utils/network_service/api_request";
import LoadingAnimation from "../../Loader/loader";
import BiodataItemList from "../Search/BiodataItemList";
import Header from "../../Header/Header";
import LottieView from "lottie-react-native";

const Bookmarks = () => {
  const [bookmarkItem, setBookmarkItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [biodata, setBiodata] = useState([]);

  const { translations } = useContext(LanguageContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchProfiles();
    }
  }, [isFocused]);

  const fetchBookmark = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem("bookmark");
      const bookmarkedIds = JSON.parse(storedBookmarks) || [];
      const matchedProfiles = bookmarkedIds
        .map((id) => biodata.find((profile) => profile._id === id))
        .filter((profile) => profile !== undefined);

      setBookmarkItem(matchedProfiles);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const apiEndPoint = APIEndPoints.get_all_biodata;
      const response = await getRequest(apiEndPoint);

      setBiodata(response.profiles || []);
      await fetchBookmark(); // Call fetchBookmark after biodata is set
    } catch (error) {
      console.error("Error fetching profiles:", error);
      Alert.alert("Error", "Failed to fetch biodata profiles.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: themeColor.background,
        flex: 1,

        paddingTop: "5%",
      }}
    >
      {isLoading ? (
        <LoadingAnimation visible={isLoading} loop={true} />
      ) : (
        <>
          <Header />
          <View style={{ marginTop: 20 }}>
            {bookmarkItem.length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>Favorites :</Text>
                <BiodataItemList data={bookmarkItem} />
              </>
            ) : (
              // <Text style={styles.noItemsText}>No items found</Text>
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../../../assets/wedding.json")}
                  autoPlay
                  loop
                  style={styles.lottieAnimation}
                />
                <Text style={styles.noItemsText}>No Profiles in Favorites</Text>
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    padding: 10,
  },
  noItemsText: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },

  lottieContainer: {
    // flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    top: "30%",
  },
  lottieAnimation: {
    width: 350,
    height: 350,
  },
});
