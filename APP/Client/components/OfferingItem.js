// OfferingItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const { width } = Dimensions.get('window');

const OfferingItem = ({ imageSource, title, price, description }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductPage', {
      imageSource,
      title,
      price,
      description,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
        {description && <Text style={styles.description}>備注 : {description}</Text>}
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} />
        <Pressable style={styles.addButton} onPress={handlePress}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    height: 140,
    backgroundColor: Color.colorGray_100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Border.br_8xs,
  },
  addButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: "white",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: Color.colorBlack,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: "gray",
    marginVertical: 2,
  },
  description: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
});

export default OfferingItem;
