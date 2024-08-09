import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const ScanResult = ({ route }) => {
    const { objectCounts } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detected Objects</Text>
            {Object.entries(objectCounts).map(([name, count]) => (
                <Text key={name} style={styles.item}>
                    {name}: {count}
                </Text>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        fontSize: 18,
    },
});

export default ScanResult;
