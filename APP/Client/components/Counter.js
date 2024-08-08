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
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFA500", // Orange color

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3.5,
    // Shadow for Android
    elevation: 5,
  },
  decrementButton: {
    marginRight: 15,
  },
  incrementButton: {
    marginLeft: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Counter;
