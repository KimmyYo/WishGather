import * as React from "react";
import { StyleSheet, View, Text, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

const DeleteOrder = ({ ellipse6, prop, prop1 }) => {
  return (
    <View style={styles.deleteOrder}>
      <View style={[styles.orderContainer, styles.trashIconPosition]}>
        <View style={styles.view}>
          <View style={styles.child} />
          <View style={[styles.item, styles.itemPosition]} />
          <Image style={styles.inner} contentFit="cover" source={ellipse6} />
          <Text style={styles.text}>查看訂單</Text>
          <Text style={[styles.nt1040, styles.itemPosition]}>
            <Text style={styles.text1}>{prop}</Text>
            <Text style={styles.text2}>{prop1}</Text>
          </Text>
        </View>
        <Image
          style={[styles.trashIcon, styles.trashIconPosition]}
          contentFit="cover"
          source={require("../assets/trash-icon.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trashIconPosition: {
    zIndex: 0,
    position: "absolute",
  },
  itemPosition: {
    left: "33.76%",
    position: "absolute",
  },
  child: {
    height: "100%",
    width: "95.12%",
    top: "0%",
    right: "4.88%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.colorWhitesmoke_200,
    borderRadius: Border.br_xl,
    position: "absolute",
  },
  item: {
    height: "24.12%",
    width: "57.5%",
    top: "61.76%",
    right: "8.74%",
    bottom: "14.12%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGoldenrod,
  },
  inner: {
    height: "58.82%",
    width: "25%",
    top: "8.24%",
    right: "69%",
    bottom: "32.94%",
    left: "6%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  text: {
    height: "18.24%",
    width: "43.76%",
    top: "67.06%",
    left: "41.74%",
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  text1: {
    fontSize: FontSize.size_8xl,
    color: Color.colorBlack,
  },
  text2: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_xl,
  },
  nt1040: {
    height: "41.76%",
    width: "62.5%",
    top: "12.94%",
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    textAlign: "left",
  },
  view: {
    width: 420,
    height: 170,
    zIndex: 1,
    borderRadius: Border.br_xl,
  },
  trashIcon: {
    marginTop: -27,
    top: "50%",
    right: 34,
    width: 59,
    height: 55,
  },
  orderContainer: {
    top: 10,
    left: 0,
    backgroundColor: Color.colorCrimson,
    overflow: "hidden",
    borderRadius: Border.br_xl,
    width: 400,
  },
  deleteOrder: {
    height: 190,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    width: 400,
  },
});

export default DeleteOrder;
