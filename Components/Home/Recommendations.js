// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";

// const RecommendationCard = ({
//   image,
//   name,
//   location,
//   price,
//   rating,
//   onPress,
// }) => {
//   return (
//     <View style={styles.hotelCard}>
//       <Image source={{ uri: image }} style={styles.hotelImage} />
//       <View style={styles.hotelInfo}>
//         <Text style={styles.hotelName}>{name}</Text>
//         <Text style={styles.hotelLocation}>{location}</Text>
//         <Text style={styles.price}>{price}</Text>
//         <Text style={styles.rating}>{rating}</Text>
//         <TouchableOpacity style={styles.button} onPress={onPress}>
//           <Text style={{ color: "#fff", fontWeight: "bold" }}>
//             View Profile
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const Recommendations = () => {
//   const hotels = [
//     {
//       id: 1,
//       image:
//         "https://i.pinimg.com/736x/d2/a2/f5/d2a2f5b4e0d5e8928acd7f43e3b1f17c.jpg",
//       name: "The Aston Vill Hotel",
//       location: "Alice Springs NT 0870, London",
//       price: "$200/month",
//       rating: "⭐ 5.0",
//     },
//     {
//       id: 2,
//       image:
//         "https://media.istockphoto.com/photos/young-beautiful-woman-stock-photo-picture-id1345121223?b=1&k=20&m=1345121223&s=170667a&w=0&h=d58OIgmOyWGecmp87ohjY2TAoTGZfHHUmoV_qOd8kiQ=",
//       name: "The Blissful Stay",
//       location: "Sunny Beach, California",
//       price: "$300/month",
//       rating: "⭐ 4.5",
//     },
//     {
//       id: 3,
//       image:
//         "https://lh6.googleusercontent.com/3FbzTP9W8qg3ue9mD6Dm-fDy_jkWekJDe3eeQiO_SczoG6DUk_kxGUX1wfi98_A",
//       name: "The Blissful Stay",
//       location: "Sunny Beach, California",
//       price: "$300/month",
//       rating: "⭐ 4.5",
//     },
//     {
//       id: 4,
//       image:
//         "https://i.pinimg.com/originals/3e/be/a7/3ebea71e649ad13044228a95fe34256e.jpg",
//       name: "The Blissful Stay",
//       location: "Sunny Beach, California",
//       price: "$300/month",
//       rating: "⭐ 4.5",
//     },
//     {
//       id: 5,
//       image:
//         "https://i.pinimg.com/originals/06/da/69/06da69494e0b53c687a2622ff5eccadb.jpg",
//       name: "The Blissful Stay",
//       location: "Sunny Beach, California",
//       price: "$300/month",
//       rating: "⭐ 4.5",
//     },
//     {
//       id: 6,
//       image:
//         "https://i.pinimg.com/originals/e3/d5/1d/e3d51dbec50680f7ca252201acea652b.jpg",
//       name: "The Blissful Stay",
//       location: "Sunny Beach, California",
//       price: "$300/month",
//       rating: "⭐ 4.5",
//     },
//     {
//       id: 7,
//       image:
//         "https://www.vivaah.com/bride_groom_images/V/I/I/7/VII7973_3362347790_l.jpg",
//       name: "The Blissful Stay",
//       location: "Sunny Beach, California",
//       price: "$300/month",
//       rating: "⭐ 4.5",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.sectionTitle}>Recommendations</Text>
//       <ScrollView
//         style={styles.nearLocation}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//       >
//         <View style={styles.hotelList}>
//           {hotels.map((hotel) => (
//             <RecommendationCard
//               key={hotel.id}
//               image={hotel.image}
//               name={hotel.name}
//               location={hotel.location}
//               price={hotel.price}
//               rating={hotel.rating}
//               onPress={() => console.log(`Clicked on ${hotel.name}`)}
//             />
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 5,
//     backgroundColor: "transparent",
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   nearLocation: {
//     marginBottom: 20,
//   },
//   hotelList: {
//     flexDirection: "row",
//     gap: 20,
//   },
//   hotelCard: {
//     width: 200,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     justifyContent: "space-between",
//   },
//   hotelImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "stretch",
//   },
//   hotelInfo: {
//     padding: 10,
//   },
//   hotelName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   hotelLocation: {
//     fontSize: 14,
//     color: "#777",
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#1a73e8",
//     marginBottom: 5,
//   },
//   rating: {
//     fontSize: 14,
//     color: "#ff9800",
//     marginBottom: 10,
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#1a73e8",
//     alignItems: "center",
//   },
// });

// export default Recommendations;

import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const RecommendationCard = ({
  image,
  name,
  location,
  price,
  rating,
  onPress,
}) => {
  return (
    <View style={styles.hotelCard}>
      <Image source={{ uri: image }} style={styles.hotelImage} />
      <View style={styles.hotelInfo}>
        <Text style={styles.hotelName}>{name}</Text>
        <Text style={styles.hotelLocation}>{location}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.rating}>{rating}</Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Recommendations = () => {
  // const recommendations = []; // Set to an empty array for testing the fallback view
  const recommendations = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/d2/a2/f5/d2a2f5b4e0d5e8928acd7f43e3b1f17c.jpg",
      name: "The Aston Vill Hotel",
      location: "Alice Springs NT 0870, London",
      price: "$200/month",
      rating: "⭐ 5.0",
    },
    {
      id: 2,
      image:
        "https://media.istockphoto.com/photos/young-beautiful-woman-stock-photo-picture-id1345121223?b=1&k=20&m=1345121223&s=170667a&w=0&h=d58OIgmOyWGecmp87ohjY2TAoTGZfHHUmoV_qOd8kiQ=",
      name: "The Blissful Stay",
      location: "Sunny Beach, California",
      price: "$300/month",
      rating: "⭐ 4.5",
    },
    {
      id: 3,
      image:
        "https://lh6.googleusercontent.com/3FbzTP9W8qg3ue9mD6Dm-fDy_jkWekJDe3eeQiO_SczoG6DUk_kxGUX1wfi98_A",
      name: "The Blissful Stay",
      location: "Sunny Beach, California",
      price: "$300/month",
      rating: "⭐ 4.5",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/originals/3e/be/a7/3ebea71e649ad13044228a95fe34256e.jpg",
      name: "The Blissful Stay",
      location: "Sunny Beach, California",
      price: "$300/month",
      rating: "⭐ 4.5",
    },
    {
      id: 5,
      image:
        "https://i.pinimg.com/originals/06/da/69/06da69494e0b53c687a2622ff5eccadb.jpg",
      name: "The Blissful Stay",
      location: "Sunny Beach, California",
      price: "$300/month",
      rating: "⭐ 4.5",
    },
    {
      id: 6,
      image:
        "https://i.pinimg.com/originals/e3/d5/1d/e3d51dbec50680f7ca252201acea652b.jpg",
      name: "The Blissful Stay",
      location: "Sunny Beach, California",
      price: "$300/month",
      rating: "⭐ 4.5",
    },
    {
      id: 7,
      image:
        "https://www.vivaah.com/bride_groom_images/V/I/I/7/VII7973_3362347790_l.jpg",
      name: "The Blissful Stay",
      location: "Sunny Beach, California",
      price: "$300/month",
      rating: "⭐ 4.5",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      {recommendations.length > 0 ? (
        <ScrollView
          style={styles.nearLocation}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.hotelList}>
            {recommendations.map((hotel) => (
              <RecommendationCard
                key={hotel.id}
                image={hotel.image}
                name={hotel.name}
                location={hotel.location}
                price={hotel.price}
                rating={hotel.rating}
                onPress={() => console.log(`Clicked on ${hotel.name}`)}
              />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noRecommendations}>
          <Text style={styles.noRecommendationsText}>
            No recommendations available yet.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "transparent",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  nearLocation: {
    marginBottom: 20,
  },
  hotelList: {
    flexDirection: "row",
    gap: 20,
  },
  hotelCard: {
    width: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: "space-between",
  },
  hotelImage: {
    width: "100%",
    height: 200,
    resizeMode: "stretch",
  },
  hotelInfo: {
    padding: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a73e8",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: "#ff9800",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1a73e8",
    alignItems: "center",
  },
  noRecommendations: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    backgroundColor: "#ffff",
    borderRadius: 15,
    margin: 10,
  },
  noRecommendationsText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});

export default Recommendations;
