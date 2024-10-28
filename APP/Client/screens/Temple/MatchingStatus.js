import { React, useEffect, useState, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import PageTitle from '../../components/Utility/PageTitle';
import MatchingCard from '../../components/Temple/MatchingCard';
import SetButton from '../../components/Utility/SetButton';
import MatchingInfoCard from '../../components/Temple/MatchingInfoCard'
import { FlatList } from 'react-native-gesture-handler';
import { UserContext } from '../../components/Context/UserContext';
import LoadingScreen from '../../components/Utility/Loading';

const API = require('../config/DBconfig');
function MatchingStatus() {
    const insets = useSafeAreaInsets();
    const { userId } = useContext(UserContext);
    const [matchData, setMatchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Replace with your API endpoint
        axios.get(`${API}/matchData?tID=${userId}`)
            .then(response => {
                setMatchData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    if(loading) return (<LoadingScreen />);
    if(error) return (<View><Text>Error: {error}</Text></View>);
    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top - 30,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                {matchData && matchData.length > 0 ? (
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={matchData}
                        renderItem={({ item }) => <MatchingInfoCard infos={item}/>}
                        keyExtractor={(item) => item.matchingID}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                ) : (
                    <View><Text>沒有媒合資料</Text></View> // Default text when matchData is null or empty
                )}
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    },
});

export default MatchingStatus;