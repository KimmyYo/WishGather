import React, {useState} from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, FlatList, Pressable, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import EventCard from '../components/EventCard';
import PageTitle  from '../components/PageTitle';

function TempleEventPage({route}){
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const events = [
		{ id: '1', title: '正月十五', date: '2024-01-15', imageUrl: 'https://example.com/image1.jpg' },
		{ id: '2', title: '七月十五', date: '2024-07-15', imageUrl: 'https://example.com/image2.jpg' },
		{ id: '3', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '4', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '5', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '6', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '7', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '8', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '9', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '10', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
        { id: '11', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
		// Add more events as needed
	  ];

    return(
        <SafeAreaProvider>
            <View style={{
                flex: 1,
                justifyContent: 'start',
                alignItems: 'start',
                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }}>
                <Pressable 
                style={styles.pressBack}
                onPress={() => navigation.navigate('TempleHomePage')}>
                    <Text>Back</Text>
                </Pressable>
                <PageTitle titleText="法會資訊"></PageTitle>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={events}
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
                                        event: { id: '12', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
                                        forEdit: false
                                    })}>
                                    {/* should get newest id from db? after or before add succeed*/}
                    <Ionicons name="add-outline" size={30}/>
                </Pressable>
            </View>
        </SafeAreaProvider>
    )
} 

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    flatListContainer: {
        height: screenHeight,
        width: screenWidth,
    },
    flatList:{
        flex: 1
    },
    pressBack: {
        width: screenWidth,
        height: 30,
        padding: 5,
        fontSize: 50
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
    }
})

export default TempleEventPage;