import React, {useState, useEffect, useRef, useContext } from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';

import Loading from '../../components/Utility/Loading';
import { UserContext } from '../../components/Context/UserContext';

const API = require('../config/DBconfig')

const { width } = Dimensions.get('window');
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
          {paddingTop: insets.top + 30,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 30,
          paddingRight: insets.right + 30} 
        ]}>  

			<View style={styles.btncontainer}><GoBackButton1 /></View>
			<PageTitle iconName="outbox" titleText="功能選擇" />
			
			<View style={styles.listContainer}>
				<View style={styles.listItem}>
					<TouchableOpacity 
						style={styles.itemContent}
						onPress={() => navigation.navigate('OfferingUpload')}
					>
						<AntDesign name="cloudupload" size={24} color="#FF9C33" />
						<Text style={styles.itemText}>供品上架</Text>
						<AntDesign name="right" size={20} color="#ccc" style={styles.chevron} />
					</TouchableOpacity>
					<View style={styles.orangeBar} />
				</View>

				<View style={styles.listItem}>
					<TouchableOpacity 
						style={styles.itemContent}
						onPress={() => navigation.navigate('OfferingEditPage')}
					>
						<AntDesign name="edit" size={24} color="#FF9C33" />
						<Text style={styles.itemText}>供品編輯</Text>
						<AntDesign name="right" size={20} color="#ccc" style={styles.chevron} />
					</TouchableOpacity>
					<View style={styles.orangeBar} />
				</View>

				<View style={styles.listItem}>
					<TouchableOpacity 
						style={styles.itemContent}
						onPress={() => navigation.navigate('FoodScanningPage')}
					>
						<AntDesign name="scan1" size={24} color="#FF9C33" />
						<Text style={styles.itemText}>供品辨識</Text>
						<AntDesign name="right" size={20} color="#ccc" style={styles.chevron} />
					</TouchableOpacity>
					<View style={styles.orangeBar} />
				</View>
            </View>
        </View>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
	btncontainer:{
		position: 'absolute',
		top: 60,
		left: 10,
	  },
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
	},
	listContainer: {
		flex: 1,
		width: width,
		paddingHorizontal: 15,
		borderTopWidth: 1,
		borderTopColor: '#ccc',
	},
	listItem: {
		width: width,
		height: 100,
		position: 'relative',
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		justifyContent:'center',
	},
	itemContent: {
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 30,  
		gap:10,
	},
	itemText: {
		flex: 1,  
		fontSize: 24,
		color: '#4F4F4F',
		fontWeight: 'bold',
	},
	orangeBar: {
		position: 'absolute',
		left: 0,
		width: 4,
		height: 80,
		backgroundColor: '#FF9C33',
		borderRadius: 2,
		
	},
	chevron: {
		marginLeft: 'auto', 
	},
	
})

export default OfferingHome;