{/*計數器Components*/}
// components/Counter.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.counterContainer}>
      <Button title="-" onPress={onDecrease} />
      <Text style={styles.quantityText}>{quantity}</Text>
      <Button title="+" onPress={onIncrease} />
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default Counter;
