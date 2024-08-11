import React, { useState } from "react";
import { Pressable, View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width } = Dimensions.get('window');

const TempleCard = ({ imageSource, title, distance, onPress, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSavePress = () => {
    const newSaveState = !isSaved;
    setIsSaved(newSaveState);
    onSave(newSaveState); // Call the onSave function with the new save state
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={imageSource} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
      <Pressable style={styles.savedStateIcon} onPress={handleSavePress}>
        <Image
          style={styles.savedStateIcon}
          source={isSaved ? require("../assets/saved-state.png") : require("../assets/saved-state1.png")}
        />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 140,
    backgroundColor: Color.colorGray_100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Color.colorWhitesmoke_300,
    borderRadius: Border.br_3xs,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: Border.br_8xs,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.size_4xl,
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
  },
  distance: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_400,
  },
  savedStateIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default TempleCard;
