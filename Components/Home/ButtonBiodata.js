import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ButtonBiodata = ({ title, description, imageSource, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fb",
    borderRadius: 16,
    padding: 16,
    width: "45%",
    alignItems: "center",
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});

export default ButtonBiodata;
