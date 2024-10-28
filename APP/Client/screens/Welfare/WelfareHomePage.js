import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SectionHeader from '../../components/Utility/SectionHeader';
import { UserContext } from '../../components/Context/UserContext';
import MatchingCard from '../../components/Temple/MatchingCard';
import WelfareMatchingCard from '../../components/Welfare/WelfareMatchingCard';
import WelfareDeliverCard from '../../components/Welfare/WelfareDeliverCard';

const API = require('../config/DBconfig');
const { width, height } = Dimensions.get('window');

function WelfareHomePage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const [deliverData, setDeliverData] = useState([]);
  const [undeliverData, setUndeliverData] = useState([]);
  const [welfares, setWelfaresData] = useState([]);
  const [anotherData, setAnotherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the APIs
  const fetchData = async () => {
      // 抓取媒合已確認內容
      const deliverResponse = await axios.get(`${API}/matchData?wID=${userId}&BOOKED_STATUS=B`);
      setDeliverData(deliverResponse.data);
      // 抓取媒合未確認內容
      const undeliverResponse = await axios.get(`${API}/matchData?wID=${userId}&BOOKED_STATUS=A`);
      setUndeliverData(undeliverResponse.data);
  };
  // Call the fetch function
  useEffect(() => {
    fetchData();
  }, [userId]); // Dependencies array to re-fetch data if userId changes

  return (
    <SafeAreaProvider>
      <View style={[styles.container, {
        paddingTop: insets.top + 25, 
        paddingBottom: insets.bottom,
        paddingLeft: insets.left + 30,
        paddingRight: insets.right + 30
      }]}>
        <View style={{ width: width * 0.95, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', marginBottom: 35 }}>
          <MaterialCommunityIcons name="home-heart" size={30} color="orange" style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4F4F4F' }}>
            {'歡迎回來 ! '}{welfares.NAME}
          </Text>
        </View>

        {/**運送狀態卡片*/}
        <View style={styles.infoContainer}>
          <SectionHeader title="捐贈運送狀態" onPress={() => navigation.navigate('WelfareTransportPage')} />
          <FlatList
              data={deliverData}
              renderItem={({ item }) => <WelfareDeliverCard data={item} />}
              keyExtractor={(item) => item.tID}
          />
          <View style={styles.statusIndicatorContainer}>
              <View style={styles.statusDetail}>
                <MaterialCommunityIcons name="package-variant" color={"#D3212C"} size={26} />
                <Text style={{ color: "#D3212C" }}>未配送</Text>
              </View>
              <View style={styles.statusDetail}>
                <MaterialCommunityIcons name="truck-delivery" color={"#FF980E"} size={26} />
                <Text style={{ color: "#FF980E" }}>配送中</Text>
              </View>
              <View style={styles.statusDetail}>
                <MaterialCommunityIcons name="account-check" color={"#069C56"} size={26} />
                <Text style={{ color: "#068c56" }}>已送達</Text>
              </View>
          </View>
        </View>
        {/**媒合確認卡片*/}
        <View style={styles.infoContainer}>
          <SectionHeader title="媒合確認" onPress={() => navigation.navigate('WelfareMatchingPage')} />
          <FlatList
              data={undeliverData}
              renderItem={({ item }) => <WelfareMatchingCard data={item} />}
              keyExtractor={(item) => item.tID}
          />
        </View>

        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </SafeAreaProvider>
  );
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'start',
    alignItems: 'start',
  },
  infoContainer: {
    width: screenWidth * 0.95,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 40,
    // borderTopWidth: 1,
    // borderColor: '#ccc',
  },
  statusIndicatorContainer: {
    margin: 10,
    flexDirection: 'row',
    width: '100%' 
  }, 
  statusDetail: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  flatListContainer: {
    alignSelf: 'center',
  },
  donateItemContainer: {
    width: width * 0.4,
    height: 230,
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    alignItems:'flex-start',
    justifyContent: 'start',
  },
  templeImage: {
    width: '95%',
    height: 120, // 控制圖片高度
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,

    alignSelf:'center',
  },
  donateItemTitle: {
    color: '#4F4F4F',
    fontSize: 17,
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
    top: '20%',
  },
});

export default WelfareHomePage;
