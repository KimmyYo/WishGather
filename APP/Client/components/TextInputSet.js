import { React } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'

function TextInputSet({ labelName, defaultValue }){
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{labelName}</Text>
            <TextInput style={styles.input}value={defaultValue}></TextInput>
        </View>
    )

}
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    container:{
        marginBottom: '5px',
        // marginLeft: 20
    },
    label:{
        marginLeft: 10,
        fontSize: 20
    },
    input: {
        backgroundColor: '#dbdbdb',
        borderWidth: 1,
        borderColor: '#dbdbdb',
        borderRadius: 10,
        padding: 20,
        width: screenWidth * 0.9,
        height: 70,
        margin: 12,
        fontSize: 20
    }
    
})

export default TextInputSet;