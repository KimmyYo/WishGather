{/*點選宮廟，會顯示該宮廟提供之商品頁面中的商品Components*/}

import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const OfferingItem = ({ imageSource, title, price, description }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inner, styles.childPosition]} />
      <Image
        style={[styles.counterIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/counter3.png")}
      />
      <Image
        style={[styles.rectangleIcon, styles.iconLayout]}
        contentFit="cover"
        source={imageSource}
      />
      <Text style={[styles.text, styles.textPosition]}>
        <Text style={styles.textTypo}>
          <Text style={styles.title}>{`${title} `}</Text>
          <Text style={styles.price}>{`${price}\n`}</Text>
        </Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  inner: {
    borderWidth: 2,
    borderColor: Color.colorWhitesmoke_300,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_3xs,
    bottom: "0%",
    right: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  counterIcon: {
    height: "26.67%",
    width: "32.56%",
    top: "57.33%",
    right: "63.72%",
    bottom: "16%",
    left: "3.72%",
  },
  rectangleIcon: {
    height: "80%",
    width: "27.91%",
    top: "10%",
    right: "4.19%",
    bottom: "10%",
    left: "67.91%",
    borderRadius: Border.br_8xs,
  },
  textPosition: {
    top: "5%",
    width: "62.79%",
    height: "66.67%",
    left: "3.72%",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  title: {
    fontSize: FontSize.size_6xl,
  },
  price: {
    fontSize: FontSize.size_xl,
  },
  description: {
    fontSize: FontSize.size_mini,
  },
});

export default OfferingItem;
