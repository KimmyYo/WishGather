import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import TabBar from "../components/TabBar";
const API = require('./DBconfig'); // 確保這個路徑正確

export default function HomePage({ navigation }) {
  const { height } = Dimensions.get('window'); 
  const [temples, setTemples] = useState([]);

  // 把資料庫中的值call出來
  useEffect(() => {  
    axios.get(`${API}/temples`) // 你的 API 端點應該返回寺廟的數據
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the temples!', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("OfferingPage5")}>
      <View style={styles.donateItemContainer}>
        <Text style={styles.donateItemText}>{item.NAME}</Text> 
        <Text style={styles.donateItemText}>{item.ADDRESS}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Transport')}>
        <Text style={[styles.text, { top: height * 0.1 }]}>捐贈運送</Text>
      </TouchableOpacity>

      <View style={styles.donateListContainer}>
        <FlatList
          data={temples}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Matching')}>
        <Text style={[styles.text, { top: height * 0.51 }]}>媒合確認</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "black",
    position: 'absolute',
    left: '10%',
  },
  donateListContainer: {
    position: 'absolute',
    top: '15%',
    bottom: '47%',
    left: '9%',
    width: '100%',
  },
  donateItemContainer: {
    height: 85,
    width: '85%',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: '1%',
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  donateItemText: {
    fontSize: 16,
    color: 'black',
  },
  matchListContainer: {
    position: 'absolute',
    top: '60%',
    bottom: '2%',
    left: '9%',
    width: '100%',
  },
});
