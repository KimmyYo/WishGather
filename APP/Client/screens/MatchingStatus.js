import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageTitle from '../components/PageTitle';
import MatchingCard from '../components/MatchingCard';
import SetButton from '../components/SetButton';
import MatchingInfoCard from '../components/MatchingInfoCard'
import { FlatList } from 'react-native-gesture-handler';
// pass matching insituition info
const matchingInformation = [
    {id: '1', institution: '快樂長照機構', address: '前金區民權街36號', state: '已送達'},
    {id: '2', institution: '開心長照機構', address: '前金區民權街36號', state: '配送中'},
    {id: '3', institution: '哈哈長照機構', address: '前金區民權街36號', state: '未送出'},
]
function MatchingStatus() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaProvider>
            <View style={[styles.container, {
                paddingTop: insets.top - 30,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={matchingInformation}
                        renderItem={({ item }) => <MatchingInfoCard instituitionName="快樂老人社福機構" status="A" />}
                        keyExtractor={(item) => item.id}
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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