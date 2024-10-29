import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TempleHomePage from '../../screens/Temple/TempleHomePage';
import TempleEventPage from '../../screens/Temple/TempleEventPage';
import TempleDeliverPage from '../../screens/Temple/TempleDeliverPage';
import EditTempleInfoPage from '../../screens/Temple/EditTempleInfoPage';
import MatchingPage from '../../screens/Temple/MatchingPage';
import OfferingHome from '../../screens/Temple/OfferingHome';
import OfferingEditPage from '../../screens/Temple/OfferingEditPage';
import OfferingUpload from '../../screens/Temple/OfferingUpload';
import FoodScanningPage from '../../screens/Temple/FoodScanningPage';
import ScanResult from '../../screens/Temple/ScanResult';
import SubmissionResult from '../../screens/Temple/SubmissionResult';

const Stack = createNativeStackNavigator();

function TempleHomeStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="TempleHomePage"
                component={TempleHomePage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="TempleEventPage"
                component={TempleEventPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="MatchingPage"
                component={MatchingPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TempleDeliverPage"
                component={TempleDeliverPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="EditTempleInfoPage"
                component={EditTempleInfoPage}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OfferingHome"
                component={OfferingHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name = 'OfferingEditPage'
                component = { OfferingEditPage }
                options = {{ headerShown: false }}
            />
            <Stack.Screen
                name = 'OfferingUpload'
                component = { OfferingUpload }
                options = {{ headerShown: false }}
            />
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

            <Stack.Screen 
                name="SubmissionResult"
                component={SubmissionResult}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

// Stack for food scanning 
function TempleFoodStack(){

}

export default TempleHomeStack;