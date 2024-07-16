import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, Padding } from "../GlobalStyles";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.footer, styles.menuLayout]}>
      <View style={[styles.menu, styles.menuLayout]}>

        <View style={styles.homeIconParent}>
          <Pressable style={styles.iconLayout} onPress={() => navigation.navigate("HomePage")}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/home-icon1.png")} />
          </Pressable>

          <Pressable style={[styles.templeIcon, styles.iconLayout]} onPress={() => navigation.navigate("OfferingPage4")}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/temple-icon1.png")} />
          </Pressable>

          <Pressable style={[styles.templeIcon, styles.iconLayout]} onPress={() => navigation.navigate("CartPage")}>
            <Image style={[styles.icon, styles.iconLayout]} contentFit="cover" source={require("../assets/shopping-bag-icon.png")} />
          </Pressable>

          <Pressable style={[styles.templeIcon, styles.iconLayout]} onPress={() => navigation.navigate("UserPage")}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/user-icon.png")} />
          </Pressable>

          
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    zIndex: 20,
  },

  footerChild: {
    height: 15,
    width: 15,
    top: "80.3%",
    right: "82.82%",
    bottom: "4.55%",
    left: "14.37%",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "none",
    position: "absolute",
    overflow: "hidden",
  },
  menu: {
    width: '80%',
    left: '10%',
    buttom:10
  },
  menuLayout: {
    height: 66,
    position: "absolute",
  },
  homeIconParent: {
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhitesmoke_100,
    flexDirection: "row",
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_smi,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconLayout: {
    height: 40,
    width: 40,
  },
  templeIcon: {
    marginLeft: 41,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default Footer;
