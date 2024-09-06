import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TempleHomePage from '../../screens/Temple/TempleHomePage';
import TempleEventPage from '../../screens/Temple/TempleEventPage';
import TempleDeliverPage from '../../screens/Temple/TempleDeliverPage';
import FoodScanningPage from '../../screens/Temple/FoodScanningPage';
import ScanResult from '../../screens/Temple/ScanResult';
import EditTempleInfoPage from '../../screens/Temple/EditTempleInfoPage';
import MatchingPage from '../../screens/Temple/MatchingPage';
const Stack = createNativeStackNavigator();

function TempleScanStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="FoodScanningPage"
                component={FoodScanningPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="ScanResult"
                component={ScanResult}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default TempleScanStack;