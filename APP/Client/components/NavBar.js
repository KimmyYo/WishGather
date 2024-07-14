import { React } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

function NavBar(){
    return (
        <View style={styles.container}>
            <Ionicons name="home" size={30}/>
            <Ionicons name="grid-outline" size={30}/>
            <Ionicons name="calendar-number-outline"size={30}/>
            <Ionicons name="person-circle-outline" size={30}/>
        </View>
    )
}

let screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,

        width: 'max-content', 
        height: 60,

        backgroundColor: 'orange',
        borderRadius: 50,
        borderWidth: '1px',
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 40,
        

        position: 'float',
        top: screenHeight
    }
})

export default NavBar;