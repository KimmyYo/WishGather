import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";
import Counter from "./Counter";  // 引入 Counter 組件

const DonationItem = ({ title, description, imageSource, tickSource }) => {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 0) {
        setQuantity(quantity - 1);
        }
    };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        {tickSource && <Image style={styles.tick} source={tickSource} />}
        <Image style={styles.image} source={imageSource} />
        <Text style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          {"\n"}
          <Text style={styles.description}>{description}</Text>
        </Text>
        <View style={styles.counterContainer}>
          <Counter quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140,
    backgroundColor: Color.colorWhite,
    borderBottomWidth: 1,
    borderColor: Color.colorWhitesmoke_300,
    justifyContent: "center",
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    height: 100,
    width: 100,
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    textAlign: "left",
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 20,
  },
  tick: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default DonationItem;
