import React, { useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, ImageSourcePropType } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Component1 = ({
  rectangle19,
  prop,
  propBackgroundColor,
  propFontFamily,
}) => {
  const viewStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
    };
  }, [propBackgroundColor]);

  const textStyle = useMemo(() => {
    return {
      ...getStyleValue("fontFamily", propFontFamily),
    };
  }, [propFontFamily]);

  return (
    <View style={[styles.view, viewStyle]}>
      <Image
        style={[styles.child, styles.itemPosition]}
        contentFit="cover"
        source={rectangle19}
      />
      <View style={[styles.item, styles.itemPosition]} />
      <Text style={[styles.text, textStyle]}>{prop}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    width: "100%",
    position: "absolute",
  },
  child: {
    height: "100%",
    top: "0%",
    borderRadius: Border.br_3xs,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  item: {
    height: "26.69%",
    top: "73.31%",
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorLightgray,
    borderWidth: 2,
  },
  text: {
    height: "12%",
    width: "48%",
    top: "84%",
    left: "26%",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorBlack,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  view: {
    width: 160,
    height: 160,
    marginLeft: 37,
  },
});

export default Component1;
