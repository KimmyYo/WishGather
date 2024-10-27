import React, { useState, useCallback, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import CheckoutBar from '../../components/Utility/CheckoutBar';

import { UserContext } from '../../components/Context/UserContext';//for id
import {translateToChinese } from '../../components/Utility/translations';

const { width } = Dimensions.get('window');

const API = require('../config/DBconfig');

const ScanResult = ({ route }) => {

    const { userId } = useContext(UserContext);
    const { objectCounts } = route.params;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemCount, setNewItemCount] = useState('');

    useEffect(() => {
        const getTokenAndFetchProfile = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                    await fetchProfile(storedToken);
                }
            } catch (error) {
                console.error('Error reading token or fetching profile:', error);
                Alert.alert('Error', 'Failed to load profile');
            }
        };

        getTokenAndFetchProfile();
    }, []);

    useEffect(() => {
        // Convert initialObjectCounts to array of objects
        const initialItems = Object.entries(objectCounts).map(([name, count]) => ({
            name: translateToChinese(name),// from tag to real name in tw-ZH
            count
          }));
        setItems(initialItems);
    }, [objectCounts]);

    const fetchProfile = async (userToken) => {
        if (!userToken) {
            Alert.alert('Error', 'No token available');
            return;
        }
        setIsLoading(true);
        console.log('token:', userToken);

        try {
            const response = await axios.get(`${API}/profile`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            console.log('Response headers:', response.headers);
            console.log('Profile data:', response.data);

            setProfile(response.data);
        } catch (error) {
            console.error('Fetch profile error', error);
            Alert.alert('Error', 'Failed to fetch profile. Please try again.');
        }
        setIsLoading(false);
    };

    const handleCountChange = (index, newCount) => {
        const updatedItems = [...items];
        updatedItems[index].count = Math.max(0, parseInt(newCount) || 0);
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        if (newItemName && newItemCount) {
            setItems([...items, { name: newItemName, count: parseInt(newItemCount) || 0 }]);
            setNewItemName('');
            setNewItemCount('');
        }
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    };

    const handleSubmit = async () => {
        try {
            const submitData = {
                userId: userId,
                items: items.map(item => ({
                    name: item.name,
                    count: item.count
                }))
            };
    
            await axios.post(`${API}/submitScanResult`, submitData);
            Alert.alert('Success', '物品上傳成功!謝謝!');
            navigation.navigate('SubmissionResult', { items: submitData.items });
        } catch (error) {
            console.error('Error submitting data:', error);
            Alert.alert('Error', 'Failed to submit data. Please try again.');
        }
    };

    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom+20,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                <View style={{width:'100%'}}>
                  <GoBackButton1 />
                </View>
                

                <ScrollView style={styles.scrollContainer}>

                    <Text style={styles.title}>{profile ? profile.name || 'User' : 'Loading...'} 您的照片中共有:</Text>

                    {/* scan result */}
                    <View style={styles.listContainer}>
                        {items.map((item, index) => (
                            <View key={index} style={styles.itemContainer}>
                                <TextInput
                                    style={styles.nameInput}
                                    value={item.name}
                                    onChangeText={(newName) => {
                                        const updatedItems = [...items];
                                        updatedItems[index].name = newName;
                                        setItems(updatedItems);
                                    }}
                                />
                                <TextInput
                                    style={styles.countInput}
                                    value={item.count.toString()}
                                    onChangeText={(newCount) => handleCountChange(index, newCount)}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(index)}>
                                    <Text style={styles.buttonText}>刪除</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                        <View style={styles.divider} />

                        <View style={styles.addItemSection}>
                            <View style={styles.itemContainer}>
                                <TextInput
                                    style={styles.nameInput}
                                    value={newItemName}
                                    onChangeText={setNewItemName}
                                    placeholder="新品項名稱"
                                />
                                <TextInput
                                    style={styles.countInput}
                                    value={newItemCount}
                                    onChangeText={setNewItemCount}
                                    placeholder="數量"
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                                    <Text style={styles.buttonText}>新增</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <CheckoutBar btnText={"送出"} iconName={"checkbox-outline"} onPress={handleSubmit} />
                </View>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 90,
        // borderWidth:1,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#4F4F4F',
        marginVertical: 20,
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    listContainer: {
        width: '100%',
    },
    itemContainer: {
        width: width*0.9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    itemName: {
        flex: 2,
        fontSize: 16,
        color: '#4F4F4F',
    },
    countInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    nameInput: {
        flex: 2,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        textAlign:'center',
    },
    deleteButton: {
        backgroundColor: '#FF4444',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    addItemSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        color: '#4F4F4F',
        marginBottom: 10,
        textAlign: 'center',
    },
   
    buttonContainer: {
        width: width,
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default ScanResult;