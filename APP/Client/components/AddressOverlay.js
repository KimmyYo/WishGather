import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

// Address Overlay Componet: 修改地址的彈出 （所有彈出都類似嗎）
// 
const AddressOverlay = ({ onClose }) => {
  return (
    <View style={[styles.addressOverlay, styles.addressLayout]}>
      <View style={[styles.addressOverlayChild, styles.addressLayout]} />
      <Text style={[styles.text, styles.textTypo]}>修改地址</Text>
      <View style={styles.addressOverlayItem} />
      <Text style={[styles.text1, styles.textTypo]}>確認</Text>
      <Text style={styles.text2}>高雄市鼓山區蓮海路70號</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  addressLayout: {
    height: 250,
    width: 300,
  },
  textTypo: {
    textAlign: "center",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_4xl,
    position: "absolute",
  },
  addressOverlayChild: {
    top: 0,
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  text: {
    top: 32,
    left: 104,
    color: Color.colorBlack,
  },
  addressOverlayItem: {
    top: 78,
    left: 15,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhitesmoke_300,
    width: 270,
    height: 110,
    position: "absolute",
  },
  text1: {
    top: 206,
    left: 109,
    color: Color.colorSteelblue,
    width: 83,
    height: 35,
  },
  text2: {
    top: 89,
    left: 25,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorGray_400,
    textAlign: "left",
    width: 234,
    height: 54,
    position: "absolute",
  },
  addressOverlay: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default AddressOverlay;
