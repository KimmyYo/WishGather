import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import axios from 'axios';
import { StyleSheet, Pressable, Text, View ,ScrollView, Dimensions, FlatList } from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import GoBackButton1 from "../components/GoBackButton1";
import CollectedTemple from "../components/CollectedTemple";

import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const { width } = Dimensions.get('window');
const API = require('./DBconfig')

const data = [
  {
    id: '1',
    templeImage: require("../assets/rectangle-213.png"),
    templeName: "大甲 鎮瀾宮媽祖廟",
    address: "437台中市大甲區順天路158號",
  },
  {
    id: '2',
    templeImage: require("../assets/rectangle-213.png"),
    templeName: "大甲 鎮瀾宮媽祖廟",
    address: "437台中市大甲區順天路158號",
  },
  // Add more items as needed
];

const UserPage21 = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [temples, setTemples] = useState([]);

  const renderItem = ({ item }) => (
    <CollectedTemple
      templeImage={item.templeImage}
      templeName={item.templeName}
      address={item.address}
      onPressablePress={() => navigation.navigate("OfferingPage5")}
    />
  );

  useEffect(() => {
    
    axios.get(`${API}/temples`)
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the temples!!!', error);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
      
        <GoBackButton1 destination="UserPage" />
        
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="heart" size={24} color="orange" style={styles.icon} />
          <Text style={styles.pageTitle}>我的收藏</Text>
        </View>
        
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
        />
        
      
        <ScrollView>
        {/* Database */}
        {temples.map((temple, index) => (
          <CollectedTemple
            key={index}
            templeImage={{ uri: temple.IMAGE || 'default_image_path.png' }}
            templeName={temple.NAME}
            address={temple.ADDRESS}
            onPressablePress={() => navigation.navigate("OfferingPage5")}
          />
        ))}
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    width: width * 0.95,
    flexDirection:'row',
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

export default UserPage21;