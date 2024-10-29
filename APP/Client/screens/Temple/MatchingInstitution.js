import { React, useState, useEffect, useContext, useCallback } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, FlatList, Alert, RefreshControl } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import { UserContext } from '../../components/Context/UserContext';

import PageTitle from '../../components/Utility/PageTitle';
import CheckoutBar from '../../components/Utility/CheckoutBar'
import MatchingInstituteCard from '../../components/Temple/MatchingInstituteCard';
import LoadingScreen from '../../components/Utility/Loading';

const API = require('../config/DBconfig');

function MatchingInstitution() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [swOrgData, setswOrgData] = useState([]);
    const [templeData, setTempleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        try {
            setLoading(true);
            const swOrgResponse = await axios.get(`${API}/sw_organization`);
            setswOrgData(swOrgResponse.data);
            
            const templeResponse = await axios.get(`${API}/temples_info/${userId}`);
            setTempleData(templeResponse.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 100);
    }, [userId]);

    const handleCallMatchingAlgo = async() => {
        try {
            const response = await axios.post(`${API}/match_algo`, 
                { tID: userId }, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.data.success){
                Alert.alert('媒合成功', '請查看媒合訊息');
                setTimeout(() => {
                    navigation.navigate('TempleHomePage', { refresh: true });
                }, 100)
            }
        } catch (error) {
            // console.error('Matching algorithm error:', error);
            Alert.alert('媒合失敗');
        }
    };



  if (loading) return <LoadingScreen />;
  // Handle error state
  if (error) {
        // Alert.alert('Error', 'An error occurred while fetching data.');
        return null; // Optionally, return a null or some error UI
    }


    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top - 30,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                <View style={styles.flatListContainer}>
                    <FlatList // trigger matching algorithm
                        data={swOrgData}
                        renderItem={({ item }) => <MatchingInstituteCard institute={item}  />}
                        keyExtractor={(item) => item.wID}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CheckoutBar 
                        btnText={'一鍵媒合'}
                        iconName={'arrow-forward-circle-outline'}
                        onPress={handleCallMatchingAlgo}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  flatListContainer: {
    paddingBottom: 80,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex: 9999,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F4F4F',
    marginBottom: 15,
  },
  instituteImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  instituteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom:5,
  },
  instituteAddress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    fontSize: 16,
    color: '#555',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'orange',
    borderRadius: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MatchingInstitution;
