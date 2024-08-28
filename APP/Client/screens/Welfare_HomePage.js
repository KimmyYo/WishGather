import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

import SectionHeader from '../components/SectionHeader';

const API = require('./DBconfig');

const { width, height } = Dimensions.get('window');


export default function Welfare_HomePage({ navigation }) {
  const insets = useSafeAreaInsets();
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


  const [anotherData, setAnotherData] = useState([]);
  useEffect(() => {
    axios.get(`${API}/anotherDataTable`) 
      .then(response => {
        setAnotherData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);


  const transportItem = ({ item }) => (
    <View style={styles.donateItemContainer}>
      <Text style={styles.donateItemTitle}>{item.NAME}</Text>
      <Text style={styles.donateItemText}>{item.ADDRESS}</Text>
    </View>
  );

  const matchingItem = ({ item }) => (
    <View style={styles.anotherItemContainer}>
      <Text style={styles.anotherItemText}>Field1: {item.FIELD1}</Text>
      <Text style={styles.anotherItemText}>Field2: {item.FIELD2}</Text>
    </View>
  );
  
  return (
    <SafeAreaProvider>
      <View style={[styles.container, {
        paddingTop: insets.top + 25,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 30,
        paddingRight: insets.right + 30
      }]}>
        
        <View style={{width: width*0.95, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', marginBottom: 35}}>
          <MaterialCommunityIcons name="home-heart" size={30} color="orange" style={{marginRight: 8}} />
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#4F4F4F'}}>歡迎回來 ! 陽光基金會</Text>
        </View>

        <View style={styles.infoContainer}>
          <SectionHeader title="捐贈運送狀態" onPress={() => navigation.navigate('Welfare_TransportPage')} />
          <FlatList
            data={temples}
            renderItem={transportItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal // Set horizontal to true
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
            contentContainerStyle={styles.flatListContainer}
          />
        </View>

        <View style={styles.infoContainer}>
          <SectionHeader title="媒合確認" onPress={() => navigation.navigate('Welfare_MatchingPage')} />
        </View>
        
        <View>
          <FlatList
            data={anotherData}
            renderItem={matchingItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'start',
    alignItems: 'start',
  },
  welcomeContainer: {
    width: width * 0.95,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 10,
    marginBottom: 35,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  infoContainer: {
    width: width * 0.95,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 40,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  flatListContainer: {
    alignSelf:'center',
  },
  donateItemContainer: {
    width: width * 0.4, 
    height: 200,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 5, // Margin to space items horizontally
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    
    justifyContent:'flex-end',
  },
  donateItemTitle:{
    color: '#4F4F4F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  donateItemText: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top:'20%',
  },
});
