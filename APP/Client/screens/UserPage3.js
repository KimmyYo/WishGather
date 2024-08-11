import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import TabBar from "../components/TabBar";

import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const UserPage3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.userPage31}>
      <Pressable
        style={[styles.goBackButton, styles.pressablePosition]}
        onPress={() => navigation.navigate("UserPage")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/go-back-button.png")}
        />
      </Pressable>
      <TabBar onTabStatePress={() => navigation.navigate("UserPage31")} />
      <Image
        style={styles.userPage31Child}
        contentFit="cover"
        source={require("../assets/line-4.png")}
      />
      <Text style={[styles.text, styles.textTypo]}>歷史訂單</Text>
      <Pressable
        style={[styles.pressable, styles.pressablePosition]}
        onPress={() => navigation.navigate("HomePage5")}
      >
        <View style={styles.child} />
        <Image
          style={[styles.item, styles.itemLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-211.png")}
        />
        <Text style={[styles.text1, styles.textTypo]}>
          <Text style={styles.text2}>{`左營 仁濟宮 
`}</Text>
          <Text style={styles.text3}>
            <Text style={styles.text4}>{`3 項捐贈品
2024/04/25 · `}</Text>
            <Text style={styles.text5}>待取貨</Text>
          </Text>
        </Text>
          <Image
            style={[styles.savedStateIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/saved-state.png")}
          />
      </Pressable>
      
      {/* <Component
        rectangle21={require("../assets/rectangle-212.png")}
        prop={`鳳邑 雷府大將廟 
`}
        prop1={`2 項捐贈品
2024/04/20 · 已完成`}
        savedStateIcon={false}
        onPressablePress={() => navigation.navigate("HomePage5")}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  pressablePosition: {
    left: 20,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  itemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
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
  userPage31Child: {
    top: '20%',
    left: 0,
    width: '100%',
    height: 1,
    position: "absolute",
  },
  text: {
    top: '7%',
    left: '38%',
    fontSize: FontSize.size_11xl,
    display: "flex",
    alignItems: "center",
    width: 120,
    height: 77,
    color: Color.colorBlack,
  },
  child: {
    height: "109.08%",
    top: "0%",
    right: "0%",
    bottom: "-9.08%",
    left: "0%",
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_100,
    borderBottomWidth: 1,
    borderRadius: Border.br_8xs,
    position: "absolute",
    width: "100%",
  },
  item: {
    height: "86.33%",
    width: "28.21%",
    top: "6.92%",
    right: "68.97%",
    bottom: "6.75%",
    left: "2.82%",
    borderRadius: Border.br_8xs,
  },
  text2: {
    fontSize: FontSize.size_8xl,
    color: Color.colorBlack,
  },
  text4: {
    color: Color.colorGray_400,
  },
  text5: {
    color: "#bd0202",
  },
  text3: {
    fontSize: FontSize.size_xl,
  },
  text1: {
    height: "85.92%",
    width: "60.03%",
    top: "13.92%",
    left: "35.13%",
  },
  savedStateIcon: {
    height: "35%",
    width: "8.97%",
    top: "57.75%",
    right: "3.85%",
    bottom: "7.25%",
    left: "87.18%",
    display: "none",
  },
  pressable: {
    top: 200,
    width: 390,
    height: 120,
  },
  userPage31: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default UserPage3;
