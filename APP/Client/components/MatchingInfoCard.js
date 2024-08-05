import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

function MatchingInfoCard({instituitionName, status}){
    const { matchingStatus } = status;
    let statusText;
    switch (status) {
        case "A": 
            statusText = styles.waitStatus;
            break;
        case "B":
            statusText = styles.confirmedStatus;
            break;
        default :
            statusText = styles.defaultStatus;
    }
    // get welfare icon from database using instituition name 
    return (
        <View style={styles.cardContainer}>
            <View style={styles.logoContainer}>
                <Image style={styles.image} source={require("../assets/welfare-sample.png")}/>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{ instituitionName }</Text>
                    <Text style={statusText}>媒合待確認</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.btnText}>內容</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </View>
    )
}

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    cardContainer:{
        width: screenWidth * 0.8,
        height: screenWidth * 0.6,
       
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 40,

        backgroundColor: "white",
        borderWidth: "1px",
        borderColor: "#ccc",
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 35,
        peddingTop: 10
        
    },
    bottomContainer: {
        width: "90%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    infoContainer:{
        gap: 8,
    },
    image:{
        width: 85,
        height: 85,
    },
    title:{
        fontSize: 20,
        fontWeight: "bold"
    },
    button:{
        paddingHorizontal: 17,
        paddingVertical: 10,
        backgroundColor: "#F6AB3A",
        borderRadius: 8
    },
    btnText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    waitStatus:{
        fontSize: 16,
        color: "#F6AB3A",
        fontWeight: "bold"
    },
    confirmedStatus: {
        color: "#0b961b",
        fontWeight: "bold"
    },
    defaultStatus: {
        color: "#ccc",
        fontWeight: "bold"
    }
})


export default MatchingInfoCard;