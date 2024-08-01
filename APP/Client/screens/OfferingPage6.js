import React, { useState, useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, FlatList, SafeAreaView, Dimensions, TextInput, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Color, FontFamily } from "../GlobalStyles";
import TempleCard from "../components/TempleCard";
import Footer from "../components/footer";

const { width } = Dimensions.get('window');

const OfferingPage6 = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const templeCards = [
    {
      id: '1',
      imageSource: require("../assets/rectangle-214.png"),
      title: '大甲 鎮瀾宮媽祖廟',
      distance: "222公里",
    },
    {
      id: '2',
      imageSource: require("../assets/rectangle-215.png"),
      title: '左營 仁濟宮',
      distance: "11公里",
    },
    {
      id: '3',
      imageSource: require("../assets/rectangle-216.png"),
      title: '鳳邑 雷府大將廟',
      distance: "12公里",
    },
    {
      id: '4',
      imageSource: require("../assets/rectangle-217.png"),
      title: '左營 金鑾殿',
      distance: "12公里",
    },
    {
      id: '5',
      imageSource: require("../assets/rectangle-218.png"),
      title: '朝元宮 鐵路媽祖',
      distance: "8.2公里",
    },
    {
      id: '6',
      imageSource: require("../assets/rectangle-219.png"),
      title: '東照山 關帝廟',
      distance: "24公里",
    },
    {
      id: '7',
      imageSource: require("../assets/rectangle-2110.png"),
      title: '府城 三山國王廟',
      distance: "34公里",
    },
    {
      id: '8',
      imageSource: require("../assets/rectangle-2111.png"),
      title: '車城 福安宮',
      distance: "82公里",
    }
  ];

  // Memoize filtered temple cards based on search text
  const filteredTempleCards = useMemo(() => {
    if (!searchText) return templeCards;
    return templeCards.filter(card =>
      card.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, templeCards]);

  const handleSave = (isSaved) => {
    setModalMessage(isSaved ? "已收藏此宮廟" : "已取消收藏此宮廟");
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TempleCard
      imageSource={item.imageSource}
      title={item.title}
      distance={item.distance}
      onSave={handleSave}
      onPress={() => navigation.navigate("OfferingPage5")}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.offeringPage6}>

          {/* Header */}
          <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => navigation.navigate("HomePage")}>
                <Image style={styles.backIcon} source={require("../assets/go-back-button.png")} />
              </Pressable>
              <Text style={styles.headerText}>線上點燈</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="搜尋(Ex:鎮瀾宮)"
              style={styles.input}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {filteredTempleCards.length === 0 ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>查無此公廟 ! 請重新輸入 !</Text>
            </View>
          ) : (
            <FlatList
              data={filteredTempleCards}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContent}
              numColumns={1}
            />
          )}

          <Footer />

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>{modalMessage}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    overflow: 'hidden',
  },
  offeringPage6: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    justifyContent: 'space-between',
  },
  header: {
    width: width * 0.9,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 30,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_200,
    marginLeft: 10,
    fontWeight: '500',
  },
  searchContainer: {
    width: width,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: width * 0.9,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  flatListContent: {
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom:60,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray_200,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray_200,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default OfferingPage6;
