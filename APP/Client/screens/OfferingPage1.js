import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const OfferingPage1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.offeringPage5}>
      <View style={[styles.view, styles.viewLayout]}>
        <View style={[styles.child, styles.childPosition]} />
        <Image
          style={[styles.counterIcon, styles.counterIconLayout]}
          contentFit="cover"
          source={require("../assets/counter2.png")}
        />
        <Image
          style={styles.item}
          contentFit="cover"
          source={require("../assets/rectangle-112.png")}
        />
        <Text style={styles.text}>
          <Text style={styles.txt}>
            <Text style={styles.text1}>{`開運吊飾

`}</Text>
            <Text style={styles.text2}>捐贈數量</Text>
          </Text>
        </Text>
        <Image
          style={[styles.tickBoxIcon, styles.tickIconLayout]}
          contentFit="cover"
          source={require("../assets/tick-box.png")}
        />
      </View>
      <View style={[styles.view1, styles.viewLayout]}>
        <View style={[styles.inner, styles.childPosition]} />
        <Image
          style={[styles.counterIcon1, styles.tickIconLayout]}
          contentFit="cover"
          source={require("../assets/counter1.png")}
        />
        <Image
          style={styles.rectangleIcon}
          contentFit="cover"
          source={require("../assets/rectangle-111.png")}
        />
        <Text style={[styles.text3, styles.textLayout]}>
          <Text style={styles.text1}>{`光明燈

`}</Text>
          <Text style={styles.text2}>捐贈數量</Text>
        </Text>
      </View>
      <View style={[styles.view1, styles.viewLayout]}>
        <View style={[styles.inner, styles.childPosition]} />
        <Image
          style={[styles.counterIcon1, styles.tickIconLayout]}
          contentFit="cover"
          source={require("../assets/counter1.png")}
        />
        <Image
          style={styles.rectangleIcon}
          contentFit="cover"
          source={require("../assets/rectangle-111.png")}
        />
        <Text style={[styles.text6, styles.textLayout]}>
          <Text style={styles.text1}>{`光明燈

`}</Text>
          <Text style={styles.text2}>捐贈數量</Text>
        </Text>
        <Image
          style={[styles.tickBoxIcon1, styles.tickIconLayout]}
          contentFit="cover"
          source={require("../assets/tick-box.png")}
        />
      </View>
      <Pressable style={styles.crossIcon} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/cross-icon.png")}
        />
      </Pressable>
      <Text style={[styles.text9, styles.textTypo]}> 捐贈選擇</Text>
      <Pressable
        style={[styles.confirmOrder, styles.confirmLayout]}
        onPress={() => navigation.navigate("OfferingPage2")}
      >
        <Image
          style={[styles.confirmOrderChild, styles.confirmLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-92.png")}
        />
        <Text style={[styles.text10, styles.confirmLayout]}>送出訂單</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 140,
    width: 430,
    left: 0,
    position: "absolute",
  },
  childPosition: {
    borderColor: Color.colorWhitesmoke_300,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    top: 0,
    height: 140,
    width: 430,
    left: 0,
    position: "absolute",
  },
  counterIconLayout: {
    width: 140,
    left: 281,
  },
  tickIconLayout: {
    height: 40,
    position: "absolute",
  },
  textLayout: {
    width: 210,
    height: 100,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    alignItems: "center",
    display: "flex",
    left: 0,
  },
  confirmLayout: {
    height: 70,
    width: 360,
    position: "absolute",
  },
  child: {
    borderBottomWidth: 3,
  },
  counterIcon: {
    top: 85,
    height: 43,
    position: "absolute",
  },
  item: {
    height: 108,
    width: 100,
    left: 63,
    top: 16,
    position: "absolute",
  },
  text1: {
    fontSize: FontSize.size_6xl,
  },
  text2: {
    fontSize: FontSize.size_4xl,
  },
  txt: {
    width: "100%",
  },
  text: {
    width: 247,
    height: 109,
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    color: Color.colorBlack,
    left: 174,
    top: 16,
    position: "absolute",
  },
  tickBoxIcon: {
    top: 50,
    width: 40,
    left: 13,
    height: 40,
  },
  view: {
    top: 271,
  },
  inner: {
    borderWidth: 3,
  },
  counterIcon1: {
    top: 80,
    width: 140,
    left: 281,
  },
  rectangleIcon: {
    top: 22,
    height: 100,
    width: 100,
    left: 63,
    position: "absolute",
  },
  text3: {
    top: 25,
    left: 181,
  },
  view1: {
    top: 131,
  },
  text6: {
    top: 24,
    left: 174,
    width: 210,
  },
  tickBoxIcon1: {
    top: 60,
    width: 40,
    left: 13,
    height: 40,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  crossIcon: {
    left: 375,
    top: 72,
    width: 30,
    height: 30,
    position: "absolute",
  },
  text9: {
    top: 51,
    fontSize: FontSize.size_16xl,
    height: 80,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: 430,
    position: "absolute",
  },
  confirmOrderChild: {
    borderRadius: Border.br_xl,
    top: 0,
    width: 360,
    left: 0,
  },
  text10: {
    fontSize: FontSize.size_11xl,
    color: Color.colorWhite,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    alignItems: "center",
    display: "flex",
    left: 0,
    top: 0,
    width: 360,
  },
  confirmOrder: {
    top: 828,
    left: 33,
  },
  offeringPage5: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default OfferingPage1;
