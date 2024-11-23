import { View, Text, StyleSheet } from "react-native";
import React from "react";

const BiodataPrice = () => {
  return (
    <View>
      <Text style={styles.orignalPriceOfferText}>₹1000</Text>
      <Text style={styles.percentageOfferText}>(90% off)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  orignalPriceOfferText: {
    color: "gray",
    fontSize: 20,
    textDecorationLine: "line-through",
    alignSelf: "center",
  },
  percentageOfferText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BiodataPrice;
