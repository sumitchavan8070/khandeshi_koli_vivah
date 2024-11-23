import { StyleSheet } from "react-native";
import { themeColor } from "../../../constants/Colors";

export const stylesBiodata = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
  },
  container: {
    padding: 12,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 25,
    color: themeColor.appColorLight,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    borderColor: themeColor.appColorLight,
    borderWidth: 0.5,
    borderStyle: "dotted",
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
    color: themeColor.appColorLight,
  },
  input: {
    borderWidth: 1,
    padding: 11,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    padding: 11,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonContainer: {
    marginTop: 5,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  infoTextBelow: {
    fontSize: 7,
    color: "green",
    textAlign: "left",
    marginLeft: 10,
    marginTop: 10,
  },
});
