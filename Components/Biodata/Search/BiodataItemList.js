import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { heartSvg, locationSVg } from "../../../constants/Svg";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/sdchavan/image/upload/";

const BiodataItemList = ({ data }) => {
  // const imageUrl = `${CLOUDINARY_BASE_URL}${item.public_id}`;
  const navigation = useNavigation(); // Hook to access navigation
  const [bookmarkedItems, setBookmarkedItems] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const loadBookmarks = async () => {
      const storedBookmarks = await AsyncStorage.getItem("bookmark");
      if (storedBookmarks) {
        setBookmarkedItems(JSON.parse(storedBookmarks));
      }
    };
    // loadBookmarks();

    if (isFocused) {
      loadBookmarks();
    }
  }, [isFocused]);

  const saveBookmark = async (itemId) => {
    const updatedBookmarks = [...bookmarkedItems, itemId];
    setBookmarkedItems(updatedBookmarks);
    await AsyncStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = async (itemId) => {
    const updatedBookmarks = bookmarkedItems.filter((id) => id !== itemId);
    setBookmarkedItems(updatedBookmarks);
    await AsyncStorage.setItem("bookmark", JSON.stringify(updatedBookmarks));
  };

  const isBookmarked = (itemId) => {
    return bookmarkedItems.includes(itemId);
  };

  const renderItem = ({ item }) => {
    const firstImageId =
      item.album && item.album.length > 0 ? item.album[0] : null;
    const imageUrl = firstImageId
      ? `${CLOUDINARY_BASE_URL}${firstImageId}`
      : null;

    return (
      <View style={styles.card}>
        <View style={styles.cardContent}>
          {/* Image Section */}
          {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
          <Image source={{ uri: imageUrl }} style={styles.image} />

          {/* Details Section */}
          <View style={styles.details}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 5,
                alignContent: "center",
              }}
            >
              <SvgXml xml={locationSVg} width="15" height="15" />
              <Text style={styles.location}>
                {item.locationInfo?.district},{item.locationInfo?.subDistrict},
                {item.locationInfo?.village}
              </Text>
            </View>
            <Text style={styles.title}>{item.fullName}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>💼 {item.occupation}</Text>
              <Text style={styles.infoText}>🎯 {item.maritalStatus}</Text>
            </View>
            <Text style={styles.priceText}>
              Age: <Text style={styles.price}>{item.age}</Text>
            </Text>
          </View>
        </View>
        {/* Actions Section */}
        <View style={styles.actions}>
          {/* <TouchableOpacity style={styles.chatButton}>
            <SvgXml xml={heartSvg} width="18" height="18" />
            <Text style={styles.chatText}>Add to favourite</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() =>
              isBookmarked(item._id)
                ? removeBookmark(item._id)
                : saveBookmark(item._id)
            }
          >
            <SvgXml
              xml={heartSvg(isBookmarked(item._id) ? "red" : "white")}
              width="18"
              height="18"
            />
            <Text style={styles.chatText}>Add to Favourite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => {
              navigation.navigate("ProfileScreen", { user: item });
            }} // Navigate to Profile screen
          >
            <Text style={styles.bookText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default BiodataItemList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  location: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "gray",
  },
  priceText: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    // fontWeight: "bold",
    color: "gray",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatButton: {
    flexDirection: "row",
    backgroundColor: "#E0F7FA",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
    gap: 10,
  },
  chatText: {
    color: "#00796B",
    fontSize: 14,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
