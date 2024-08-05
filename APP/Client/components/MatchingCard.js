import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const MatchingCard = ({infos}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case '已送達':
                return styles.delivered;
            case '配送中': 
                return styles.inTransit;
            case '未送出':
                return styles.notDelivered;
            default: 
                return styles.defaultStatus;
        }
    }
    return (
        <View style={styles.card}>
            {/* <Image source={infos.image} style={styles.image} /> */}
            <View style={styles.middleTitle}>
                <Text style={styles.titlePrimary}>{infos.institution}</Text>
                <Text style={styles.titleSecond}>{infos.address}</Text>
            </View>
            <View style={styles.state}>
                <Text style={getStatusColor(infos.state)}>{infos.state}</Text>
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
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5, // This is for Android shadow
        
    },
    titlePrimary: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    titleSecond: {
        fontSize: 15, 
    },
    state:{
        paddingTop: 20,
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
    }
});

export default MatchingCard;