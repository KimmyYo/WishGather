import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions} from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Counter from "./Counter";  // Ensure the Counter component is correctly imported and used

const { width, height } = Dimensions.get('window');

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
      <Image
        style={styles.image}
        source={imageSource}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}  ${price}</Text>
        {description && <Text style={styles.description}>備註 : {description}</Text>}

        <View style={{flexDirection:"row", alignItems:"baseline"}}>
          <Text style={{fontWeight:"500"}}>購買數量 : </Text>
          <Counter quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width*0.9,
    height: 140,
    backgroundColor: Color.colorGray_100,
    flexDirection: 'row',  // Ensure the layout is row if you want the image and text side by side
    justifyContent:"flex-start",
    alignItems:"center",
    padding: 10,

    borderWidth: 1,
    borderColor: Color.colorWhitesmoke_300,
    borderRadius: Border.br_3xs,
    
    marginBottom: 10,  // Add margin bottom to separate items
  },
  image: {
    width: 100,  // Adjust the width to fit the layout
    height: 100,  // Adjust the height to fit the layout
    borderRadius: Border.br_8xs,
  },
  textContainer: {
    flexDirection:"column",
    paddingLeft:10,
    lineHeight:30,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default OfferingItem;
