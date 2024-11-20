// import { View, Text, Button } from "react-native";
// import React, { useContext, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { token_storage } from "../utils/AsyncStorageLocal/AsyncStorgaeLocal";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AuthContext } from "../Context/authContext";

// const Home = () => {
//   const navigation = useNavigation(); // React Navigation hook for navigation
//   const [state, setState] = useContext(AuthContext);

//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const handleItemTapped = (index, value) => {
//     setSelectedIndex(index); // Update the selected index
//   };

//   const handleLogout = async () => {
//     setState({
//       user: null,
//     });

//     await AsyncStorage.clear();
//   };
//   return (
//     <View>
//       <Text>Home</Text>

//       <Button title="Logout" onPress={handleLogout}></Button>
//     </View>
//   );
// };

// export default Home;

import { View, Text, ScrollView } from "react-native";
import React from "react";
import TabView from "../utils/constants/tab_navigation_view";

const Home = () => {
  return (
    <ScrollView style={{ backgroundColor: "white", flexGrow: 1 }}>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
      <Text style={{ padding: 50, color: "black" }}>Home</Text>
    </ScrollView>
  );
};

export default Home;
