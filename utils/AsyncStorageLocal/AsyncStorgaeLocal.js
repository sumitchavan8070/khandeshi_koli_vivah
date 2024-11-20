// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Token storage functions
// export const token_storage = {
//   set: async (key, value) => {
//     try {
//       await AsyncStorage.setItem(key, value);
//     } catch (e) {
//       console.error("Failed to save token to AsyncStorage", e);
//     }
//   },
//   get: async (key) => {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       return value !== null ? value : null;
//     } catch (e) {
//       console.error("Failed to fetch token from AsyncStorage", e);
//       return null;
//     }
//   },
//   delete: async (key) => {
//     try {
//       await AsyncStorage.removeItem(key);
//     } catch (e) {
//       console.error("Failed to remove token from AsyncStorage", e);
//     }
//   },
//   clearAll: async () => {
//     try {
//       await AsyncStorage.clear();
//     } catch (e) {
//       console.error("Failed to clear AsyncStorage", e);
//     }
//   },
// };

import AsyncStorage from "@react-native-async-storage/async-storage";

// Token storage functions
export const token_storage = {
  set: async (key, value) => {
    try {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value); // Ensure string format
      await AsyncStorage.setItem(key, stringValue);
    } catch (e) {
      console.error("Failed to save token to AsyncStorage", e);
    }
  },
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? value : null;
    } catch (e) {
      console.error("Failed to fetch token from AsyncStorage", e);
      return null;
    }
  },
  delete: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Failed to remove token from AsyncStorage", e);
    }
  },
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Failed to clear AsyncStorage", e);
    }
  },
};
