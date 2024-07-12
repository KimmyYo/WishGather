import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView, Text, TextInput, KeyboardAvoidingView, Platform, Pressable, Modal } from "react-native";
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
  const [searchText, setSearchText] = useState(""); {/* 紀錄搜尋內容 */}
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
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}></KeyboardAvoidingView>

       <View style={styles.homePage} keyboardShouldPersistTaps="handled">

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

        {/* 搜尋欄位 */}
        <View style={[styles.inputContainer, styles.searchLayout] }>
              <TextInput placeholder="搜尋" style={styles.input}
                value={searchText}
                onChangeText={setSearchText} />
        </View>
      

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

      {/* footer */}
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
                source={require("../assets/home-icon.png")}
              />
            </Pressable>
            <Pressable
              style={[styles.templeIcon, styles.iconLayout]}
              onPress={() => navigation.navigate("OfferingPage4")}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/temple-icon.png")}
              />
            </Pressable>

            <Pressable
              style={[styles.templeIcon, styles.iconLayout]}
              onPress={() => navigation.navigate("CartPage")}
            >
              <Image
              style={[styles.icon, styles.iconLayout]}
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
    </>
  );
};

const styles = StyleSheet.create({
  
  pressable:{
    width:'100%',
  },
  searchLayout: {
    height: 60,
    width: 380,
    position: "absolute",
    top: 127,
    left: 25,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    zIndex:3,
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
 
  menu: {
    width: 355,
    left: 0,
    top: 0,
  },
  menuLayout: {
    height: 66,
    position: "absolute",
  },
  iconLayout: {
    height: 40,
    width: 40,
  },
  templeIcon: {
    marginLeft: 41,
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
    zIndex: 20,
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
  icon:{
    width:'100%',
    height:'100%',
  },
  locationIcon: {
    left: 26,
    top: 65,
    width: 30,
    height: 30,
    position: "absolute",
  },
  text1: {
    color: "#898989",
    width: 321,
    height: 30,
    fontSize: FontSize.size_xl,
    textAlign: 'center',
    position:'absolute',
    top: 70,
    left:'15%'
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
