import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, FlatList, Pressable, } from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { UserContext } from '../../components/Context/UserContext';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';
import WelfareDeliverCard from '../../components/Welfare/WelfareDeliverCard';

const API = require('../config/DBconfig');
const { width, height } = Dimensions.get('window'); 

function WelfareTransportPage() {  
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const [error, setError] = useState(null); 
  const [deliverData, setDeliverData] = useState([]);

  const fetchDeliveringData = async () => {
      try{
        const deliverResponse = await axios.get(`${API}/matchData?wID=${userId}&BOOKED_STATUS=B`);
        setDeliverData(deliverResponse.data);
      }
      catch(error){
      }
      
  }
  useEffect(() => {
     fetchDeliveringData()
  }, [userId])
  {/* 還需要一個column儲存運送狀態的state */}

  const handleTemplePress = (temple) => {
    // Navigate to TransportDetail and pass temple data
    navigation.navigate('TransportDetail', { temple });
  };
  
  return (

    <SafeAreaProvider>
      <View style={{
          flex: 1,
          backgroundColor: '#f2f2f2',
          justifyContent: 'start',
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom-40,
          paddingLeft: insets.left,
          paddingRight: insets.right
      }}>

        <GoBackButton1 />
        <PageTitle titleText="捐贈運送狀態" iconName="emoji-transportation" /> 
        <View style={styles.donateListContainer}>
          <FlatList
                data={deliverData}
                renderItem={({ item }) => <WelfareDeliverCard data={item} />}
                keyExtractor={(item) => item.tID}
            />
        </View>
      {/* {error && <Text style={styles.errorText}>{error.message}</Text>} */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  btncontainer:{
    position: 'absolute',
    top: 60,
  },
  
  text: {
    fontSize: 20,
    color: "black",
    position: 'absolute',
    left: '10%',
  },
  donateListContainer: {
    width: width,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    paddingHorizontal:10,
    paddingBottom: 80,
    // borderWidth:1
  },
  itemContainer: {
    width: width*0.95,
    height: 120,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  templeImage:{
    width:90,
    height:90,
    borderRadius:10,

  },
  detailsContainer:{
    width: "60%",
    height:'100%',
    alignItems:'flex-start',
    alignSelf:'center',
    paddingTop: 15,
    paddingHorizontal: 10,
    lineHeight: 30,
    // borderWidth:1,

  },
  templeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#4F4F4F',
    marginLeft: 5,
  },
  address: {
    fontSize: 14,
    color: 'gray',
    marginLeft:3,
  },
  transportState:{
    height:'100%',
    justifyContent:'flex-end',
    paddingBottom: 5,
    paddingHorizontal: 10,
    // borderWidth:1
  },
  stateText:{
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    top:'20%',
  },
});
export default  WelfareTransportPage;
