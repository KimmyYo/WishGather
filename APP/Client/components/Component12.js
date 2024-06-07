import React, { useMemo } from "react";
import { StyleSheet, View, Text, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Component1 = ({ counter, rectangle11, prop, rectangleViewTop }) => {
  const view1Style = useMemo(() => {
    return {
      ...getStyleValue("top", rectangleViewTop),
    };
  }, [rectangleViewTop]);

  return (
    <View style={[styles.view, styles.viewLayout, view1Style]}>
      <View style={[styles.child, styles.viewLayout]} />
      <Image style={styles.counterIcon} contentFit="cover" source={counter} />
      <Image style={styles.item} contentFit="cover" source={rectangle11} />
      <Text style={styles.text}>{prop}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 130,
    width: 430,
    left: 0,
    position: "absolute",
  },
  child: {
    top: 0,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorWhitesmoke_300,
    borderWidth: 3,
  },
  counterIcon: {
    top: 75,
    left: 280,
    width: 140,
    height: 40,
    position: "absolute",
  },
  item: {
    top: 15,
    left: 19,
    width: 100,
    height: 100,
    position: "absolute",
  },
  text: {
    top: 19,
    left: 142,
    fontSize: FontSize.size_6xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    width: 247,
    height: 46,
    position: "absolute",
  },
  view: {
    top: 295,
  },
});

export default Component1;
