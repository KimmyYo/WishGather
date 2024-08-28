import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import Checkbox from "expo-checkbox";

const { width } = Dimensions.get('window');

const DonationItem = ({ title, description, imageSource }) => {
    const [quantity, setQuantity] = useState(0);
    const [isChecked, setChecked] = useState(false);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                {/* Donate yes/no */}
                <Checkbox
                    style={{ width: 22, height: 22, margin: 8 }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#FFA500' : undefined}
                />
                
                <Text style={styles.title}>{title}</Text>

                {/* Counter */}
                <View style={styles.quantityContainer}>
                    <Pressable onPress={handleDecrease} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <Pressable onPress={handleIncrease} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: 60,
        flexDirection: 'row',
        justifyContent: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#4F4F4F",
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    quantityButton: {
        width: 30, 
        height: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15, 
    },
    quantityButtonText: {
        fontSize: 22, 
        fontWeight: 'bold',
        color: 'orange',
    },
    quantityText: {
        fontSize: 18, 
        marginHorizontal: 15,
        color: '#4F4F4F',
    },
});

export default DonationItem;
