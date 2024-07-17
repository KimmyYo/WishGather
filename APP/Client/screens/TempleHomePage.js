import React, {useState} from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, FlatList} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import SectionHeader from '../components/SectionHeader';
import EventCard from '../components/EventCard';
import MatchingCard from '../components/MatchingCard';
import TempleEventPage from './TempleEventPage';


// TempleHomePage Screen 

function TempleHomePage() {
    const insets = useSafeAreaInsets();
	const navigation = useNavigation();
	const events = [
		{ id: '1', title: '正月十五', date: '2024-01-15', imageUrl: 'https://example.com/image1.jpg' },
		{ id: '2', title: '七月十五', date: '2024-07-15', imageUrl: 'https://example.com/image2.jpg' },
		{ id: '3', title: '中元節', date: '2024-08-15', imageUrl: 'https://example.com/image3.jpg' },
		// Add more events as needed
	  ];
	const matchingInformation = [
		{id: '1', institution: '快樂長照機構', address: '前金區民權街36號', state: '已送達'},
		{id: '2', institution: '開心長照機構', address: '前金區民權街36號', state: '配送中'},
		{id: '3', institution: '哈哈長照機構', address: '前金區民權街36號', state: '未送出'},
	]
    return (
      <SafeAreaProvider>
        <View style={{
          flex: 1,
          justifyContent: 'start',
          alignItems: 'start',
  
          // Paddings to handle safe area
          paddingTop: insets.top + 100,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 30,
          paddingRight: insets.right + 30 
        }}>  
			<SectionHeader title="文武聖殿法會" onPress={() => navigation.navigate('TempleEventPage')}/>
			<FlatList
					data={events}
					renderItem={({ item }) => <EventCard event={item} size="square" />}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.scrollView}
			/>
			<SectionHeader title="媒合訊息" onPress={() => navigation.navigate('MatchingPage')}/>
			<FlatList
					data={matchingInformation}
					renderItem={({ item }) => <MatchingCard infos={item} />}
					keyExtractor={(item) => item.id}
					vertical
			/>
        </View>
      </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
	scrollView: {
		paddingLeft: 16,
	  },
})

export default TempleHomePage;
