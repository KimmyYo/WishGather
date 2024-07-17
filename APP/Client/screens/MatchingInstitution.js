import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PageTitle from '../components/PageTitle';

function MatchingInstitution() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaProvider>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left ,
                    paddingRight: insets.right
                }}
            >
                 <PageTitle titleText="媒合機構"></PageTitle>
                <Text>Institution</Text>
            </View>
        </SafeAreaProvider>
    )
}

export default MatchingInstitution;