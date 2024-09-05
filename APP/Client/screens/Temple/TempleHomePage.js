import React, {useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';


import SectionHeader from '../../components/Utility/SectionHeader';
import EventCard from '../../components/Temple/EventCard';
import MatchingCard from '../../components/Temple/MatchingCard';
import TempleEventPage from './TempleEventPage';

const { width, height } = Dimensions.get('window');
const API = require('../config/DBconfig')

// TempleHomePage Screen 

function TempleHomePage() {
    const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const templeID = useRef(1);
	const [eventData, setEventData] = useState([]);
	const [matchData, setMatchData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try { 
			// Fetch event data
			const eventResponse = await axios.get(`${API}/temples_info`);
			setEventData(eventResponse.data);

			// // Fetch match data
			// const matchResponse = await axios.get(`${API}/match/${1}`);
			// setMatchData(matchResponse.data);
		} catch (err) {
			setError(err); 
		} 
	};

    useEffect(() => {
        fetchData();
    }, []); // Add templeID as a dependency
  
	// if (loading) return <Text>Loading...</Text>;
	if (error) return <Text>Error: {error.message}</Text>;
    return (
      <SafeAreaProvider>
        <View style={{
          flex: 1,
		  backgroundColor:'white',
          justifyContent: 'start',
          alignItems: 'start',
		 
          // Paddings to handle safe area
          paddingTop: insets.top + 25,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 30,
          paddingRight: insets.right + 30 
        }}>
			<View style={{width: width*0.95, flexDirection: 'row',justifyContent:'flex-start', alignSelf:'center' ,marginBottom: 35}}>
				<MaterialCommunityIcons name="home-heart" size={30} color="orange" style={{marginRight: 8}} />
				<Text style={{fontSize:24, fontWeight:'bold', color:'#4F4F4F'}}>歡迎回來 ! 高雄文武聖殿</Text>
			</View>

			<View style={styles.infoContainer}>
				
				<SectionHeader title="法會資訊" onPress={() => navigation.navigate('TempleEventPage')}/>
				<FlatList
						data={eventData}
						renderItem={({ item }) => <EventCard event={item} size="square" />}
						keyExtractor={(item) => item.tNO}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.scrollView}
				/>
			</View>  
			<View style={styles.infoContainer}>
				<SectionHeader title="媒合訊息" onPress={() => navigation.navigate('MatchingPage')}/>
				<FlatList
						data={matchData}
						renderItem={({ item }) => <MatchingCard infos={item} />}
						keyExtractor={(item) => item.wID}
						vertical
				/>
			</View>
			
        </View>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
	infoContainer:{
		width: width * 0.95,
		backgroundColor:"white",
		justifyContent:'center',
		alignSelf:'center',

		paddingHorizontal: 10,
		paddingVertical: 15,
		marginBottom: 40,
		borderTopWidth: 1,
		borderColor: '#ccc',	
	},
	scrollView: {
		paddingLeft: 16,
	},
})

export default TempleHomePage;
