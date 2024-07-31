import React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Checkbox from "expo-checkbox";
import { Border, FontFamily, FontSize, Color } from "../GlobalStyles";
import Counter from "./Counter";  // 引入 Counter 組件

const DonationItem = ({ title, description, imageSource, tickSource }) => {
    const [quantity, setQuantity] = useState(0);
    const [isChecked, setChecked] = useState(false);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 0) {
        setQuantity(quantity - 1);
        }
    };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>

        {/*Donate yes/no */}
        <View>
            <Checkbox
              style={{width:22, height:22, margin: 8}}
              value={isChecked} 
              onValueChange={setChecked}
              color={isChecked ? '#FFA500' : undefined}
            />
        </View>
        
        {/*Item Image */}
        <Image style={styles.image} source={imageSource} />

        {/*Item Name */}
        <View style={{flexDirection:"column", marginLeft: 15}}>
          <Text style={styles.text}>
            <Text style={styles.title}>{title}{"\n"}</Text>
            <Text style={styles.description}>備註 : {description}</Text>
          </Text>

          {/* Counter */}
          <View style={{flexDirection:"row", alignItems:"baseline"}}>
            <Text style={{fontWeight:"500"}}>捐贈數量 : </Text>
            <Counter quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
          </View>
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
    borderRadius:10
  },
  text: {
    flex: 1,
    lineHeight:30,
    color: Color.colorBlack,
    textAlign: "left",
  },
  title: {
    fontSize: FontSize.size_6xl,
    fontWeight:"500",
  },
  description: {
    fontSize: FontSize.size_mini,
  },
  tick: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default DonationItem;
