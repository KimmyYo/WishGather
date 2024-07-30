import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageTitle from '../components/PageTitle';
import MatchingInstitution from './MatchingInstitution';
import MatchingStatus from './MatchingStatus';

const Tab = createMaterialTopTabNavigator();


function MatchingPage() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    return (
        <SafeAreaProvider>
            <View
            style={{
                paddingTop: insets.top,
                paddingBottom: 0,
                paddingLeft: insets.left ,
                paddingRight: insets.right
            }}>
                <Pressable 
                onPress={() => navigation.navigate('TempleHomePage')}>
                    <Text>Back</Text>
                </Pressable>
                <PageTitle titleText="媒合"></PageTitle>
            </View>
            
            <Tab.Navigator 
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 20, fontWeight: "semibold"},
                    tabBarIndicatorStyle: { backgroundColor: '#F6AB3A'},
            }}>
                <Tab.Screen name="訊息" component={MatchingStatus} />
                <Tab.Screen name="機構" component={MatchingInstitution} />
            </Tab.Navigator>            
        </SafeAreaProvider>
    )
}

export default MatchingPage;