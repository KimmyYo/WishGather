import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OfferingPage from '../../screens//Believer/OfferingPage';
import OfferingsByTemple from '../../screens/Believer/OfferingsByTemple';
import TemplesByOffering from '../../screens/Believer/TemplesByOffering';
import OrderConfirmationPage from '../../screens/Believer/OrderConfirmationPage';
import OrderSuccess from '../../screens/Believer/OrderSuccess';
import OrderHistoryPage from '../../screens/Believer/OrderHistoryPage';
import SavedTemples from '../../screens/Believer/SavedTemples';
import ProfileManagement from '../../screens/Believer/ProfileManagement';


const Stack = createNativeStackNavigator();

function BelieverOfferingStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='OfferingPage'
    >
      <Stack.Screen
        name = 'OfferingPage'
        component = { OfferingPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'TemplesByOffering'
        component = { TemplesByOffering }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OfferingsByTemple'
        component = { OfferingsByTemple }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OrderConfirmationPage'
        component = { OrderConfirmationPage }
        options = {{ headerShown: false }}
      />
      <Stack.Screen
        name = 'OrderSuccess'
        component = { OrderSuccess }
        options = {{ headerShown: false }}
      />
      
    </Stack.Navigator>
  )
}

export default BelieverOfferingStack;