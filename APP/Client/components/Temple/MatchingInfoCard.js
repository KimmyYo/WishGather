import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const API = require('../../screens/config/DBconfig');
function MatchingInfoCard({ infos }) {
    const navigation = useNavigation();

    const renderStatusIcon = () => {
        if(infos.BOOKED_STATUS == '未預定'){
            return (
                <View style={styles.indicatorContainer}>
                    <Text>媒合狀態：</Text>
                    <Text>{infos.BOOKED_STATUS}</Text>
                    <MaterialCommunityIcons name="account-clock" color={"#aaaaaa"} size={20} />
                </View>
            )
        }
        else if(infos.CONFIRMED_STATUS == '未確認'){
            return (
                <View style={styles.indicatorContainer}>
                    <Text>媒合狀態：</Text>
                    <Text>{infos.CONFIRMED_STATUS}</Text>   
                    <MaterialCommunityIcons name="account-alert" color={"#FF681E"} size={20} />) 
                </View>
            )
        }
        else if(infos.DELIVER_STATUS == '配送中'){
            return (
                <View style={styles.indicatorContainer}>
                    <Text>媒合狀態：</Text>
                    <Text>{infos.DELIVER_STATUS}</Text>
                    <MaterialCommunityIcons name="truck-delivery" color={"#FF980E"} size={20} />
                </View>
            )
        }
        else if(infos.DELIVER_STATUS == "已送達"){
            return (<View style={styles.indicatorContainer}>
                        <Text>媒合狀態：</Text>
                        <Text>{infos.DELIVER_STATUS}</Text>
                        <MaterialCommunityIcons name="account-check" color={"#FF980E"} size={20} />
                    </View>
            )
        }
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.logoContainer}>
            <Image style={styles.image} source={{ uri: infos.WELFARE_IMAGE ? `${API}${infos.WELFARE_IMAGE}`: `${API}/uploads/profilePictures/default.jpg` }} />
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{ infos.WELFARE_NAME }</Text>
                    {renderStatusIcon()}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TempleDeliverPage', { welfare: infos})}>
                        <Text style={styles.btnText}>查看內容</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </View>
    );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    cardContainer: {
        width: screenWidth * 0.9,
        height: 220,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
        marginVertical: 8,
        paddingHorizontal: 5,
        paddingVertical: 35,
    },
    logoContainer:{
        marginBottom: 10,
        padding: 5,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: '50%'
    },
    bottomContainer: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginTop: 10,
    },
    
    infoContainer: {
        gap: 8,
    },
    
    title: {
        color: "#4F4F4F",
        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        paddingHorizontal: 17,
        paddingVertical: 10,
        backgroundColor: "orange",
        borderRadius: 8
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    waitStatus: {
        fontSize: 16,
        color: "red",
        fontWeight: "bold"
    },
    confirmedStatus: {
        color: "green",
        fontWeight: "bold"
    },
    defaultStatus: {
        color: "#ccc",
        fontWeight: "bold"
    },
    indicatorContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MatchingInfoCard;
