import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import TabBar from "../../components/TabBar"; //footer


const API = require('../config/DBconfig');

export default function Welfare_TransportPage({ navigation }) {

  const { height } = Dimensions.get('window'); 
  const [error, setError] = useState(null); 

  //捐贈品運送的API
  const [temples, setTemples] = useState([]);
  useEffect(() => {  
    axios.get(`${API}/temples`)
      .then(response => {
        setTemples(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);


  const transportItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Name: {item.NAME}</Text>
      <Text style={styles.itemText}>Address: {item.ADDRESS}</Text>
    </View>
  );

  
  return (

    <View style={styles.container}>
      
      
      <Text style={[styles.text, { top: height * 0.1 }]}>捐贈運送</Text>
      
      <View style={styles.donateListContainer}>
        <FlatList
          data={temples}
          renderItem={transportItem}
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
    bottom: '87%',
    left: '9%',
    width: '85%',
  },
  itemContainer: {
    height: 85,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top:'20%',
  },
});
