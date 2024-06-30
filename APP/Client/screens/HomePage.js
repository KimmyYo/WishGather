import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, Text, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import KeyboardOverlay from "../components/KeyboardOverlay";
import AddressOverlay from "../components/AddressOverlay";
import TempleDistance from "../components/TempleDistance";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

const HomePage = () => {
  const [searchBarContainerVisible, setSearchBarContainerVisible] = useState(false);
  const [locationIconVisible, setLocationIconVisible] = useState(false);
  const [text1Visible, setText1Visible] = useState(false);
  const [mageeditIconVisible, setMageeditIconVisible] = useState(false);
  const navigation = useNavigation();

  const openSearchBarContainer = useCallback(() => {
    setSearchBarContainerVisible(true);
  }, []);

  const closeSearchBarContainer = useCallback(() => {
    setSearchBarContainerVisible(false);
  }, []);

  const openLocationIcon = useCallback(() => {
    setLocationIconVisible(true);
  }, []);

  const closeLocationIcon = useCallback(() => {
    setLocationIconVisible(false);
  }, []);

  const openText1 = useCallback(() => {
    setText1Visible(true);
  }, []);

  const closeText1 = useCallback(() => {
    setText1Visible(false);
  }, []);

  const openMageeditIcon = useCallback(() => {
    setMageeditIconVisible(true);
  }, []);

  const closeMageeditIcon = useCallback(() => {
    setMageeditIconVisible(false);
  }, []);

  return (
    <>
      <View style={styles.homePage}>
        
        {/* 宮廟搜尋欄位 輸入>>連接資料庫查詢>>顯示宮廟在ScrollView那裏 */}
        <Pressable style={[styles.searchBar, styles.searchLayout]} onPress={openSearchBarContainer}>
          <View style={styles.searchBarChild} />
          <Text style={styles.text}>搜尋</Text>
          <Image
            style={styles.searchIcon}
            contentFit="cover"
            source={require("../assets/search-icon.png")}
          />
        </Pressable>

        {/* footer */}
        <View style={styles.footer}>
          <View style={styles.menu}>
            <View style={styles.homeIconParent}>
              <Image style={styles.iconLayout} contentFit="cover" source={require("../assets/home-icon.png")} />
              <Image style={styles.iconLayout} contentFit="cover" source={require("../assets/temple-icon.png")} />
              <Pressable onPress={() => navigation.navigate("CartPage")}>
                <Image style={styles.iconLayout} contentFit="cover" source={require("../assets/shopping-bag-icon.png")} />
              </Pressable>
              <Image style={styles.iconLayout} contentFit="cover" source={require("../assets/user-icon.png")} />
            </View>
          </View>
          <Image
            style={styles.footerChild}
            contentFit="cover"
            source={require("../assets/ellipse-3.png")}
          />
        </View>

        {/* 地點設定欄位 */}
        <Pressable style={styles.locationIcon} onPress={openLocationIcon}>
          <Image style={styles.icon} contentFit="cover" source={require("../assets/location-icon.png")} />
        </Pressable>
        <Pressable style={styles.pressable} onPress={openText1}>
          <Text style={styles.text1}>
            <Text style={styles.txt}>
              <Text style={styles.text2}>當前位置: 高雄市鼓山區蓮海路</Text>
              <Text style={styles.text3}>70</Text>
              <Text style={styles.text2}>號</Text>
            </Text>
          </Text>
        </Pressable>
        <Pressable style={styles.mageedit} onPress={openMageeditIcon}>
          <Image style={styles.icon} contentFit="cover" source={require("../assets/mageedit.png")} />
        </Pressable>

        {/* 顯示距離最近的宮廟處，連接資料庫(?) */}
        <ScrollView contentContainerStyle={styles.activityContainer}>
          <TempleDistance
            imageSource={require("../assets/rectangle-2.png")}
            description="左營仁濟宮 燈花供養祈福"
            distance="11公里"
            onPress={() => navigation.navigate("HomePage1")}
          />
          <TempleDistance
            imageSource={require("../assets/rectangle-21.png")}
            description="鳳邑雷府大將廟 犒軍儀式"
            distance=""
            onPress={() => navigation.navigate("HomePage1")}
          />
          <TempleDistance
            imageSource={require("../assets/rectangle-22.png")}
            description="左營金鑾殿 工地動土科儀"
            distance=""
            onPress={() => navigation.navigate("HomePage1")}
          />
          <TempleDistance
            imageSource={require("../assets/rectangle-2.png")}
            description="府城三山國王廟 巾山國王聖壽"
            distance="34公里"
            onPress={() => navigation.navigate("HomePage1")}
          />
        </ScrollView>
      </View>

      <Modal animationType="fade" transparent visible={searchBarContainerVisible}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBg} onPress={closeSearchBarContainer} />
          <KeyboardOverlay onClose={closeSearchBarContainer} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={locationIconVisible}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBg} onPress={closeLocationIcon} />
          <AddressOverlay onClose={closeLocationIcon} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={text1Visible}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBg} onPress={closeText1} />
          <AddressOverlay onClose={closeText1} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={mageeditIconVisible}>
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBg} onPress={closeMageeditIcon} />
          <AddressOverlay onClose={closeMageeditIcon} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  searchLayout: {
    height: 60,
    width: 380,
    position: "absolute",
    top: 127,
    left: 25,
  },
  text: {
    left: 68,
    fontSize: FontSize.size_6xl,
    color: Color.colorDarkgray_100,
    width: 300,
    fontFamily: FontFamily.interRegular,
    top: 0,
    position: "absolute",
  },
  searchIcon: {
    top: 10,
    left: 15,
    position: "absolute",
  },
  searchBarChild: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorWhitesmoke_300,
    height: 60,
    width: 380,
    position: "absolute",
  },
  footer: {
    height: 66,
    width: 355,
    position: "absolute",
    top: 831,
    left: 38,
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
  footerChild: {
    height: "15.15%",
    width: "2.82%",
    top: "80.3%",
    right: "82.82%",
    bottom: "4.55%",
    left: "14.37%",
  },
  locationIcon: {
    left: 26,
    top: 65,
    width: 30,
    height: 30,
    position: "absolute",
  },
  pressable: {
    left: 61,
    top: 73,
    position: "absolute",
  },
  text1: {
    color: "#898989",
    width: 321,
    fontSize: FontSize.size_xl,
    height: 30,
  },
  txt: {
    width: "100%",
  },
  text2: {
    fontFamily: FontFamily.robotoRegular,
  },
  text3: {
    fontFamily: FontFamily.interRegular,
  },
  mageedit: {
    left: 382,
    width: 25,
    height: 25,
    top: 73,
    position: "absolute",
  },
  activityContainer: {
    alignItems: "center",
    paddingVertical: 10,
    top:'18%'
  },
  homePage: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  overlayBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
});

export default HomePage;
