import React, {useState, useEffect, useRef, useContext } from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, FlatList} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SectionHeader from '../../components/Utility/SectionHeader';
import EventCard from '../../components/Temple/EventCard';
import MatchingCard from '../../components/Temple/MatchingCard';
import MatchingInfoCard from '../../components/Temple/MatchingInfoCard';
import TempleEventPage from './TempleEventPage';
import Loading from '../../components/Utility/Loading';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig')

// TempleHomePage Screen 

function OfferingHome() {
    const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	const { userId } = useContext(UserContext);
	const [templeData, setTempleData] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	var response;
	const fetchData = async () => {
		try { 
			response = await axios.get(`${API}/temples_info/${userId}`);
			setTempleData(response.data[0]);


			setLoading(false);
		} catch (err) {
			setLoading(false); 
			setError(err); 
		} 
	};

    useEffect(() => {
		// Get pId from db 
        fetchData();
    }, []); // Add templeID as a dependency
  
	if (loading) return <Loading />;
	if (error) return <Text>Error: {error.message}</Text>;

    return (
      <SafeAreaProvider>
        <View style={[styles.container,
          // Paddings to handle safe area
          {paddingTop: insets.top + 100,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 30,
          paddingRight: insets.right + 30} 
        ]}>  
       
			<View style={styles.sectionContainer}>
				<SectionHeader title="上架供品" onPress={() => navigation.navigate('OfferingUpload')}/>

			</View>
			<View style={styles.sectionContainer}>
				<SectionHeader title="配送供品" onPress={() => navigation.navigate('FoodScanningPage')}/>

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
})

export default OfferingHome;