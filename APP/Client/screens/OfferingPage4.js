import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import KeyboardOverlay from "../components/KeyboardOverlay";
import Component1 from "../components/Component1";
import { Border, Color, Padding, FontSize, FontFamily } from "../GlobalStyles";

const OfferingPage4 = () => {
  const [searchBarContainerVisible, setSearchBarContainerVisible] =
    useState(false);
  const navigation = useNavigation();

  const openSearchBarContainer = useCallback(() => {
    setSearchBarContainerVisible(true);
  }, []);

  const closeSearchBarContainer = useCallback(() => {
    setSearchBarContainerVisible(false);
  }, []);

  return (
    <>
      <View style={styles.offeringPage1}>
        <View style={[styles.footer, styles.menuLayout]}>
          <View style={[styles.menu, styles.menuLayout]}>
            <View style={[styles.homeIconParent, styles.parentFlexBox]}>
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
              <Image
                style={[styles.templeIcon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/temple-icon1.png")}
              />
              <Pressable
                style={[styles.templeIcon, styles.iconLayout]}
                onPress={() => navigation.navigate("CartPage")}
              >
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/shopping-bag-icon.png")}
                />
              </Pressable>
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
          style={[styles.offeringPage1Child, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-3.png")}
        />
        <Pressable style={styles.searchBar} onPress={openSearchBarContainer}>
          <View style={[styles.searchBarChild, styles.childPosition]} />
          <Text style={[styles.text, styles.textFlexBox]}>搜尋</Text>
          <Image
            style={[styles.searchIcon, styles.childLayout]}
            contentFit="cover"
            source={require("../assets/search-icon.png")}
          />
        </Pressable>
        <View style={[styles.parent, styles.parentFlexBox]}>
          <Pressable
            style={styles.pressable}
            onPress={() => navigation.navigate("OfferingPage6")}
          >
            <Image
              style={[styles.child, styles.childPosition]}
              contentFit="cover"
              source={require("../assets/rectangle-19.png")}
            />
            <View style={[styles.item, styles.childPosition]} />
            <Text style={[styles.text1, styles.textFlexBox]}>線上點燈</Text>
          </Pressable>
          <Component1
            rectangle19={require("../assets/rectangle-191.png")}
            prop="金紙香品"
          />
          <Component1
            rectangle19={require("../assets/rectangle-192.png")}
            prop="生鮮蔬果"
            propBackgroundColor="#fff"
            propFontFamily="Roboto-Regular"
          />
          <Component1
            rectangle19={require("../assets/rectangle-193.png")}
            prop="精緻糕點"
            propBackgroundColor="unset"
            propFontFamily="Roboto-Regular"
          />
          <Component1
            rectangle19={require("../assets/rectangle-194.png")}
            prop="餅乾糖果"
            propBackgroundColor="unset"
            propFontFamily="Roboto-Regular"
          />
          <Component1
            rectangle19={require("../assets/rectangle-195.png")}
            prop="解渴飲品"
            propBackgroundColor="unset"
            propFontFamily="Roboto-Regular"
          />
          <Component1
            rectangle19={require("../assets/rectangle-196.png")}
            prop="文創周邊"
            propBackgroundColor="unset"
            propFontFamily="Inter-Regular"
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={searchBarContainerVisible}
      >
        <View style={styles.searchBarContainerOverlay}>
          <Pressable
            style={styles.searchBarContainerBg}
            onPress={closeSearchBarContainer}
          />
          <KeyboardOverlay onClose={closeSearchBarContainer} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuLayout: {
    height: 66,
    position: "absolute",
  },
  parentFlexBox: {
    flexDirection: "row",
    position: "absolute",
  },
  iconLayout: {
    height: 40,
    width: 40,
  },
  childLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  childPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  textFlexBox: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
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
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_smi,
    overflow: "hidden",
  },
  menu: {
    top: 0,
    left: 0,
    width: 355,
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
  offeringPage1Child: {
    height: "1.07%",
    width: "2.33%",
    top: "94.85%",
    right: "58.14%",
    bottom: "4.08%",
    left: "39.53%",
    position: "absolute",
  },
  searchBarContainerOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  searchBarContainerBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  searchBarChild: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorWhitesmoke_300,
    top: "0%",
    height: "100%",
  },
  text: {
    width: "78.95%",
    left: "17.89%",
    fontSize: FontSize.size_6xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDarkgray_100,
    textAlign: "left",
    top: "0%",
    height: "100%",
  },
  searchIcon: {
    height: "66.67%",
    width: "10.53%",
    top: "16.67%",
    right: "85.53%",
    bottom: "16.67%",
    left: "3.95%",
    position: "absolute",
  },
  searchBar: {
    height: "6.44%",
    width: "88.37%",
    top: "6.97%",
    right: "5.58%",
    bottom: "86.59%",
    left: "6.05%",
    position: "absolute",
  },
  child: {
    borderRadius: Border.br_3xs,
    top: "0%",
    height: "100%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  item: {
    height: "26.69%",
    top: "73.31%",
    borderBottomRightRadius: Border.br_3xs,
    borderBottomLeftRadius: Border.br_3xs,
    borderStyle: "solid",
    borderColor: Color.colorLightgray,
    borderWidth: 2,
    backgroundColor: Color.colorWhite,
    bottom: "0%",
    right: "0%",
  },
  text1: {
    height: "12%",
    width: "48%",
    top: "84%",
    left: "26%",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorBlack,
    textAlign: "center",
    justifyContent: "center",
  },
  pressable: {
    width: 160,
    height: 160,
  },
  parent: {
    top: 160,
    left: 44,
    width: 357,
    height: 671,
    flexWrap: "wrap",
  },
  offeringPage1: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default OfferingPage4;
