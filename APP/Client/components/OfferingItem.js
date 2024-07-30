import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Counter from "./Counter";  // 引入 Counter 組件


const OfferingItem = ({ imageSource, title, price, description }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inner, styles.childPosition]} />
      <Image
        style={[styles.rectangleIcon, styles.iconLayout]}
        contentFit="cover"
        source={imageSource}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textTypo}>
          <Text style={styles.title}>{`${title} `}</Text>
          <Text style={styles.price}>{`${price}\n`}</Text>
        </Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.counterContainer}>
          <Counter quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
  },
  inner: {
    borderWidth: 2,
    borderColor: Color.colorWhitesmoke_300,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    borderRadius: Border.br_3xs,
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
  rectangleIcon: {
    height: "80%",
    width: "27.91%",
    top: "10%",
    right: "4.19%",
    bottom: "10%",
    left: "67.91%",
    borderRadius: Border.br_8xs,
  },
  textContainer: {
    position: 'absolute',
    top: "5%",
    left: "3.72%",
    width: "62.79%",
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
    marginBottom: 5,  // 添加 marginBottom 來確保 description 和 counter 之間有間距
  },
  counterContainer: {
    marginBottom: 10,
  },
});

export default OfferingItem;
