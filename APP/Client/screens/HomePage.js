import React, { useState, useCallback } from "react";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, TextInput, Pressable, Modal, StyleSheet, FlatList, Dimensions } from "react-native";
import { Image } from "expo-image";
import AddressOverlay from "../components/AddressOverlay";
import TempleDistance from "../components/TempleDistance";
// import Footer from "../components/Footer_HomePage";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontSize, FontFamily, Padding } from "../GlobalStyles";
// import Footer from "../components/footer";


const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const [locationIconVisible, setLocationIconVisible] = useState(false);
  const [text1Visible, setText1Visible] = useState(false);
  const [mageeditIconVisible, setMageeditIconVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentAddress, setCurrentAddress] = useState("高雄市鼓山區蓮海路70號");
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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

  const handleAddressSubmit = useCallback((newAddress) => {
    setCurrentAddress(newAddress);
    setLocationIconVisible(false);
    setText1Visible(false);
    setMageeditIconVisible(false);
  }, []);

  const temples = [
    { id: '1', imageSource: require("../assets/rectangle-2.png"), description: "左營仁濟宮 燈花供養祈福", distance: "11公里" },
    { id: '2', imageSource: require("../assets/rectangle-21.png"), description: "鳳邑雷府大將廟 犒軍儀式", distance: "" },
    { id: '3', imageSource: require("../assets/rectangle-22.png"), description: "左營金鑾殿 工地動土科儀", distance: "" },
    { id: '4', imageSource: require("../assets/rectangle-2.png"), description: "府城三山國王廟 巾山國王聖壽", distance: "34公里" },
    // Add more temple data as needed (database)
  ];

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>

        {/* Location */}
        <View style={styles.locationContainer}>
          <Pressable style={styles.locationIcon} onPress={openLocationIcon}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/location-icon.png")} />
          </Pressable>

          <Pressable style={styles.pressable} onPress={openText1}>
            <Text style={styles.text1}>當前位置: {currentAddress}</Text>
          </Pressable>

          <Pressable style={styles.mageedit} onPress={openMageeditIcon}>
            <Image style={styles.icon} contentFit="cover" source={require("../assets/mageedit.png")} />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="搜尋(Ex:左營金鑾殿)"
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Temple */}
        <FlatList
          data={temples}
          renderItem={({ item }) => (
            <TempleDistance
              imageSource={item.imageSource}
              description={item.description}
              distance={item.distance}
              onPress={() => navigation.navigate("HomePage1")}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.activityContainer}
        />

        <Modal animationType="fade" transparent visible={locationIconVisible}>
          <View style={styles.overlay}>
            <Pressable style={styles.overlayBg} onPress={closeLocationIcon} />
            <AddressOverlay onClose={closeLocationIcon} onSubmit={handleAddressSubmit} />
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={text1Visible}>
          <View style={styles.overlay}>
            <Pressable style={styles.overlayBg} onPress={closeText1} />
            <AddressOverlay onClose={closeText1} onSubmit={handleAddressSubmit} />
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={mageeditIconVisible}>
          <View style={styles.overlay}>
            <Pressable style={styles.overlayBg} onPress={closeMageeditIcon} />
            <AddressOverlay onClose={closeMageeditIcon} onSubmit={handleAddressSubmit} />
          </View>
        </Modal>

        {/* Footer */}  
        {/* <Footer /> */}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
  mageedit: {
    width: 25,
    height: 25,
  },
  searchContainer: {
    width: width*0.95,
    height:50,
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
