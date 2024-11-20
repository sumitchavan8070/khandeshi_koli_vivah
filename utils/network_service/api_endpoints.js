import axios from "axios";
import { Platform } from "react-native";

const APIEndPoints = {
  live: "http://192.168.43.175:8080/api/auth/",
  local: "http://10.0.20.147:3000/app/",
  base: process.env.REACT_APP_API_BASE_URL || "https://ipo-api.vercel.app/app/",

  checkUser: "checkUser",
  login: "login",
  register: "register",

  ipo: "ipo-v1",
  buyback: "buyback",

  ipoDetails: "ipo-details",
  buybackDetails: "buyback-details",
  forms: "forms",
  gmp: "gmp",
  subs: "subs",

  commonDetails: "common-details",
  blogs: "blogs",
  blogsV1: "blogs-v1",

  search: "search",

  updateFcm: "update-fcm",
};

export default APIEndPoints;
