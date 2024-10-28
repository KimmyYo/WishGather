// 1. Create card 
// 2. Set IMAGE, NAME, ADDRESS
// 3. Get all unbooked data 
// 4. color the confirm status 
// 5. Link to the Welfare Matching Detail Page 
import { React, useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import ConfirmationModal from '../Utility/ConfirmationModal';
const API = require('../../screens/config/DBconfig');

function WelfareMatchingCard({data}){
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const openConfirmationModal = () => {
        setModalVisible(true);
    };

    const closeConfirmationModal = () => {
        setModalVisible(false);
    };

    const updateBookedStatus = async() => {
        setModalVisible(false);
        try {
            await axios.put(`${API}/updateStatus`, {
                BOOKED_STATUS: 'B',
                matchingID: data.matchingID.split(',')
            });
            
            // setModalVisible(false);
            // Use reset to prevent going back to this page
            navigation.reset({
                index: 0,
                routes: [{ 
                    name: 'WelfareHomePage',
                    params: { refresh: true }
                }],
            });
            console.log('succeed')
        } catch (error) {
            console.error('Update status error:', error);
            setModalVisible(false);
        } finally {
            setIsLoading(false);
        }

    }
    return (
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: data.TEMPLE_IMAGE ? `${API}${data.TEMPLE_IMAGE}`: `${API}/uploads/profilePictures/default.jpg` }}/>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.title}>{data.TEMPLE_NAME}</Text>
                    <Text style={styles.subtitle}>{data.TEMPLE_ADDRESS}</Text>
                </View>
                <View style={styles.eventContainer}>
                    <Text style={styles.eventName}>中元普渡</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.detailButton}
                    onPress={{}}>
                    <Text style={styles.detailText}>查看</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={openConfirmationModal}>
                    <Text style={styles.confirmText}>確認</Text>
                </TouchableOpacity>
            </View>
            <ConfirmationModal visible={modalVisible} onClose={closeConfirmationModal} orgName={data.TEMPLE_NAME} onUpdate={updateBookedStatus}/>
        </View>
    )
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    cardContainer:{
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: 0.88 * screenWidth,
        borderRadius: 12,
        padding: 20,
        // paddingHorizontal: 40,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // This is for Android shadow
    }, 
    imageContainer: {
        // width: 50,
        // height: 50,
        // borderRadius: '50%'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: '10%'
    },
    infoContainer: {
        flexDirection: 'column',
        gap: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: 0.4 * screenWidth
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 12
    },
    eventContainer: {
        backgroundColor: '#e8e4da',
        padding: 3,
        borderRadius: 3
    },
    eventName: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'orange'
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderColor: '#aaaaaa',
        borderWidth: 1,
        borderRadius: 8,
    },
    detailText: {
        color: '#aaaaaa',
    },
    confirmButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#FF7A00',
        borderRadius: 8,
    },
    confirmText: {
        fontWeight: 'bold',
        color: 'white',
    },
})

export default WelfareMatchingCard;