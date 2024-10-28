import { React, useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/Context/UserContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const API = require('../../screens/config/DBconfig');
const MatchingCard = ({infos}) => {
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [statusText, setStatusText] = useState('');
    const [statusColor, setStatusColor] = useState(styles.defaultStatus);

    const renderStatusIcon = () => {
        if(infos.BOOKED_STATUS == '未預定'){
            return (<MaterialCommunityIcons name="account-clock" color={"#aaaaaa"} size={26} />)
        }
        else if(infos.CONFIRMED_STATUS == '未確認'){
            return (<MaterialCommunityIcons name="account-alert" color={"#FF681E"} size={26} />)
        }
        else if(infos.DELIVER_STATUS == '配送中'){
            return (<MaterialCommunityIcons name="truck-delivery" color={"#FF980E"} size={26} />)
        }
        else if(infos.DELIVER_STATUS == "已送達"){
            return (<MaterialCommunityIcons name="account-check" color={"#069C56"} size={26} />)
        }
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate('TempleDeliverPage', { welfare: infos})}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: infos.WELFARE_IMAGE ? `${API}${infos.WELFARE_IMAGE}`: `${API}/uploads/profilePictures/default.jpg` }} />
                </View>
                <View style={styles.middleTitle}>
                    <Text style={styles.titlePrimary}>{infos.WELFARE_NAME}</Text>
                    <Text style={styles.titleSecond}>{infos.WELFARE_ADDRESS}</Text>
                </View>
                <View style={styles.state}>
                    {renderStatusIcon()}
                </View>
            </View>
        </TouchableOpacity>
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
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end'
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