import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import globalStrings from "../utils/globalStrings";
import { token_storage } from "../utils/AsyncStorageLocal/AsyncStorgaeLocal";
//context
const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {
  //golbal state
  const [state, setState] = useState({
    user: null,
    // token: "",
  });

  // initial local storage data
  useEffect(() => {
    const loadLoaclStorageData = async () => {
      let data = await token_storage.get("client_data");

      let user = JSON.parse(data);

      setState({ ...state, user });
    };
    loadLoaclStorageData();
  }, []);

  // let token = state && state.token;

  //default axios setting
  // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // axios.defaults.baseURL = globalStrings.BASE_URL;
  // utils >> globalstring

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
