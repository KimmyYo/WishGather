import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const LightInfoOverlay = ({ onClose }) => {
  return (
    <View style={styles.lightInfoOverlay}>
      <View style={styles.lightInfoOverlayChild} />
      <Text style={styles.text}>確認</Text>
      <View style={styles.parent}>
        <View style={styles.viewLayout}>
          <Image
            style={styles.child}
            contentFit="cover"
            source={require("../assets/rectangle-26.png")}
          />
          <Text style={[styles.text1, styles.textTypo]}>被祈福人</Text>
          <Text style={styles.textPosition}>
            <Text style={styles.txt}>
              <Text style={styles.text3}>{`  `}</Text>
              <Text style={styles.text4}>小猴吱</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.view1, styles.viewLayout]}>
          <Image
            style={styles.child}
            contentFit="cover"
            source={require("../assets/rectangle-261.png")}
          />
          <Text style={[styles.text5, styles.textTypo]}>被祈福人生辰</Text>
          <Text style={[styles.text6, styles.textPosition]}> 2024/01/01</Text>
        </View>
        <View style={[styles.view1, styles.viewLayout]}>
          <Image
            style={styles.child}
            contentFit="cover"
            source={require("../assets/rectangle-261.png")}
          />
          <Text style={[styles.text5, styles.textTypo]}>被祈福人住址</Text>
          <Text style={[styles.text6, styles.textPosition]}>
            {" "}
            高雄市鼓山區蓮海路70號
          </Text>
        </View>
        <View style={[styles.view1, styles.viewLayout]}>
          <Image
            style={styles.child}
            contentFit="cover"
            source={require("../assets/rectangle-261.png")}
          />
          <Text style={[styles.text9, styles.textTypo]}>點燈人連絡電話</Text>
          <Text style={[styles.text6, styles.textPosition]}> 0912345678</Text>
        </View>
      </View>
      <Text style={styles.text11}>備註</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    height: 38,
    textAlign: "left",
    color: Color.colorGray_400,
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xl,
    left: 0,
    top: 0,
    position: "absolute",
  },
  viewLayout: {
    height: 88,
    width: 250,
  },
  textPosition: {
    height: 37,
    top: 44,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorGray_400,
    fontFamily: FontFamily.interRegular,
    width: 250,
    left: 0,
    position: "absolute",
  },
  lightInfoOverlayChild: {
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
    width: 308,
    left: 0,
    top: 0,
    position: "absolute",
    height: 650,
  },
  text: {
    top: 582,
    left: 113,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorSteelblue,
    width: 83,
    height: 35,
    textAlign: "center",
    fontSize: FontSize.size_4xl,
    position: "absolute",
  },
  child: {
    top: 38,
    borderRadius: Border.br_3xs,
    height: 50,
    width: 250,
    left: 0,
    position: "absolute",
  },
  text1: {
    width: 85,
  },
  text3: {
    fontSize: FontSize.size_xl,
  },
  text4: {
    fontSize: FontSize.size_lg,
  },
  txt: {
    width: "100%",
  },
  text5: {
    width: 129,
  },
  text6: {
    fontSize: FontSize.size_xl,
  },
  view1: {
    marginTop: 30,
  },
  text9: {
    width: 182,
  },
  parent: {
    top: 84,
    left: 29,
    position: "absolute",
  },
  text11: {
    top: 23,
    left: 104,
    color: Color.colorBlack,
    justifyContent: "center",
    width: 100,
    height: 34,
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    fontSize: FontSize.size_4xl,
    position: "absolute",
  },
  lightInfoOverlay: {
    width: 300,
    maxWidth: "100%",
    maxHeight: "100%",
    height: 650,
  },
});

export default LightInfoOverlay;
