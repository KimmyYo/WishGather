import { React, useState, useEffect, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import InfoTag from './InfoTag';
import axios from 'axios'
import { UserContext } from '../../components/Context/UserContext';


const API = require('../../screens/config/DBconfig');

function MatchingInstituteCard({ institute }) {
    const { userId } = useContext(UserContext); // Get userId from context
    const [distance, setDistance] = useState(0);
    const [temple, setTempleData] = useState([]);

    useEffect(() => {
        const fetchTempleData = async () => {
            try {
                const templeResponse = await axios.get(`${API}/temples_info/${userId}`);
                setTempleData(templeResponse.data);
            } catch (error) {
                console.error('Error fetching temple data:', error);
                // Handle error as needed (e.g., show a message to the user)
            }
        };
        fetchTempleData();
    }, [userId]); // Make sure to include userId as a dependency

    useEffect(() => {
        if (temple.length > 0 && institute.COORDINATE) {
            const calcDistance = calculateDistance(
                temple[0].COORDINATE.y,  // Assuming latitude is stored as 'y'
                temple[0].COORDINATE.x,  // Assuming longitude is stored as 'x'
                institute.COORDINATE.y,
                institute.COORDINATE.x
            );
            setDistance(calcDistance);
        }
    }, [temple, institute.COORDINATE]); // Recalculate distance when temple or institute coordinates change

    // Calculate distance between two points
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return Math.round(d * 100) / 100; // Return distance rounded to 2 decimal places
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                {/* Replace with an image if necessary */}
                <View>
                    <Text style={styles.instituteName}>{institute.NAME}</Text>
                    <Text style={styles.instituteAddress}>{institute.ADDRESS}</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <InfoTag label="距離" value={distance ? `${distance} km` : "無法計算距離"} />
                <InfoTag label="人數" value={institute.NUM_OF_PEOPLE} />
            </View>
        </View>
    );
}

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,

        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 30,
        width: screenWidth * 0.9,
        height: "auto",
        paddingVertical: 30,
        paddingHorizontal: 18

    },
    upperContainer: {
        width: "90%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20
    },
    image: {
        width: 60, 
        height: 60,
    },
    instituteName: {
        color: "#4F4F4F",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8
    },
    instituteAddress: {
        color: "#9D9D9D",
        fontSize: 15,
    },
    charaContainer: {
        width: "400px"
    },
    bottomContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        flexWrap: "wrap",
    }


});

export default MatchingInstituteCard;