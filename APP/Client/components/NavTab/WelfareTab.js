import React from 'react'
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WelfareHomePage from '../../screens/Welfare/WelfareHomePage';
import WelfareTransportPage from '../../screens/Welfare/WelfareTransportPage';
import WelfareUserPage from '../../screens/Welfare/WelfareUserPage';
import WelfareMatchingPage from '../../screens/Welfare/WelfareMatchingPage';
import UserPage from '../../screens/Common/UserPage';



const Tab = createMaterialBottomTabNavigator();
function WelfareTab(){
    return (
      <Tab.Navigator
        initialRouteName='WelfareHomePage'
        activeColor="#FF7A00"
        inactiveColor="#CCCCCC"
        shifting={true}
        barStyle={{ backgroundColor: 'white', opacity: '0.8'}}
      >
          <Tab.Screen   
            name="主頁" 
            component={WelfareHomePage}
            options={{
              tabBarLabel: '主頁',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home-variant" color={color} size={26} />)
            }}
          />
          <Tab.Screen 
            name="媒合" 
            component={WelfareMatchingPage} 
            options={{
              tabBarLabel: '媒合',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="puzzle" color={color} size={26}/>)
            }}
          />
          <Tab.Screen 
            name="運送" 
            component={WelfareTransportPage}
            options={{
              tabBarLabel: '運送',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="emoji-transportation" color={color} size={26}/>)
            }} 
          />
         
          <Tab.Screen
            name="使用者"
            component={UserPage}
            options={{
              tabBarLabel: '使用者',
              tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account" color={color} size={26}/>)
            }}
          />

      </Tab.Navigator>
    )
}

export default WelfareTab;

