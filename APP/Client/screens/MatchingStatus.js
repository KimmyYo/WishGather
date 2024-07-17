import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageTitle from '../components/PageTitle';
import MatchingCard from '../components/MatchingCard';
import { FlatList } from 'react-native-gesture-handler';
const matchingInformation = [
    {id: '1', institution: '快樂長照機構', address: '前金區民權街36號', state: '已送達'},
    {id: '2', institution: '開心長照機構', address: '前金區民權街36號', state: '配送中'},
    {id: '3', institution: '哈哈長照機構', address: '前金區民權街36號', state: '未送出'},
]
function MatchingStatus() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaProvider>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left + 40 ,
                    paddingRight: insets.right
                }}
            >
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

export default MatchingStatus;