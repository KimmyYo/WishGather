import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily, Padding } from "../GlobalStyles";
import TempleCard from "../components/TempleCard";

const OfferingPage6 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.offeringPage2}>

      {/*標題*/}
      <Text style={[styles.text24, styles.textFlexBox]}>線上點燈</Text>

      {/*返回鍵*/}
      <Pressable
        style={[styles.goBackButton, styles.iconLayout]}
        onPress={() => navigation.navigate("OfferingPage4")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/go-back-button.png")}
        />
      </Pressable>

      {/*TempleCard onpress會對應到該廟宇的有關線上點燈的商品頁面*/}
      <ScrollView style={styles.offeringPage2Inner}>
        <View style={[styles.parent, styles.menuPosition]}>
          <TempleCard
            imageSource={require("../assets/rectangle-214.png")}
            title={`大甲 鎮瀾宮媽祖廟`}
            distance="222公里"
            savedStateSource={require("../assets/saved-state1.png")}
            onPress={() => navigation.navigate("OfferingPage5")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-215.png")}
            title={`左營 仁濟宮`}
            distance="11公里"
            savedStateSource={require("../assets/saved-state2.png")}
            onPress={() => navigation.navigate("OfferingPage5")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-216.png")}
            title={`鳳邑 雷府大將廟`}
            distance="12公里"
            savedStateSource={require("../assets/saved-state2.png")}
            onPress={() => navigation.navigate("OfferingPage5")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-217.png")}
            title={`左營 金鑾殿`}
            distance="12公里"
            savedStateSource={require("../assets/saved-state2.png")}
            onPress={() => navigation.navigate("OfferingPage5")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-218.png")}
            title={`朝元宮 鐵路媽祖`}
            distance="8.2公里"
            savedStateSource={require("../assets/saved-state2.png")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-219.png")}
            title={`東照山 關帝廟`}
            distance="24公里"
            savedStateSource={require("../assets/saved-state2.png")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-2110.png")}
            title={`府城 三山國王廟`}
            distance="34公里"
            savedStateSource={require("../assets/saved-state2.png")}
          />
          <TempleCard
            imageSource={require("../assets/rectangle-2111.png")}
            title={`車城 福安宮`}
            distance="82公里"
            savedStateSource={require("../assets/saved-state1.png")}
          />
        </View>
      </ScrollView>

      <View style={[styles.footer, styles.menuLayout]}>
        <View style={[styles.menu, styles.menuLayout]}>
          <View style={styles.homeIconParent}>
            <Pressable
              style={styles.iconLayout}
              onPress={() => navigation.navigate("HomePage")}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/home-icon1.png")}
              />
            </Pressable>
            <Pressable
              style={[styles.templeIcon, styles.iconLayout]}
              onPress={() => navigation.navigate("OfferingPage4")}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/temple-icon1.png")}
              />
            </Pressable>
            <Image
              style={[styles.templeIcon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/shopping-bag-icon.png")}
            />
            <Pressable
              style={[styles.templeIcon, styles.iconLayout]}
              onPress={() => navigation.navigate("UserPage")}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/user-icon.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <Image
        style={[styles.offeringPage2Child, styles.itemLayout]}
        contentFit="cover"
        source={require("../assets/ellipse-3.png")}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    height: 40,
    width: 40,
  },
  menuPosition: {
    left: 0,
    top: 0,
  },
  itemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  savedIconPosition: {
    bottom: "7.27%",
    top: "57.73%",
    height: "35%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  view4Layout: {
    height: 110,
    width: 420,
  },
  menuLayout: {
    height: 66,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  goBackButton: {
    left: '5%',
    top: '6%',
    width: 40,
    height: 40,
    position: "absolute",
  },
  child: {
    height: "109.09%",
    top: "0%",
    right: "0%",
    bottom: "-9.09%",
    left: "0%",
    borderStyle: "solid",
    borderColor: Color.colorDarkgray_100,
    borderBottomWidth: 1,
    borderRadius: Border.br_8xs,
    position: "absolute",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
  item: {
    width: "28.21%",
    right: "68.98%",
    left: "2.81%",
    bottom: "6.73%",
    top: "6.91%",
    height: "86.36%",
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: Border.br_8xs,
  },
  text1: {
    fontSize: FontSize.size_8xl,
    color: Color.colorBlack,
  },
  text2: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_400,
  },
  text: {
    width: "60.02%",
    fontFamily: FontFamily.interRegular,
    left: "35.12%",
    top: "13.91%",
    height: "85.91%",
    textAlign: "left",
  },
  savedStateIcon: {
    width: "8.98%",
    right: "3.83%",
    left: "87.19%",
  },
  rectangleIcon: {
    width: "28.19%",
    right: "68.97%",
    left: "2.83%",
    bottom: "6.73%",
    top: "6.91%",
    height: "86.36%",
    maxHeight: "100%",
    maxWidth: "100%",
    borderRadius: Border.br_8xs,
  },
  text3: {
    width: "60%",
    fontFamily: FontFamily.interRegular,
    left: "35.12%",
    top: "13.91%",
    height: "85.91%",
    textAlign: "left",
  },
  savedStateIcon1: {
    width: "8.97%",
    right: "3.85%",
    left: "87.18%",
  },
  text7: {
    fontSize: FontSize.size_6xl,
    color: Color.colorBlack,
  },
  view4: {
    backgroundColor: Color.colorWhite,
  },
  text19: {
    fontSize: FontSize.size_9xl,
    color: Color.colorBlack,
  },
  parent: {
    height: 670,
    alignItems: "center",
    position: "absolute",
  },
  offeringPage2Inner: {
    top: 151,
    left: 5,
    height: 780,
    width: 420,
    position: "absolute",
  },
  templeIcon: {
    marginLeft: 41,
  },
  homeIconParent: {
    marginTop: -33,
    marginLeft: -177.5,
    top: "50%",
    left: "50%",
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhitesmoke_100,
    flexDirection: "row",
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_smi,
    position: "absolute",
    overflow: "hidden",
  },
  menu: {
    width: 355,
    left: 0,
    top: 0,
  },
  footer: {
    top: 831,
    left: 38,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    width: 383,
  },
  offeringPage2Child: {
    height: "1.07%",
    width: "2.33%",
    top: "94.85%",
    right: "58.14%",
    bottom: "4.08%",
    left: "39.53%",
  },
  text24: {
    top: '6%',
    left: 70,
    fontSize: FontSize.size_11xl,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    display: "flex",
    width: 195,
    height: 58,
    color: Color.colorBlack,
    alignItems: "center",
  },
  offeringPage2: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default OfferingPage6;
