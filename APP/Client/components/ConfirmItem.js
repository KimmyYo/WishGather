import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles';
import Counter from '../components/Counter';

const { width } = Dimensions.get('window');

const ConfirmItem = ({ imageSource, title, price }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.container}>

      <Counter quantity={quantity} onIncrease={incrementQuantity} onDecrease={decrementQuantity} />

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width*0.9,
    height: 60,
    flexDirection: 'row',
    justifyContent:"center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#4F4F4F",
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#4F4F4F",
  },
});

export default ConfirmItem;
