import axios from "axios";
import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.43.78:8080/api"
    : "http://localhost:8080/api";

export const CHECK_USER_EXISTS = `${BASE_URL}/auth/checkUser`;

// apiEndpoints.js

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://ipo-api.vercel.app/app/";
