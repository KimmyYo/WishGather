import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { FontFamily, Border, FontSize, Color } from "../GlobalStyles";

const CartItem = ({ onPress, imageSource, orderTitle, orderDetails }) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.view}>
        <View style={styles.child} />

        <Pressable style={styles.item} onPress={onPress} />

        <Image style={styles.inner} source={imageSource} />
        <Text style={[styles.text2, styles.textTypo]}>查看訂單</Text>
        <Text style={styles.nt1040}>
          <Text style={styles.text3}>{orderTitle}</Text>
          <Text style={styles.nt10401}>{orderDetails}</Text>
        </Text>
      </View>
      <Image style={styles.trashIcon} source={require("../assets/trash-icon.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: Color.colorCrimson,
    width: 400,
    borderRadius: Border.br_xl,
    marginBottom: 20, // 增加這個屬性來分隔每個CartItem
  },
  view: {
    width: "100%",
    height: 170,
    borderRadius: Border.br_xl,
    position: "relative",
  },
  child: {
    width: "100%",
    height: "100%",
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
    left: "33.76%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGoldenrod,
    position: "absolute",
  },
  inner: {
    height: "58.82%",
    width: "25%",
    top: "8.24%",
    left: "6%",
    position: "absolute",
  },
  text2: {
    height: "18.24%",
    width: "43.76%",
    top: "67.06%",
    left: "41.74%",
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    position: "absolute",
  },
  text3: {
    fontSize: FontSize.size_8xl,
    color: Color.colorBlack,
  },
  nt10401: {
    color: Color.colorGray_400,
    fontSize: FontSize.size_xl,
  },
  nt1040: {
    height: "41.76%",
    width: "62.5%",
    top: "12.94%",
    left: "33.76%",
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    position: "absolute",
  },
  trashIcon: {
    marginTop: -27,
    right: 34,
    width: 59,
    height: 55,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
});

export default CartItem;
