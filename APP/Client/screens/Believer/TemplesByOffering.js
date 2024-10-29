import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, TextInput, Modal, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TempleCard from "../../components/Believer/TempleCard";
import GoBackButton1 from "../../components/Utility/GoBackButton1";
import DrawlotsButton from "../../components/Believer/DrawlotsButton";
import axios from 'axios';
const API = require('../config/DBconfig');

const { width } = Dimensions.get('window');

const TemplesByOffering = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [savedTempleIds, setSavedTempleIds] = useState([]); // 已收藏的宮廟 ID

  const route = useRoute();
  const { selectedTitle } = route.params;
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    axios.get(`${API}/temples`)
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        console.error('Error fetching temples:', error);
      });
    
    loadSavedTemples(); // 載入已收藏的宮廟
  }, []);

  // 載入已收藏的宮廟
  const loadSavedTemples = async () => {
    try {
      const saved = await AsyncStorage.getItem("savedTempleIds");
      if (saved) setSavedTempleIds(JSON.parse(saved));
    } catch (error) {
      console.error("Error loading saved temples:", error);
    }
  };

  // 更新收藏狀態
  const handleSave = async (templeId) => {
    const isSaved = savedTempleIds.includes(templeId);
    const updatedIds = isSaved
      ? savedTempleIds.filter(id => id !== templeId)
      : [...savedTempleIds, templeId];

    try {
      await AsyncStorage.setItem("savedTempleIds", JSON.stringify(updatedIds));
      setSavedTempleIds(updatedIds);
      setModalMessage(isSaved ? "已取消收藏此宮廟" : "已收藏此宮廟");
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving temple:", error);
    }
  };

  // 根據 searchText 過濾 temples 陣列
  const filteredTempleCards = temples.filter(temple =>
    temple.NAME.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TempleCard
      imageSource={{ uri: item.IMAGE ? `${API}${item.IMAGE}` : 'https://news.nsysu.edu.tw/static/file/120/1120/pictures/930/m/mczh-tw810x810_small253522_197187713212.jpg' }}
      title={item.NAME}
      distance={item.ADDRESS}
      onSave={() => handleSave(item.tID)}
      isSaved={savedTempleIds.includes(item.tID)} // 判斷是否已收藏
      onPress={() => navigation.navigate("OfferingsByTemple", { templeId: item.tID })}
    />
  );

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: insets.top,
        paddingBottom: insets.bottom - 40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        <GoBackButton1 destination="OfferingPage4" />

        <View style={styles.buttonContainer}>
          <DrawlotsButton />
        </View>

        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="basket" size={24} color="orange" style={styles.icon} />
          <Text style={styles.pageTitle}>供品類別 : {selectedTitle}</Text>
        </View>

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
            keyExtractor={(item) => item.tID.toString()}
            contentContainerStyle={styles.flatListContent}
            numColumns={1}
          />
        )}

        <Modal
          animationType="fade"
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
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  // ... (與您的原始樣式相同)
  titleContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 5,
  },
  pageTitle: {
    fontSize: 28,
    color: "#4F4F4F",
    fontWeight: "bold",
    textAlign: 'left',
    marginBottom: 2,
  },
  searchContainer: {
    width: width,
    paddingHorizontal: 5,
    paddingBottom: 8,
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
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: -40,
    zIndex: 9999,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontWeight:'bold',
    color: '#ccc',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    height: 100,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F4F4F',
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

export default TemplesByOffering;
