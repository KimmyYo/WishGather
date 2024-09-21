import { React, useState, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, TextInput, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import DateTimePicker from 'react-native-ui-datepicker';
import Ionicons from '@expo/vector-icons/Ionicons';
import Lunar from '@tony801015/chinese-lunar';
import moment from 'moment';
import DatePickerModal from './DatePickerModal';
import { formatDate, convertSolarDateToLunarDate } from './DateUtils';


function DatePicker({ dateValue, isLunar, editable, onChange }) {
  // 傳入DatePicker的日期 (純string)
  const [solarDate, setSolarDate] = useState(formatDate(dateValue)); // Store solar date
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);


  const handleDateChange = (selectedSolarDate) => {
    const formattedDate = formatDate(selectedSolarDate.toISOString());
    setSolarDate(formattedDate);
    setDatePickerVisible(false);
    onChange(selectedSolarDate);
  };
 
  const renderDateTextInput = () => {
    return (
      <View>
        <Text style={styles.label}>{isLunar ? '農曆日期' : '國曆日期'}</Text>
        <View style={styles.container}>
          <TextInput
            value={ solarDate }
            editable={editable}
            style={styles.input}
            onFocus={editable ? () => setDatePickerVisible(true) : null}
          />
          {editable && (
            <Pressable onPress={() => setDatePickerVisible(true)}>
              <Ionicons name="calendar-number-outline" size={30} />
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      {renderDateTextInput()}
      <DatePickerModal
        isVisible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        date={solarDate}
        onChange={handleDateChange}
      />
    </>
  );
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