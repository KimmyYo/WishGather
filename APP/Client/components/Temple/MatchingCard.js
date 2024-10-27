import { React, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
const API = require('../../screens/config/DBconfig');

const MatchingCard = ({infos}) => {
    const [statusText, setStatusText] = useState("");
    const [statusColor, setStatusColor] = useState(styles.defaultStatus);
    useEffect(() => {
        switch (infos.DELIVER_STATUS) {
            case '未配送':
                setStatusText('未送出');
                setStatusColor(styles.notDelivered);
                break;
            case '配送中': 
                setStatusText('配送中');
                setStatusColor(styles.inTransit);
                break;
            case '已送達':
                setStatusText('已送達');
                setStatusColor(styles.delivered);
                break;
            default: 
                setStatusColor(styles.defaultStatus);
        }
    }, [infos.MATCHING_STATUS]);

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: infos.IMAGE ? `${API}${infos.IMAGE}`: `${API}/uploads/profilePictures/default.jpg` }} />
            </View>
            <View style={styles.middleTitle}>
                <Text style={styles.titlePrimary}>{infos.NAME}</Text>
                <Text style={styles.titleSecond}>{infos.ADDRESS}</Text>
            </View>
            <View style={styles.state}>
                <Text style={statusColor}>{statusText}</Text>
            </View>
        </View>
    );
};

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.8,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        gap: '12',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // This is for Android shadow
        
    },
    middleTitle: {
        width: 0.38 * screenWidth,
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start'
    },
    titlePrimary: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    titleSecond: {
        fontSize: 12, 
    },
    state:{
        width: 0.2 * screenWidth,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'end',
        alignItems:'end'
    },
    delivered: {
        color: 'green'
    },
    inTransit: {
        color: 'orange'
    },
    notDelivered: {
        color: 'red'
    },
    defaultStatus:{
        color: '#333'
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: '50%'
    }
});

export default MatchingCard;