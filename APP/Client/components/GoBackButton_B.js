import React from 'react';
import { Pressable, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const GoBackButton_B = () => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
      <Image
        style={styles.goBackIcon}
        contentFit="cover"
        source={require("../assets/go-back-button1.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    left: width * 0.02,
    top: width * 0.02,
    width: 45,
    height: 45,
    position: "absolute",
  },
  goBackIcon: {
    height: "100%",
    width: "100%",
  },
});

export default GoBackButton_B;
