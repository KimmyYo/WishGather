import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from "expo-image";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const TempleDistance = ({ imageSource, distance, description, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        style={styles.locationIcon}
        contentFit="cover"
        source={require("../assets/location-icon1.png")}
      />
      <Image
        style={styles.image}
        contentFit="cover"
        source={imageSource}
      />
      <Text style={styles.text}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 199,
    width: 380,
    marginVertical: 10,
  },
  locationIcon: {
    height: "15.08%",
    width: "7.89%",
    top: "84.92%",
    left: "0.53%",
    position: "absolute",
  },
  image: {
    height: "80.4%",
    width: "100%",
    borderRadius: Border.br_3xs,
    opacity: 0.85,
    position: "absolute",
  },
  text: {
    height: "16.08%",
    width: "89.47%",
    top: "83.42%",
    left: "8.95%",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  description: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xl,
  },
  distance: {
    fontSize: FontSize.size_mini,
    color: Color.colorGray_300,
  },
});

export default TempleDistance;
