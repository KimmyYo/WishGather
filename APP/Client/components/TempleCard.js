import React from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const TempleCard = ({ imageSource, title, distance, savedStateSource, onPress }) => (
  <Pressable style={styles.container} onPress={onPress}>
    <View style={styles.child} />
    <Image style={[styles.image, styles.imageLayout]} source={imageSource} />
    <Text style={[styles.text, styles.textFlexBox]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.distance}>{distance}</Text>
    </Text>
    <Image style={[styles.savedStateIcon, styles.savedIconPosition]} source={savedStateSource} />
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: 420,
  },
  child: {
    height: "109.09%",
    top: "0%",
    right: "0%",
    bottom: "-9.09%",
    left: "0%",
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_100,
    borderBottomWidth: 1,
    borderRadius: Border.br_8xs,
    position: "absolute",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
  image: {
    width: "28.21%",
    right: "68.98%",
    left: "2.81%",
    bottom: "6.73%",
    top: "6.91%",
    height: "86.36%",
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: Border.br_8xs,
  },
  text: {
    width: "60.02%",
    fontFamily: FontFamily.interRegular,
    left: "35.12%",
    top: "13.91%",
    height: "85.91%",
    textAlign: "left",
  },
  title: {
    fontSize: FontSize.size_8xl,
    color: Color.colorBlack,
  },
  distance: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_400,
  },
  savedStateIcon: {
    width: "8.98%",
    right: "3.83%",
    left: "87.19%",
    bottom: "7.27%",
    top: "57.73%",
    height: "35%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  imageLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
});

export default TempleCard;
