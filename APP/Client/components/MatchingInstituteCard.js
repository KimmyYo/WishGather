import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, Image, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import InfoTag from './InfoTag';

function MatchingInstituteCard({ institute }) {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <Image source={require("../assets/welfare-sample.png")} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.instituteName}>{institute.name}</Text>
                    <Text style={styles.instituteAddress}>{institute.address}</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <InfoTag label="距離" value={institute.distance} />
                <InfoTag label="類型" value={institute.type} />
                <InfoTag label="人數" value={institute.numberOfPeople} />
            </View>
        </View>
    );
}

let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,

        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 30,
        width: screenWidth * 0.8,
        height: "auto",
        paddingVertical: 30,
        paddingHorizontal: 18

    },
    upperContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20
    },
    image: {
        width: 60, 
        height: 60,
    },
    instituteName: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8
    },
    instituteAddress: {
        fontSize: 15,
    },
    bottomContainer: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    }


});

export default MatchingInstituteCard;