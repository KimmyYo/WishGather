import React, {useState} from 'react';
import {Button, Text, SafeAreaView, View, StyleSheet, FlatList, Pressable, Dimensions} from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

function PageTitle({titleText}){
    return (
        <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitleText}>{ titleText }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pageTitleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

        padding: 30,
        
    },
    pageTitleText: {
        fontSize: 40,
        fontWeight: "bold"
    }
})

export default PageTitle;
