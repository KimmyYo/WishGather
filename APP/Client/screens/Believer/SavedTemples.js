import React, { useEffect, useState } from "react";
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GoBackButton1 from "../../components/Utility/GoBackButton1";
import CollectedTemple from "../../components/Believer/CollectedTemple";

const { width } = Dimensions.get('window');
const API = require('../config/DBconfig');

const SavedTemples = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [temples, setTemples] = useState([]);
  const [savedTempleIds, setSavedTempleIds] = useState([]); // 已收藏的宮廟 ID

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

  // 載入已收藏的宮廟 ID
  const loadSavedTemples = async () => {
    try {
      const saved = await AsyncStorage.getItem("savedTempleIds");
      if (saved) setSavedTempleIds(JSON.parse(saved));
    } catch (error) {
      console.error("Error loading saved temples:", error);
    }
  };

  // 過濾出已收藏的宮廟
  const filteredSavedTemples = temples.filter(temple => savedTempleIds.includes(temple.tID));

  const renderItem = ({ item }) => (
    <CollectedTemple
      templeImage={{ uri: item.IMAGE ? `${API}${item.IMAGE}` : 'https://news.nsysu.edu.tw/static/file/120/1120/pictures/930/m/mczh-tw810x810_small253522_197187713212.jpg' }}
      templeName={item.NAME}
      address={item.ADDRESS}
      onPressablePress={() => navigation.navigate("OfferingsByTemple", { templeId: item.tID })}
    />
  );

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom - 40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
      
        <GoBackButton1 destination="UserPage" />
        
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="heart" size={24} color="orange" style={styles.icon} />
          <Text style={styles.pageTitle}>我的收藏</Text>
        </View>
        
        <FlatList
          data={filteredSavedTemples} // 過濾後的已收藏宮廟
          renderItem={renderItem}
          keyExtractor={(item) => item.tID.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 28,
    color: "#4F4F4F",
    fontWeight: "bold",
    textAlign: 'left',
    marginBottom: 5,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
});

export default SavedTemples;
