{/* 用於HomePage地址設定，亦可用於OfferingPage */}
import * as React from "react";
import { View, StyleSheet, Text, TextInput, Pressable } from "react-native";
import { FontFamily, FontSize, Border, Color } from "../GlobalStyles";

const AddressOverlay = ({ onClose, onSubmit }) => {
  const [address, setAddress] = React.useState("");

  return (
    <View style={[styles.addressOverlay, styles.addressLayout]}>

      <View style={[styles.addressOverlayChild, styles.addressLayout]} />
      {/* 標題 */}
      <Text style={[styles.text, styles.textTypo]}>修改地址</Text>

      {/* 地址輸入框 */}
      <TextInput
        style={styles.addressInput}
        placeholder="輸入新地址"
        value={address}
        onChangeText={setAddress}
      />

      {/* 確認、取消按鈕，傳送至HomePage.js */}
      <Pressable style={styles.submitButton} onPress={() => onSubmit(address)}>
        <Text style={styles.submitButtonText}>確認</Text>
      </Pressable>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>取消</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addressLayout: {
    height: 230,
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
  addressInput: {
    top: 78,
    left: 15,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhitesmoke_300,
    width: 270,
    height: 60,
    paddingHorizontal: 10,
    position: "absolute",
  },
  submitButton: {
    top: 180,
    left: 109,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSteelblue,
    width: 83,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  submitButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interMedium,
  },
  closeButton: {
    top: 180,
    left: 204,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGray_400,
    width: 83,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  closeButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.interMedium,
  },
  addressOverlay: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default AddressOverlay;
