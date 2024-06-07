import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Padding, FontFamily, Color, Border } from "../GlobalStyles";

const UserPage31 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.userPage32}>
      <Pressable
        style={styles.goBackButton}
        onPress={() => navigation.navigate("UserPage")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/go-back-button.png")}
        />
      </Pressable>
      <View style={styles.tabBar}>
        <Pressable
          style={styles.tabFlexBox}
          onPress={() => navigation.navigate("UserPage3")}
        >
          <Text style={[styles.page1, styles.pageTypo]}>宮廟</Text>
        </Pressable>
        <View style={[styles.tabState1, styles.tabFlexBox]}>
          <Text style={[styles.page11, styles.pageTypo]}>商家</Text>
          <View style={styles.tabStateChild} />
        </View>
      </View>
      <View style={styles.tablermoodEmptyParent}>
        <Image
          style={styles.tablermoodEmptyIcon}
          contentFit="cover"
          source={require("../assets/tablermoodempty.png")}
        />
        <Text style={[styles.text, styles.textTypo]}>暫無購買紀錄</Text>
      </View>
      <Image
        style={styles.userPage32Child}
        contentFit="cover"
        source={require("../assets/line-2.png")}
      />
      <Text style={[styles.text1, styles.textTypo]}>歷史訂單</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTypo: {
    textAlign: "center",
    fontSize: FontSize.size_6xl,
  },
  tabFlexBox: {
    alignItems: "center",
    height: 58,
    width: 82,
    justifyContent: "center",
    flexDirection: "row",
  },
  textTypo: {
    display: "flex",
    fontFamily: FontFamily.interRegular,
    alignItems: "center",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  goBackButton: {
    left: '5%',
    top: '5%',
    width: 40,
    height: 40,
    position: "absolute",
  },
  page1: {
    color: Color.colorGray_400,
    textAlign: "center",
    fontSize: FontSize.size_6xl,
    fontFamily: FontFamily.interRegular,
  },
  page11: {
    color: Color.colorOrange,
    zIndex: 0,
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    fontSize: FontSize.size_6xl,
  },
  tabStateChild: {
    marginLeft: -41,
    top: 45,
    backgroundColor: Color.colorOrange,
    width: 81,
    height: 5,
    zIndex: 1,
    left: "50%",
    position: "absolute",
  },
  tabState1: {
    marginLeft: 50,
  },
  tabBar: {
    marginLeft: -130,
    top: '12%',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: "row",
    left: "50%",
    position: "absolute",
  },
  tablermoodEmptyIcon: {
    top: -30,
    left: 65,
    width: 60,
    height: 60,
    position: "absolute",
  },
  text: {
    marginLeft: -100,
    top: 41,
    height: 100,
    width: 200,
    textAlign: "center",
    fontSize: FontSize.size_6xl,
    color: Color.colorGray_400,
    justifyContent: "center",
    display: "flex",
    left: "50%",
  },
  tablermoodEmptyParent: {
    top: 366,
    left: 115,
    height: 141,
    width: 200,
    position: "absolute",
  },
  userPage32Child: {
    top: '20%',
    left: 0,
    width: '100%',
    height: 1,
    position: "absolute",
  },
  text1: {
    top: '7%',
    left: '38%',
    fontSize: 30,
    color: Color.colorBlack,
    textAlign: "center",
    width: 120,
    height: 77,
  },
  userPage32: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default UserPage31;
