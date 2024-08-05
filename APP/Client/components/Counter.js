// components/Counter.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Counter = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <View style={styles.counterContainer}>
      <Pressable style={[styles.button, styles.decrementButton]} onPress={onDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantityText}>{quantity}</Text>
      <Pressable style={[styles.button, styles.incrementButton]} onPress={onIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    borderRadius: 15,

    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFA500", // Orange color
  },
  decrementButton: {
    marginRight: 20,
  },
  incrementButton: {
    marginLeft: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Counter;
