import { React, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, TextInput, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-ui-datepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment';

function DatePicker({dateValue, labelName}){
  const [date, setDate] = useState(new Date(dateValue));
  const [show, setShow] = useState(false);

  const showTimepicker = () => {
    setShow(!show);
  }
  const onChangeDate = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(new Date(selectedDate));
  }
  const formatDate = (dateVal) => {     
    return moment(dateVal).format("YYYY-MM-DD");
  };
    return(
        <>
        <View style={styles.labelContainer}><Text style={styles.label}>{labelName}</Text></View>
        <View style={styles.container}>
          <TextInput value={formatDate(date)} style={styles.input} />
          <Pressable onPress={showTimepicker}><Ionicons name="calendar-number-outline" size={30} /></Pressable>
        </View>
        <Modal
          isVisible={show}
          style={styles.modal}
          backdropColor={"#d0d0d0"}
          onBackdropPress={showTimepicker}
        >
            <View style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
            }}>
              <DateTimePicker
                mode="single"
                date={date}
                onChange={(params) => onChangeDate(params.date)}
                selectedItemColor={"#F6AB3A"}
                headerButtonColor="#F6AB3A" />
            </View>
          </Modal>
        </>
    )
}
let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
        container: {
          width: screenWidth * 0.9,
          backgroundColor: '#dbdbdb',
          borderWidth: 1,
          borderColor: '#dbdbdb',
          borderRadius: 10,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        input:{
           fontSize: 20,
      
        },
        label: {
          fontSize: 20
        },
        labelContainer: {
          marginRight: screenWidth / 2 + 80,
          marginBottom: 10
        }
  });
  
export default DatePicker;