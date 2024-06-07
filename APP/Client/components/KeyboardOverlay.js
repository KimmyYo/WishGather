import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

const KeyboardOverlay = ({ onClose }) => {
  return (
    <View style={[styles.keyboardOverlay, styles.keyboardLayout]}>
      <Image
        style={[styles.keyboardOverlayChild, styles.keyboardLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-57.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardLayout: {
    height: 317,
    width: 430,
  },
  keyboardOverlayChild: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  keyboardOverlay: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default KeyboardOverlay;
