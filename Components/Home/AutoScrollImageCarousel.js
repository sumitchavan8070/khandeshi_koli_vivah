// import React, { useRef, useEffect } from "react";
// import {
//   Animated,
//   View,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Text,
// } from "react-native";

// const SmoothCarousel = ({ images }) => {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const screenWidth = Dimensions.get("window").width;

//   useEffect(() => {
//     const startCarousel = () => {
//       Animated.loop(
//         Animated.sequence(
//           images.map((_, index) =>
//             Animated.timing(scrollX, {
//               toValue: screenWidth * index,
//               duration: 3000, // Transition time between images
//               useNativeDriver: true,
//             })
//           )
//         )
//       ).start();
//     };

//     startCarousel();
//   }, [scrollX, images]);

//   const translateX = scrollX.interpolate({
//     inputRange: [0, screenWidth * images.length],
//     outputRange: [0, -screenWidth * images.length],
//     extrapolate: "clamp",
//   });

//   if (images.length === 0) {
//     return (
//       <View style={styles.noContentContainer}>
//         <Text style={styles.noContentText}>
//           No recommendations available yet
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.carouselContent,
//           {
//             transform: [{ translateX }],
//           },
//         ]}
//       >
//         {images.map((image, index) => (
//           <Image
//             key={index}
//             source={{ uri: image }}
//             style={styles.image}
//             resizeMode="cover"
//           />
//         ))}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     height: 200,
//     overflow: "hidden",
//     marginBottom: 20,
//   },
//   carouselContent: {
//     flexDirection: "row",
//   },
//   image: {
//     width: Dimensions.get("window").width,
//     height: 200,
//   },
//   noContentContainer: {
//     width: "100%",
//     height: 200,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   noContentText: {
//     fontSize: 16,
//     color: "#888",
//     fontStyle: "italic",
//   },
// });

// export default SmoothCarousel;

import React, { useRef, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const SmoothCarousel = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (images.length > 0) {
      const startCarousel = () => {
        Animated.loop(
          Animated.sequence(
            images.map((_, index) =>
              Animated.timing(scrollX, {
                toValue: screenWidth * index,
                duration: 3000, // Transition time between images
                useNativeDriver: true,
              })
            )
          )
        ).start();
      };

      startCarousel();
    }
  }, [scrollX, images]);

  const translateX = scrollX.interpolate({
    inputRange: [0, screenWidth * images.length],
    outputRange: [0, -screenWidth * images.length],
    extrapolate: "clamp",
  });

  // Fallback view for when there are no images
  if (images.length === 0) {
    return (
      <View style={styles.noContentContainer}>
        <Text style={styles.noContentText}>No Banner Ads available yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.carouselContent,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginBottom: 20,
  },
  carouselContent: {
    flexDirection: "row",
  },
  image: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  noContentContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  noContentText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});

export default SmoothCarousel;
