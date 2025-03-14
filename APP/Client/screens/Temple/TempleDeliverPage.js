import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBackButton1 from '../../components/Utility/GoBackButton1'; // Assuming you have a GoBackButton component
import PageTitle from '../../components/Utility/PageTitle'; // Assuming you have a PageTitle component
import CloseButton from '../../components/Utility/CloseButton';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import { UserContext } from '../../components/Context/UserContext';

const { width, height } = Dimensions.get('window');
const API = require('../config/DBconfig');

function TempleDeliverPage({ route }) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);
  const { welfare } = route.params;
  const [showItems, setShowItems] = useState(false);
  const [deliverList, setDeliverList] = useState([]);
  const [isBooked, setIsBooked] = useState();
  const mapRef = useRef(null);

  const getStatusCode = (status) => {
    if(status === '已預定') return 'B';
    return 'A';
  };

  useEffect(() => {
    const fetchDeliverData = async () => {
      try {
        const deliveryResponse = await axios.get(
          `${API}/matchDetails?wID=${welfare.wID}&tID=${userId}&BOOKED_STATUS=${getStatusCode(welfare.BOOKED_STATUS)}`
        );
        const matchingDetails = deliveryResponse.data.matchingDetails;
        setDeliverList(matchingDetails);
        if (matchingDetails.length) {
          if (matchingDetails[0].CONFIRMED_STATUS !== '已確認' && matchingDetails[0].BOOKED_STATUS === '已預定') {
            setIsBooked('已預定');
          }
        }
      } catch (error) {
        console.error('Error fetching delivery data:', error);
      }
    };
    fetchDeliverData();
  }, [welfare.wID, userId]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c * 100) / 100; // Distance in km
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const renderDuration = () => {
    if (deliverList.length) {
      return (
        <Text style={styles.detailValue}>
          {deliverList[0].CONFIRMED_STATUS === '已確認' && deliverList[0].DELIVER_STATUS !== '已送達'
            ? `${welfare.UPD_DATETIME.substring(0, 10)} ~ ${new Date(new Date(welfare.UPD_DATETIME).setDate(new Date(welfare.UPD_DATETIME).getDate() + 7)).toISOString().substring(0, 10)}`
            : '未配送'}
        </Text>
      );
    }
  };

  const handleConfirmDonate = () => {
    Alert.alert(
      `捐贈給${welfare.WELFARE_NAME}?`,
      `確認後請將包裹寄出`,
      [
        { text: '取消', style: 'cancel' }, 
        { text: '確認', onPress: () => updateConfirmStatus() }
      ]
    );
  };

  const renderConfirmButton = () => {
    if (deliverList.length && deliverList[0].BOOKED_STATUS === '已預定' && deliverList[0].CONFIRMED_STATUS === '未確認') {
      return (
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>社福已確認，請確認出貨</Text>
          <TouchableOpacity
            style={[styles.viewItemsButton, { backgroundColor: '#D3212C' }]}
            onPress={handleConfirmDonate}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>確認</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const updateConfirmStatus = async () => {
    try {
      const response = await axios.put(`${API}/updateStatus`, { 
        CONFIRMED_STATUS: 'B',
        matchingID: welfare.matchingID.split(',')
      });
      if (response.data.success) {
        Alert.alert('出貨成功');
        setTimeout(() => {
          navigation.navigate('TempleHomePage', { refresh: true });
        }, 100);
      } else {
        Alert.alert('出貨失敗', '請稍後再試');
      }
    } catch (error) {
      Alert.alert('出貨失敗', '請稍後再試');
    }
  };

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
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
        <View style={styles.headerSection}>
          <Image source={{ uri: welfare.WELFARE_IMAGE ? `${API}${welfare.WELFARE_IMAGE}` : `${API}/uploads/profilePictures/default.jpg` }}
                 style={styles.templeImage} />
          <Text style={styles.templeName}>{welfare.WELFARE_NAME}</Text>
          <Text style={styles.templeAddress}>{welfare.WELFARE_ADDRESS}</Text>
        </View>
        <View style={styles.btncontainer}>
          <CloseButton />
        </View>
        <View style={styles.detailsContainer}>
          {renderConfirmButton()}
          <Text style={styles.detailRow}>   
            <Text style={styles.detailLabel}>配送期限 : </Text>
            {renderDuration()}
          </Text>
          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送距離 : </Text>
            <Text style={styles.detailValue}>
              {calculateDistance(welfare.TEMPLE_COORDINATE.y, welfare.TEMPLE_COORDINATE.x,
                                 welfare.WELFARE_COORDINATE.y, welfare.WELFARE_COORDINATE.x)}公里
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
          {showItems && renderTableTab()}
          <MapView
            ref={mapRef}
            style={{ width: '100%', height: '55%' }}
            initialRegion={{
              latitude: welfare.WELFARE_COORDINATE?.y || 22.623,
              longitude: welfare.WELFARE_COORDINATE?.x || 120.293,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {welfare.WELFARE_COORDINATE && (
              <Marker
                coordinate={{
                  latitude: welfare.WELFARE_COORDINATE.x,
                  longitude: welfare.WELFARE_COORDINATE.y
                }}
                title={welfare.WELFARE_NAME}
                pinColor="orange"
              >
              </Marker>
            )}
          </MapView>
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
  deliverListContainer: {
  }
});
export default TempleDeliverPage;
