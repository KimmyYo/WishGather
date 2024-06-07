import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Component = ({
  rectangle21,
  prop,
  prop1,
  savedStateIcon,
  propTop,
  propLeft,
  onPressablePress,
}) => {
  const pressableStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
    };
  }, [propTop, propLeft]);

  return (
    <Pressable
      style={[styles.pressable, pressableStyle]}
      onPress={onPressablePress}
    >
      <View style={styles.child} />
      <Image
        style={[styles.item, styles.itemLayout]}
        contentFit="cover"
        source={rectangle21}
      />
      <Text style={styles.text}>
        <Text style={styles.text1}>{prop}</Text>
        <Text style={styles.text2}>{prop1}</Text>
      </Text>
      {!savedStateIcon && (
        <Image
          style={[styles.savedStateIcon, styles.itemLayout]}
          contentFit="cover"
          source={require("../assets/saved-state.png")}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemLayout: {
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  child: {
    height: "109.08%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "-9.08%",
    left: "0%",
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_100,
    borderBottomWidth: 1,
    borderRadius: Border.br_8xs,
    position: "absolute",
  },
  item: {
    height: "86.33%",
    width: "28.21%",
    top: "6.92%",
    right: "68.97%",
    bottom: "6.75%",
    left: "2.82%",
    borderRadius: Border.br_8xs,
  },
  text1: {
    fontSize: FontSize.size_8xl,
    color: Color.colorBlack,
  },
  text2: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_400,
  },
  text: {
    height: "85.92%",
    width: "60.03%",
    top: "13.92%",
    left: "35.13%",
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    position: "absolute",
  },
  savedStateIcon: {
    height: "35%",
    width: "8.97%",
    top: "57.75%",
    right: "3.85%",
    bottom: "7.25%",
    left: "87.18%",
    display: "none",
  },
  pressable: {
    top: 346,
    left: 15,
    width: 390,
    height: 120,
    position: "absolute",
  },
});

export default Component;
