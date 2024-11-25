import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { heartSvg, locationSVg } from "../../../constants/Svg";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/sdchavan/image/upload/";

const BiodataItemGrid = ({ data }) => {
  const numColumns = 2; // Number of grid columns

  const renderItem = ({ item }) => {
    const firstImageId =
      item.album && item.album.length > 0 ? item.album[0] : null;
    const imageUrl = firstImageId
      ? `${CLOUDINARY_BASE_URL}${firstImageId}`
      : null;

    return (
      <View style={styles.card}>
        {/* Image Section */}
        {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
        <Image source={{ uri: imageUrl }} style={styles.image} />

        {/* Details Section */}
        <View style={styles.details}>
          <View style={styles.locationRow}>
            <SvgXml xml={locationSVg} width="15" height="15" />
            <Text style={styles.location}>
              {item.locationInfo.district},{item.locationInfo.subDistrict},
              {item.locationInfo.village}
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
        {/* Actions Section */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.chatButton}>
            <SvgXml xml={heartSvg} width="18" height="18" />
            <Text style={styles.chatText}>Add to favourite</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

export default BiodataItemGrid;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: Dimensions.get("window").width / 2 - 40,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  details: {
    flex: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  chatButton: {
    flexDirection: "row",
    backgroundColor: "#E0F7FA",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  chatText: {
    color: "#00796B",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  bookText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
