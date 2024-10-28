import { React, useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core'; 
import { UserContext } from '../Context/UserContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const API = require('../../screens/config/DBconfig');
function WelfareDeliverCard({data}){
    const [deliverStatus, setDeliverStatus] = useState(data.DELIVER_STATUS);
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
            </View>
            <View style={styles.statusContainer}>
                {deliverStatus == '未配送' && (<MaterialCommunityIcons name="package-variant" color={"#D3212C"} size={26} />)}
                {deliverStatus == '配送中' && (<MaterialCommunityIcons name="truck-delivery" color={"#FF980E"} size={26} />)}
                {deliverStatus == '已送達' && (<MaterialCommunityIcons name="account-check" color={"#069C56"} size={26} />)}
            </View>
        </View>
    )
}
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    cardContainer:{
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: 0.88 * screenWidth,
        borderRadius: 12,
        padding: 15,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // This is for Android shadow
    }, 
    imageContainer: {
    },
    image: {
        width: 60,
        height: 60,
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
    statusContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginTop: 30
    }
})

export default WelfareDeliverCard;