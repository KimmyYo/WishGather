import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, ImageSourcePropType } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

// Acitivity component 
// 1. Should change the image souce to svg file 
// 2. What is the use of <Text>?? 
// 3. Should change the name of css 
// Give the example output of this component
const Activity = ({ rectangle2, prop }) => {
  return (
    <View style={styles.activity2}>
      <Image
        style={[styles.locationIcon, styles.locationIconLayout]}
        contentFit="cover"
        source={require("../assets/location-icon1.png")}
      />
      <Image
        style={[styles.activity2Child, styles.locationIconLayout]}
        contentFit="cover"
        source={rectangle2}
      />
      <Text style={styles.text}>
        <Text style={styles.txt}>
          <Text style={styles.text1}>
            <Text style={styles.text2}>{prop}</Text>
            <Text style={styles.text3}>{` `}</Text>
          </Text>
          <Text style={styles.text3}>
            <Text style={styles.text5}>12公里</Text>
          </Text>
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  locationIconLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  locationIcon: {
    height: "15.08%",
    width: "7.89%",
    top: "84.92%",
    right: "91.58%",
    bottom: "0%",
    left: "0.53%",
  },
  activity2Child: {
    height: "80.4%",
    right: "0%",
    top: "0%",
    bottom: "19.6%",
    left: "0%",
    borderRadius: Border.br_3xs,
    opacity: 0.85,
    width: "100%",
  },
  text2: {
    color: Color.colorBlack,
  },
  text3: {
    color: Color.colorGray_300,
  },
  text1: {
    fontSize: FontSize.size_xl,
  },
  text5: {
    fontSize: FontSize.size_mini,
  },
  txt: {
    width: "100%",
  },
  text: {
    height: "16.08%",
    width: "89.47%",
    top: "83.42%",
    left: "8.95%",
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    position: "absolute",
  },
  activity2: {
    width: 380,
    height: 199,
    marginTop: 30,
  },
});

export default Activity;
