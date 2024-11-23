import axios from "axios";
import { Platform } from "react-native";

const APIEndPoints = {
  live: "http://192.168.43.78:8080/api/auth/",
  local: "http://10.0.20.147:3000/app/",
  base: process.env.REACT_APP_API_BASE_URL || "https://ipo-api.vercel.app/app/",

  checkUser: "checkUser",
  login: "login",
  register: "register",
  create_biodata: "profiles/createProfile",
  get_inpayment_profiles: "profiles//template/getinpaymentprofile",
};

export default APIEndPoints;
