import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelfareHomePage from '../../screens/Welfare/WelfareHomePage';




const Stack = createNativeStackNavigator();

function WelfareHomeStack(){
  return (
    <Stack.Navigator
        screenOption = {{ headerShown: false }}
        initialRouteName='WelfareHomePage'
    >
      <Stack.Screen
        name = 'WelfareHomePage'
        component = { WelfareHomePage }
        options = {{ headerShown: false }}
      />
     
    </Stack.Navigator>
  )
}

export default WelfareHomeStack;