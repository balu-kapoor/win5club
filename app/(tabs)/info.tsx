import { Link } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
const img = require("../../assets/images/icon.png");

export default function Tab() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={img}
        // placeholder={{ blurhash }}
        contentFit='cover'
        transition={1000}
      />
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={img}
            // placeholder={{ blurhash }}
            contentFit='cover'
            transition={1000}
          />
          <Text style={styles.paragraph}>
            At Win5club, we are dedicated to creating extraordinary experiences
            in the world of luxury hospitality and entertainment. As part of
            Corp Limited, we blend elegance, innovation, and exceptional service
            to deliver an unforgettable experience at each of our locations. Our
            properties are designed with meticulous attention to detail,
            providing premium accommodations, relaxing amenities, and upscale
            venues tailored for comfort and enjoyment.
          </Text>
          <Text style={styles.paragraph}>
            Located in vibrant destinations such as Goa, Win5club redefines
            hospitality standards by offering a seamless blend of luxury and
            leisure. Our commitment is to excellence, ensuring every guest
            enjoys a truly memorable stay.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // marginVertical: 50,
    backgroundColor: "#ffffff",
  },
  paragraph: {
    paddingHorizontal: 10,
    marginBottom: 12, // Adds space between paragraphs
    fontSize: 16, // Adjust font size for readability
    lineHeight: 24, // Adjust line height for better text spacing
    color: "#333", // Dark gray for better readability
  },
  link: {
    fontSize: 15,
    fontWeight: "500",
    color: "blue",
    textDecorationLine: "underline",
  },
  image: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#0553",
  },
});
