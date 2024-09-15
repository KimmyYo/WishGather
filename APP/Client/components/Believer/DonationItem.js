import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import RadioButton from "expo-checkbox"; // You may use a Radio Button library for better control.

const { width } = Dimensions.get('window');

const DonationItem = ({ title }) => {
    const [selectedOption, setSelectedOption] = useState("noDonate");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.radioContainer}>
                {/* Radio button for "Donate" */}
                <View style={styles.radioOption}>
                    <RadioButton
                        style={styles.radio}
                        value={selectedOption === "donate"}
                        onValueChange={() => setSelectedOption("donate")}
                        color={selectedOption === "donate" ? '#FFA500' : undefined}
                    />
                    <Text style={styles.radioText}>捐贈</Text>
                </View>

                {/* Radio button for "Do not donate" */}
                <View style={styles.radioOption}>
                    <RadioButton
                        style={styles.radio}
                        value={selectedOption === "noDonate"}
                        onValueChange={() => setSelectedOption("noDonate")}
                        color={selectedOption === "noDonate" ? '#FFA500' : undefined}
                    />
                    <Text style={styles.radioText}>不捐</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        // borderWidth:1,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#4F4F4F",
        // borderWidth:1,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    radio: {
        width: 22,
        height: 22,
        marginRight: 8,
    },
    radioText: {
        fontSize: 16,
        color: "#4F4F4F",
    },
});

export default DonationItem;
