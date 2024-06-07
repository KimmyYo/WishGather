import * as React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const LogoutOverlay = ({ onClose }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.logoutOverlay}>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <Text style={[styles.text, styles.textFlexBox]}>
          確定要登出此裝置嗎?
        </Text>
        <Text style={[styles.text1, styles.textFlexBox]}>登出提示</Text>
      </View>
      <Pressable
        style={styles.groupParent}
        onPress={() => navigation.navigate("UserPage1")}
      >
        <View style={[styles.vectorParent, styles.textGroupLayout]}>
          <Image
            style={[styles.groupItem, styles.textGroupLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-17.png")}
          />
          <Pressable
            style={[styles.pressable, styles.textParentPosition]}
            onPress={() => navigation.navigate("UserPage")}
          >
            <Text style={[styles.text2, styles.textGroupLayout]}>取消</Text>
          </Pressable>
        </View>
        <View style={[styles.rectangleGroup, styles.textGroupLayout]}>
          <View style={[styles.groupInner, styles.textGroupLayout]} />
          <Text style={[styles.text3, styles.textGroupLayout]}>確定</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 220,
    width: 350,
  },
  groupPosition: {
    backgroundColor: Color.colorWhitesmoke_400,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    position: "absolute",
  },
  textFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_4xl,
  },
  textGroupLayout: {
    width: 175,
    height: 59,
  },
  textParentPosition: {
    left: 0,
    position: "absolute",
  },
  groupChild: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    height: 220,
    width: 350,
  },
  text: {
    top: 45,
    color: Color.colorGray_400,
    height: 125,
    fontFamily: FontFamily.interRegular,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_4xl,
    left: 0,
    position: "absolute",
    width: 350,
  },
  text1: {
    top: 12,
    left: 62,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorBlack,
    width: 227,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_4xl,
    position: "absolute",
  },
  rectangleParent: {
    left: 0,
    position: "absolute",
    top: 0,
  },
  groupItem: {
    borderRadius: Border.br_xl,
    width: 175,
    left: 0,
    top: 0,
    position: "absolute",
  },
  text2: {
    color: "#cf0b0b",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_4xl,
    fontFamily: FontFamily.interRegular,
  },
  pressable: {
    top: 0,
  },
  vectorParent: {
    left: 0,
    position: "absolute",
    top: 0,
  },
  groupInner: {
    backgroundColor: Color.colorWhitesmoke_400,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    position: "absolute",
  },
  text3: {
    color: Color.colorSteelblue,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_4xl,
    fontFamily: FontFamily.interRegular,
    left: 0,
    position: "absolute",
    top: 0,
  },
  rectangleGroup: {
    left: 175,
    top: 0,
    position: "absolute",
    width: 175,
  },
  groupParent: {
    top: 157,
    height: 59,
    left: 0,
    position: "absolute",
    width: 350,
  },
  logoutOverlay: {
    height: 209,
    maxWidth: "100%",
    maxHeight: "100%",
    width: 350,
  },
});

export default LogoutOverlay;
