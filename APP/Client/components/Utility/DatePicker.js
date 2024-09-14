import { React, useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, TextInput, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-ui-datepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import Lunar from '@tony801015/chinese-lunar';
import moment from 'moment';
import DatePickerModal from './DatePickerModal';



function DatePicker({dateValue, labelName, isLunar, editable}){
  const [date, setDate] = useState(dateValue);
  const [show, setShow] = useState(false);
  const [lunarDate, setLunarDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleDateChange = (selectedDate) => { setPickupDate(selectedDate); }

  const convertSolarDateToLunarDate = (date) => {
    const gregorianDate = date 
    const [year, month, day] = gregorianDate.split('/');
    if (year && month && day) {
        const lunarData = Lunar(year, month, day).getJson();
        return `${lunarData.lunarMonth}${lunarData.lunarDay}`;
      }
    return date; 
  }


  const renderDateTextInput = () => {
    return (
      <View>
        <View style={styles.labelContainer}><Text style={styles.label}>{labelName}</Text></View>
          <View style={styles.container}>
            <TextInput 
              value={isLunar ? convertSolarDateToLunarDate(date) : date}
              editable={editable} 
              style={styles.input}
            />
            {editable && 
              <Pressable onPress={() => setDatePickerVisible(true)}>
                <Ionicons name="calendar-number-outline" size={30} />
              </Pressable>
            }
          </View>
      </View>
    )
  }
  return(
    <>
      {renderDateTextInput()}
      {/* Date Picker Modal */}
      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        date={date}
        onChange={handleDateChange}
      />
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
          color:"#4F4F4F",
          fontWeight:'bold',
          fontSize: 20
        },
        labelContainer: {
          marginRight: screenWidth / 2 + 80,
          marginBottom: 10
        }
  });
  
export default DatePicker;