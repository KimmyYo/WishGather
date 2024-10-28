import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Animated, Image, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import PageTitle from '../../components/Utility/PageTitle';
import GoBackButton1 from '../../components/Utility/GoBackButton1';
import CustomStepIndicator from '../../components/Utility/CustomStepIndicator';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig');

function TempleDeliverPage({ route }) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const { data } = route.params;
    const [statusData, setStatusData] = useState([]);
    const [deliverList, setDeliverList] = useState([]);
    const [isScrolled, setIsScrolled] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                let response = await axios.get(`${API}/readCode/0003`);
                const codes = response.data.code;
                setStatusData(codes);
                
                if (codes && codes.length > 0) {
                    const statusIndex = codes.findIndex(
                        item => item.CODE_NAME === data.DELIVER_STATUS
                    );
                    setCurrentPosition(statusIndex !== -1 ? statusIndex : 0);
                }
                
                response = await axios.get(`${API}/matchDetails/${data.wID}/${userId}`);
                setDeliverList(response.data.matchingDetails);
                setIsScrolled(0);
            } catch (err) {
                console.error(err);
            }
        };

        fetchStatusData();
    }, [data.DELIVER_STATUS]);

    const renderCurrentStatus = () => {
        if (statusData.length === 0) return null;
        const currentStatus = statusData[currentPosition];
        return (
            <View 
                style={
                    styles.statusInfoCard}
            >
                <Text style={styles.statusTitle}>運送狀態：{currentStatus.CODE_NAME}</Text>
                <Text style={styles.statusBody}>媒合編號：{data.matchingID || '未知'}</Text>
                <Text style={styles.statusBody}>狀態說明：{
                    data.BOOKED_STATUS === 'A' ? `您的媒合尚未被${data.WELFARE_NAME}確認` : `您還未將此捐贈訂單送出`
                }</Text>
            </View>
        );
    };


    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
                <GoBackButton1 destination={'TempleHomePage'} />
                <PageTitle titleText="媒合運送" style={styles.pageTitle}/>
                <View style={[styles.templeInfoCard, styles.circle]}>
                    <Text style={styles.templeName}>{data.WELFARE_NAME || 'No Name Available'}</Text>
                    <Text>{data.WELFARE_ADDRESS || 'No Address Available'}</Text>
                    <CustomStepIndicator
                        steps={statusData.map(item => item.CODE_NAME)}
                        currentPosition={currentPosition}
                    />
                      {/* Overlay renderCurrentStatus here */}
                    <View style={styles.statusOverlay}>
                        {renderCurrentStatus()}
                    </View>
                </View>
                <ScrollView 
                    style={styles.deliverListContainer}
                    scrollEventThrottle={600}
                >
                    <Text style={styles.orderTitle}>訂單詳情資訊</Text>
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
            </View>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    // circle: {
      statusOverlay: {
        position: 'absolute',
        bottom: -30,  // Adjust this value to position as desired
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    templeInfoCard: {
      alignItems: 'center',
      backgroundColor: '#FFC47C',
      borderRadius: '1%',
      padding: 20,
      paddingBottom: 80,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      marginBottom: 50,
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2, // Adjust this value to change the vertical shadow position
      },
      shadowOpacity: 0.25, // Adjust for more or less opacity
      shadowRadius: 3.5, // Adjust for more or less blur
      // Elevation for Android
      elevation: 5, // Adjust for more or less shadow
  },
  
    templeImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    templeName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    templeAddress: {
        fontSize: 20,
        color: '#666',
        marginBottom: 10,
    },
    statusInfoCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBody: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    deliverListContainer: {
        padding: 10,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tableHeader: {
        backgroundColor: '#6E7DFF',
    },
    tableTitle: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
    rejectButton: {
        backgroundColor: '#d9534f',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    confirmButton: {
        backgroundColor: '#e38c14',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginBottom: 10,
  },
});

export default TempleDeliverPage;
