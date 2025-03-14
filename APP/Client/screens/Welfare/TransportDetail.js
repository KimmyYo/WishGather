import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBackButton1 from '../../components/Utility/GoBackButton1'; // Assuming you have a GoBackButton component
import PageTitle from '../../components/Utility/PageTitle'; // Assuming you have a PageTitle component
import CloseButton from '../../components/Utility/CloseButton';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import { UserContext } from '../../components/Context/UserContext';

const { width, height } = Dimensions.get('window');
const API = require('../config/DBconfig');
function TransportDetail({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { temple } = route.params; // Passing temple details from the previous page (WelfareTransportPage)
  const { userId } = useContext(UserContext);
  const [statusCode, setStatusCode] = useState();
  // State to manage if the items list should be shown
  const [showItems, setShowItems] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null); // State to store fetched coordinates
  const mapRef = useRef(null);
  const [deliverList, setDeliverList] = useState([]);
  const getStatusCode = (status) => {
      if(status == '已預定') return 'B'
      return 'A'
   }

   const fetchDeliverData = useCallback(async () => {
    try {
      const deliveryResponse = await axios.get(
        `${API}/matchDetails?wID=${userId}&tID=${temple.tID}&BOOKED_STATUS=${getStatusCode(temple.BOOKED_STATUS)}`
      );
      const matchingDetails = deliveryResponse.data.matchingDetails;
      setDeliverList(matchingDetails);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    }
  }, [userId, temple.tID, temple.BOOKED_STATUS]); // Dependencies to prevent recreation
  
  useEffect(() => {
    fetchDeliverData(); // Load data on component mount
  }, [fetchDeliverData]); // Only re-run if dependencies change
  
  const updateBookedStatus = async () => {
    try {
      const response = await axios.put(`${API}/updateStatus`, {
        BOOKED_STATUS: 'B',
        matchingID: temple.matchingID.split(',')
      });
  
      if (response.data.success) {
        Alert.alert(`已向${temple.TEMPLE_NAME}預定`, '請等待對方確認');
        await fetchDeliverData(); // Reload data if update is successful
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
  };
  const renderStatus = () => {
   
    if(deliverList.length){
      console.log(deliverList);
      console.log(temple.BOOKED_STATUS);
      if(temple.BOOKED_STATUS == '未預定'){
          return (
            <TouchableOpacity 
              style={[styles.viewItemsButton, { backgroundColor: '#FF980E' }]}
              onPress={updateBookedStatus}>
              <Text style={styles.viewItemsText}>確認預定</Text>
            </TouchableOpacity>
          )
        }
        else if(temple.BOOKED_STATUS == '已預定' && temple.CONFIRMED_STATUS == '未確認'){
          return (
            <Text style={styles.detailValue}>{temple.TEMPLE_NAME}確認中...</Text>
          )
        }
        else if (temple.CONFIRMED_STATUS === '已確認' && temple.DELIVER_STATUS !== '已送達'){
          let updDateTime = temple.UPD_DATETIME ? `${temple.UPD_DATETIME.substring(0, 10)} ~ ${new Date(new Date(temple.UPD_DATETIME).setDate(new Date(temple.UPD_DATETIME).getDate() + 7)).toISOString().substring(0, 10)}` : '未配送';
          return (
            <Text style={styles.detailValue}>
               {updDateTime}
            </Text>
          )
        }
        else if (temple.DELIVER_STATUS == "已送達"){
          return (
            <Text style={styles.detailValue}>
              捐贈已送達，請確認
            </Text>
          )
        }
      
      } 
  }
  // calculate d  istance (mock current user)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return Math.round(d * 100) / 100;
  };
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };


  // Tab scenes
  const renderTableTab = () => (
        <ScrollView style={styles.deliverListContainer}>
            <DataTable>
                <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title textStyle={styles.tableTitle}>名稱</DataTable.Title>
                    <DataTable.Title numeric textStyle={styles.tableTitle}>種類</DataTable.Title>
                    <DataTable.Title numeric textStyle={styles.tableTitle}>數量</DataTable.Title>
                </DataTable.Header>
                {deliverList.map((item, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>{item.CHN}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.TYPE}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.AMOUNT}</DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </ScrollView>
    );
  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: insets.top - 100,
        paddingBottom: insets.bottom - 2000,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>

        {/* Top Section */}
        <View style={styles.headerSection}>
          <Image source={{ uri: temple.TEMPLE_IMAGE ? `${API}${temple.TEMPLE_IMAGE}`: `${API}/uploads/profilePictures/default.jpg` }}
                 style={styles.templeImage} />
          <Text style={styles.templeName}>{temple.TEMPLE_NAME}</Text>
          <Text style={styles.templeAddress}>{temple.TEMPLE_ADDRESS}</Text>
        </View>

        <View style={styles.btncontainer}>
          <CloseButton />
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>

          <Text style={styles.detailRow}>   
            <Text style={styles.detailLabel}>配送期限 : </Text>
            {renderStatus()}
          </Text>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送距離 : </Text>
            <Text style={styles.detailValue}>{
                  calculateDistance(temple.TEMPLE_COORDINATE.y, temple.TEMPLE_COORDINATE.x,
                                    temple.WELFARE_COORDINATE.y, temple.WELFARE_COORDINATE.x)}公里
            </Text>
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送物資 : </Text>
            <TouchableOpacity
              style={styles.viewItemsButton}
              onPress={() => setShowItems(!showItems)}
            >
              <Text style={styles.viewItemsText}>{showItems ? '收起' : '查看'}</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render items list */}
          {showItems && (
            renderTableTab()
          )}

          {/* Map Section */}
          <MapView
            ref={mapRef}
            style={{ width: '100%', height: '55%', alignItems: 'center' }}
            initialRegion={{
              latitude: temple.TEMPLE_COORDINATE ? temple.TEMPLE_COORDINATE.y : 22.623, // Default latitude
              longitude: temple.TEMPLE_COORDINATE ? temple.TEMPLE_COORDINATE.x : 120.293, // Default longitude
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {/* 添加當前寺廟的 Marker */}
            {coordinates && (
              <Marker
                coordinate={coordinates}
                title={temple.NAME}
                pinColor="orange"
              />
            )}
            <Marker
                key={temple.tID}
                coordinate={{
                  latitude: temple.TEMPLE_COORDINATE.y,
                  longitude: temple.TEMPLE_COORDINATE.x,
                }}
                title={temple.TEMPLE_NAME}
                pinColor="orange"
             />
          </MapView>

          {/* Conditionally show error message */}
          {error && <Text style={styles.errorText}>無法載入宮廟資料: {error.message}</Text>}

        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    height: '40%',
    backgroundColor: 'orange',
    opacity: 0.8,
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10, // for Android shado
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  btncontainer: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  templeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  templeName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  templeAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20, 
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 18,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#4F4F4F',
  },
  viewItemsButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft: 8,
    borderRadius: 5,
  },
  viewItemsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsList: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default TransportDetail;
