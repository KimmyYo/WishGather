import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SectionHeader = ({ title, onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onPress} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
                <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M9 6l6 6-6 6" />
                </Svg>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 30
    }
});
export default SectionHeader;