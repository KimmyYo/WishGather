import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EventCard = ({ event }) => {
    return (
        <View style={styles.card}>
            <Image source={event.imageUrl} style={styles.image} />
            <Text style={styles.overlayText}>{event.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    overlayText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EventCard;
