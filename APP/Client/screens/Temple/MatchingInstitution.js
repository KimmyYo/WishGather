import { React, useState, useEffect, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, FlatList } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import { UserContext } from '../../components/Context/UserContext';

import PageTitle from '../../components/Utility/PageTitle';
import CheckoutBar from '../../components/Utility/CheckoutBar'
import MatchingInstituteCard from '../../components/Temple/MatchingInstituteCard';


const API = require('../config/DBconfig');

function MatchingInstitution() {
    const insets = useSafeAreaInsets();
    const { userId } = useContext(UserContext);
    const [swOrgData, setswOrgData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        // Replace with your API endpoint
        axios.get(`${API}/sw_organization`)
            .then(response => {
                setswOrgData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);


    const handleCallMatchingAlgo = async() => {
        const response = await axios.post(`${API}/match_algo`, {tID: userId}, {
            headers: {
                'Content-Type': 'application/json'  // Ensure content type is set to JSON
            }
        });
    }


  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

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
                        renderItem={({ item }) => <MatchingInstituteCard institute={item} />}
                        keyExtractor={(item) => item.id}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
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
