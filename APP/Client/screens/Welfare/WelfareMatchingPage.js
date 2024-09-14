import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API = require('../config/DBconfig');
const { width, height } = Dimensions.get('window');

export default function WelfareMatchingPage({ navigation }) {   
  const [error, setError] = useState(null); 

  // Fetch temple data from API
  const [temples, setTemples] = useState([]);

  useEffect(() => {  
    axios.get(`${API}/temples_info`)
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const renderTempleItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Temple Image */}
      <Image 
        source={{ uri: item.imageUrl }} // Assuming your API provides an image URL
        style={styles.templeImage}
      />
      <View style={styles.templeInfo}>
        <Text style={styles.templeName}>{item.TEMPLE_NAME}</Text>
        <Text style={styles.templeEvent}>{item.EVENT_NAME}</Text>
        <Text style={styles.templeTime}>{item.TIME}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        {/* "查看" Button */}
        <TouchableOpacity 
          style={styles.viewButton} 
          onPress={() => navigation.navigate('MatchingDetails', { temple: item })}
        >
          <Text style={styles.buttonText}>查看</Text>
        </TouchableOpacity>

        {/* "確認" Button */}
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>確認</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { top: height * 0.1 }]}>媒合確認</Text>

      <View style={styles.donateListContainer}>
        <FlatList
          data={temples}
          renderItem={renderTempleItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "black",
    position: 'absolute',
    left: '10%',
  },
  donateListContainer: {
    position: 'absolute',
    top: '15%',
    bottom: '20%',
    left: '5%',
    right: '5%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  templeImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
  },
  templeInfo: {
    flex: 1,
    flexDirection: 'column',
  },
  templeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  templeEvent: {
    fontSize: 14,
    color: '#666',
  },
  templeTime: {
    fontSize: 14,
    color: '#FF5733',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  viewButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top: '20%',
  },
});
