import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import PageTitle from '../../components/Utility/PageTitle';
import NavigateBack from '../../components/Utility/NavigateBack';
import CustomStepIndicator from '../../components/Utility/CustomStepIndicator'; // Update the path as needed
import axios from 'axios';

const deliverList = [
  { glD: 101, NAME: '蘋果', TYPE: '水果', AMOUNT: 100 },
  { glD: 102, NAME: '香蕉', TYPE: '水果', AMOUNT: 150 },
  { glD: 103, NAME: '米', TYPE: '穀物', AMOUNT: 500 },
  { glD: 104, NAME: '芒果', TYPE: '水果', AMOUNT: 75 },
  { glD: 105, NAME: '瓶裝水', TYPE: '飲料', AMOUNT: 200 },
  { glD: 106, NAME: '洋芋片', TYPE: '零食', AMOUNT: 300 },
  { glD: 107, NAME: '鳳梨', TYPE: '水果', AMOUNT: 50 },
  { glD: 108, NAME: '餅乾盒', TYPE: '零食', AMOUNT: 120 },
  { glD: 109, NAME: '罐裝汽水', TYPE: '飲料', AMOUNT: 180 },
  { glD: 110, NAME: '龍眼', TYPE: '水果', AMOUNT: 90 }
];

const API = require('../config/DBconfig');

function TempleDeliverPage({route}) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { data } = route.params;
    const [statusData, setStatusData] = useState([]);
    const [deliverList, setDeliverList] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(0);

    useEffect(() => {
        const fetchStatusData = async () => {
            try {
                // 抓取運送狀態資料
                let response = await axios.get(`${API}/readCode/0003`);
                const codes = response.data.code;
                setStatusData(codes);
                // 設定運送裝態與步驟參數
                if (codes && codes.length > 0) {
                    const statusIndex = codes.findIndex(
                        item => item.CODE_NAME === data.DELIVER_STATUS
                    );
                    setCurrentPosition(statusIndex !== -1 ? statusIndex : 0);
                }
                // 抓取媒合細項資項
                response = await axios.get(`${API}/matchDetails/${data.wID}`);
                setDeliverList(response.data.matchingDetails);

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
            <View style={styles.infoCard}>
                <Text style={styles.title}>運送狀態：{currentStatus.CODE_NAME}</Text>
                <Text style={styles.body}>媒合編號：{data.ORDER_ID || '未知'}</Text>
                <Text style={styles.body}>狀態說明：{
                  data.BOOKED_STATUS = 'A' ? `\n您的媒合尚未被${data.NAME}確認` : `\n您還未將此捐贈訂單送出`
                || '無說明'}</Text>
            </View>
        );
    };
    return (
        <SafeAreaProvider>
            <View style={{
                flex: 1,
                justifyContent: 'start',
                alignItems: 'start',
                paddingTop: insets.top,
                paddingBottom: insets.bottom + 10,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }}>
                <NavigateBack />
                <PageTitle titleText="媒合運送"/>
                <View style={styles.container}>
                    <View style={styles.stepIndicator}>
                        <CustomStepIndicator
                            steps={statusData.map(item => item.CODE_NAME)}
                            currentPosition={currentPosition}
                        />
                        {renderCurrentStatus()}
                    </View>
                </View>

                <ScrollView style={styles.deliverList}>
                    <DataTable>
                        <DataTable.Header style={styles.tableHeader}>
                            <DataTable.Title textStyle={styles.tableTitle}>供品名稱</DataTable.Title>
                            <DataTable.Title textStyle={styles.tableTitle}>種類</DataTable.Title>
                            <DataTable.Title numeric textStyle={styles.tableTitle}>數量</DataTable.Title>
                        </DataTable.Header>
                        {deliverList.map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>{item.CHN}</DataTable.Cell>
                                <DataTable.Cell>{item.TYPE}</DataTable.Cell>
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
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    stepIndicator: {
        width: "100%",
        gap: 10,
    },
    infoCard: {
        padding: 24,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        lineHeight: 30,
        color: '#666',
    },
    deliverList: {
        width: '100%',
        padding: 10,
    },
    tableHeader: {
        backgroundColor: "#e38c14",
    },
    tableTitle: {
        color: "#fff",
        fontSize: 16,
        textAlign: 'center'
    }
});

export default TempleDeliverPage;