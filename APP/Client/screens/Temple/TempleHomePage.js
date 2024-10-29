import React, { useState, useEffect, useContext } from 'react';
import { Button, Text, SafeAreaView, View, StyleSheet, FlatList, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import SectionHeader from '../../components/Utility/SectionHeader';
import EventCard from '../../components/Temple/EventCard';
import MatchingCard from '../../components/Temple/MatchingCard';
import Loading from '../../components/Utility/Loading';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig');

const { width } = Dimensions.get('window');

// TempleHomePage Screen 

function TempleHomePage() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { userId } = useContext(UserContext);
    const [templeData, setTempleData] = useState([]);
    const [eventData, setEventData] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false); // State for Refresh Control

    const fetchData = async () => {
        setLoading(true);
        try { 
            const templeResponse = await axios.get(`${API}/temples_info/${userId}`);
            setTempleData(templeResponse.data[0]);
            const eventResponse = await axios.get(`${API}/ceremony/${userId}`);
            setEventData(eventResponse.data);
            const matchResponse = await axios.get(`${API}/matchData?tID=${userId}`);
            setMatchData(matchResponse.data);
            setLoading(false);
        } catch (err) {
            setLoading(false); 
            setError(err); 
        } 
    };

    const onRefresh = async () => {
        // setRefreshing(true);
        const matchResponse = await axios.get(`${API}/matchData?tID=${userId}`);
        setMatchData(matchResponse.data);
        // setRefreshing(false);
    };
	const onRefreshEvent = async () => {
		const eventResponse = await axios.get(`${API}/ceremony/${userId}`);
    	setEventData(eventResponse.data);
	}

    useEffect(() => {
        // Get data from db 
        fetchData();
    }, []); 
  
    if (loading) return <Loading />;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top + 30,
                paddingBottom: insets.bottom + 80,
                paddingLeft: insets.left + 30,
                paddingRight: insets.right + 30
            }]}>  
                <View style={{ width: width * 0.95, flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'center', marginBottom: 35 }}>
                    <MaterialIcons name="temple-buddhist" size={30} color="orange" style={{ marginRight: 8 }} />
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4F4F4F' }}>{'歡迎回來 ! '}{templeData.NAME}</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <SectionHeader title={'法會資訊'} onPress={() => navigation.navigate('TempleEventPage')} />
                    <FlatList
                        data={eventData}
                        renderItem={({ item }) => (
                            <EventCard
                                event={item}
								temple={templeData}
                                size="square"
                            />
                        )}
                        keyExtractor={(item) => item.eID.toString()} 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollView}
						refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefreshEvent} // Call onRefresh when user pulls down
                            />
                        }
                    />
                </View>
                <View style={[styles.sectionContainer, styles.matchingContainer]}>
                    <SectionHeader title="媒合訊息" onPress={() => navigation.navigate('MatchingPage')} />
					<View style={styles.statusIndicatorContainer}>
						<View style={styles.statusDetail}>
							<MaterialCommunityIcons name="account-clock" color={"#aaaaaa"} size={20} />
							<Text style={{ color: "#aaaaaa" }}>未預定</Text>
						</View>
						<View style={styles.statusDetail}>	
							<MaterialCommunityIcons name="account-alert" color={"#FF681E"} size={20} />
							<Text style={{ color: "#D3212C" }}>未確認</Text>
						</View>
						<View style={styles.statusDetail}>
							<MaterialCommunityIcons name="truck-delivery" color={"#FF980E"} size={20} />
							<Text style={{ color: "#FF980E" }}>配送中</Text>
						</View>
						<View style={styles.statusDetail}>
							<MaterialCommunityIcons name="account-check" color={"#069C56"} size={20} />
							<Text style={{ color: "#068c56" }}>已送達</Text>
						</View>
					</View>
                    <FlatList
                        data={matchData}
                        renderItem={({ item }) => <MatchingCard infos={item} />}
                        keyExtractor={(item) => item.matchingID}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} // Call onRefresh when user pulls down
                            />
                        }
						contentContainerStyle={{ paddingBottom: 180 }}
                    />
					
                </View>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 30,
    },
    scrollView: {
        paddingLeft: 16,
    },
    matchingContainer: {
        paddingBottom: 120
    },
	statusIndicatorContainer: {
		margin: 6,
		flexDirection: 'row',
		width: '100%' ,
		flexWrap: 'wrap'
	  }, 
	  statusDetail: {
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8
	  },
})

export default TempleHomePage;
