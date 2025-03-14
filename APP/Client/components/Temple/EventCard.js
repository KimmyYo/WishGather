import { React, useState, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated} from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import  Dialog  from "react-native-dialog";
import Lunar from '@tony801015/chinese-lunar';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { useAlertDialog } from '../CustomHook/useAlertDialog';
import { convertSolarDateToLunarDate } from '../Utility/DateUtils';


function getCardSize(shape){
    if(shape == 'square'){
        return styles.squareSize
    }
    else if (shape == 'rectangle'){
        return styles.rectangleSize
    }
}

function renderRightActions (progress, dragAnimatedValue, showDialog, goEdit, event){
    const opacity = dragAnimatedValue.interpolate({
        inputRange: [-80, 0],
        outputRange: [screenWidth - 300, 0],
        // extrapolate: 'clamp',
    });
    return (
        <View style={styles.swipedRow}>
          <Animated.View style={[styles.behindButton, { opacity }, styles.editBackgroundColor]}>
            <TouchableOpacity onPress={goEdit}>
              <Text style={styles.behindButtonText}>編輯</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.behindButton, { opacity }, styles.deleteBackgroundColor]}>
            <TouchableOpacity onPress={showDialog}>
              <Text style={styles.behindButtonText}>刪除</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      );
}


function EventCard ({ event, temple, size }){
    const navigation = useNavigation();
    const [dialogVisible, setDialogVisible] = useState(false);
    const swipeableRef = useRef(null);
    const { userId } = useContext(UserContext);
    const { showAlertDialog, renderAlertDialog } = useAlertDialog();
    const API = require('../../screens/config/DBconfig');
    const deleteEventApi = `${API}/delete_event`;
    
    const showDialog = () => {
      setDialogVisible(true);
    };
  
    const handleCancel = () => {
      setDialogVisible(false);
    };
  
    const handleDelete = () => {
      setDialogVisible(false);
      swipeableRef.current?.close();
      let eID = event.eID;
      axios.post(deleteEventApi, { eID })
           .then((response) => {
                showAlertDialog('通知', '刪除成功');
                navigation.navigate('TempleEventPage', { refresh: true });
           })
           .catch((err) => {
                console.log(err);
           })
    };

    const goEdit = () => {
        swipeableRef.current?.close();
        navigation.navigate('EditTempleInfoPage', 
                            { 
                                event: event, 
                                forEdit: true
                            });
    }

    if(size == "square"){
        return (
            <View style={[styles.card, getCardSize(size), { borderRadius: 9 }]}>
                <Image 
                    source={{ uri: temple.IMAGE ? `${API}${temple.IMAGE}` : `${API}/uploads/profilePictures/default.jpg` }}
                    style={styles.image} 
                />
                <View style={[styles.overlay, { borderRadius: 9 }]}>
                    <Text style={styles.overlayText}>
                        {convertSolarDateToLunarDate(event.DATE)}  {/* Wrapped in Text */}
                    </Text>
                </View>
            </View>
        );
    }
    if(size == "rectangle"){
        return (
            <View>
                <Swipeable 
                    renderRightActions={(progress, dragAnimatedValue) => renderRightActions(progress, dragAnimatedValue, showDialog, goEdit)}
                    ref={swipeableRef}>
                    <View style={[styles.card, getCardSize(size)]}>
                        <Image 
                            source={{ uri: temple.IMAGE ? `${API}${temple.IMAGE}` : `${API}/uploads/profilePictures/default.jpg` }}
                            style={[styles.image, styles.squareImage]} 
                            resizeMode="cover"
                        />
                        <View style={styles.overlay}>
                            <Text style={styles.overlayText}>
                                {convertSolarDateToLunarDate(event.DATE)}
                            </Text>
                        </View>
                    </View>
                </Swipeable>  
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>刪除</Dialog.Title>
                    <Dialog.Description>
                    確定刪除此法會？
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={handleCancel}/>
                    <Dialog.Button label="Delete" onPress={handleDelete}/>
                </Dialog.Container>
            </View>
        )
    }  
};


let marginSpace = 30;
let screenHeight = Dimensions.get("window").height;
let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
            // backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
    },
    card: {
        flex: 1,
        position: 'relative',
        // borderWidth: '1px',
        borderColor: 'none',
        // backgroundColor: 'white',
    },
    squareSize: {
        width: 120,
        height: 120,
        marginRight: marginSpace,
        borderRadius: 10
    },
    rectangleSize: {
        width: '100%', // Device depends?
        height: 120,
        // marginBottom: marginSpace,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '8px'
    },
    squareImage: {
        borderRadius: 0
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(128, 128, 128, 0.2)', // Gray with 50% opacity
        // borderRadius: 8,
        justifyContent: 'center', // Center items vertically
        alignItems: 'center', // Center items horizontally
    },
    overlayText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
    },
    swipedRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 10,
    },
    behindButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        zIndex: -1,
      },
    behindButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deleteBackgroundColor: {
        backgroundColor: '#ff524f',
    },
    editBackgroundColor: {
        backgroundColor: '#66a6ff'
    }
});

export default EventCard;
