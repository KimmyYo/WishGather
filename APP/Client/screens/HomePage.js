import React, { useState, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView, Text, TextInput, Pressable, Modal, Dimensions } from "react-native";
import { Image } from "expo-image";
import AddressOverlay from "../components/AddressOverlay";
import TempleDistance from "../components/TempleDistance";
import Footer from "../components/Footer";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily, Padding } from "../GlobalStyles";

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const [locationIconVisible, setLocationIconVisible] = useState(false);
  const [text1Visible, setText1Visible] = useState(false);
  const [mageeditIconVisible, setMageeditIconVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.homePage}>

        {/* 地點設定欄位 */}
        <View style={styles.locationContainer}>
          <Pressable style={styles.locationIcon} onPress={openLocationIcon}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/location-icon.png")} />
          </Pressable>

          <Pressable style={styles.pressable} onPress={openText1}>
            <Text style={styles.text1}>             
                <Text style={styles.text2}>當前位置: 高雄市鼓山區蓮海路</Text>
                <Text style={styles.text3}>70</Text>
                <Text style={styles.text2}>號</Text>
            </Text>
          </Pressable>

          <Pressable style={styles.mageedit} onPress={openMageeditIcon}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/mageedit.png")} />
          </Pressable>
        </View>

        {/* 搜尋欄位 */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="搜尋(Ex:左營金鑾殿)" style={styles.input}
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

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
    overflow: 'hidden',
  },
  homePage: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  locationIcon: {
    width: 30,
    height: 30,
  },
  text1: {
    color: "#898989",
    fontSize: FontSize.size_xl,
  },
  text2: {
    width: "100%",
    fontFamily: FontFamily.robotoRegular,
  },
  text3: {
    fontFamily: FontFamily.interRegular,
  },
  mageedit: {
    width: 25,
    height: 25,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  activityContainer: {
    paddingVertical: 10,
    alignItems: "center",
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
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default HomePage;
