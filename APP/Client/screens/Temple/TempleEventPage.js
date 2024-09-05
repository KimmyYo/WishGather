import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, Pressable, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

import GoBackButton1 from "../../components/Utility/GoBackButton1";
import EventCard from '../../components/Temple/EventCard';
import PageTitle  from '../../components/Utility/PageTitle';


const API = require('../config/DBconfig')
function TempleEventPage({route}){
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Replace with your API endpoint
        axios.get(`${API}/temples_info`)
            .then(response => {
                setEventData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    return(
        <SafeAreaProvider>
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'start',
                alignItems: 'start',
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }}>
                <GoBackButton1 destination="TempleHomePage" />

                <PageTitle titleText="法會資訊" iconName="event" /> 

                <View style={styles.flatListContainer}>
                    <FlatList
                        data={eventData}
                        renderItem={({ item }) => <EventCard event={ item } size="rectangle" />}
                        keyExtractor={(item) => item.id}
                        vetical
                        contentContainerStyle={styles.scrollView}
                        style={styles.flatList}
                    />
                </View>

                <Pressable style={styles.addBtn} 
                           onPress={() => 
                                    navigation.navigate('EditTempleInfoPage', 
                                    { 
                                        event: { date: date },
                                        forEdit: false
                                    })}>
                                    {/* should get newest id from db? after or before add succeed*/}
                    <Ionicons name="add-outline" color={"white"} size={30}/>
                </Pressable>

            </View>
        </SafeAreaProvider>
    )
} 

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    flatListContainer: {
        width: screenWidth,
        height: screenHeight,
    },
    flatList:{
        flex: 1
    },
    addBtn:{
        backgroundColor: "orange",
        color: "white",
        borderRadius: 50,
        padding: 20,
        // Check device 
        position: "absolute",
        bottom: 30,
        right: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,  
        elevation: 5
    }
})

export default TempleEventPage;