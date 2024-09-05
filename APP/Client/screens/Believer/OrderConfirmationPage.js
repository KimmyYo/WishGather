import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Image, Dimensions, TextInput, Alert } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import ConfirmItem from '../../components/Believer/ConfirmItem';
import DonationItem from '../../components/Believer/DonationItem';
import OrderInfo from '../../components/Believer/OrderInfo';
import DatePickerModal from '../../components/Utility/DatePickerModal';
import TimePickerModal from '../../components/Utility/TimePickerModal';
import PaymentMethodModal from '../../components/Believer/PaymentMethodModal';
import ConfirmModal from '../../components/Believer/ConfirmModal'; 
import SetButton from '../../components/Utility/SetButton';


const { width} = Dimensions.get('window');

const OrderConfirmationPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const { items = [] } = route.params || {};

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const [note, setNote] = useState('');

  const [pickupDate, setPickupDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const [pickupTime, setPickupTime] = useState({ hour: '06', minute: '00' }); 
  const [isTimePickerVisible, setTimePickerVisible] = useState(false); 

  const [paymentMethod, setPaymentMethod] = useState('現場付款');
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const handleDateChange = (selectedDate) => { setPickupDate(selectedDate); };


 {/* Function - Payment Method */}
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setPaymentModalVisible(false);
  };

  {/* Function - Show Confirm Modal */}
  const handleOrderSubmit = () => {
    setConfirmModalVisible(true);
  };

  {/* Function - Confirm and back to HomePage */}
  const handleConfirmOrder = () => {
    setConfirmModalVisible(false);
    Alert.alert("訂單已送出");
    navigation.navigate('HomePage');
  };


  const renderOrderInfo = () => (
    <View style={styles.orderInfoContainer}>
      <OrderInfo
        iconName="store" 
        iconType="MaterialIcons" 
        title="活動名稱" 
        value="左營仁濟宮 燈花供養祈福" 
        onPress={() => {}} 
      />
      <OrderInfo
        iconName="calendar" 
        iconType="Entypo" 
        title="領取日期" 
        value={pickupDate.toISOString().split('T')[0]} 
        onPress={() => setDatePickerVisible(true)} 
      />
      <OrderInfo
        iconName="clock" 
        iconType="Entypo" 
        title="領取時間" 
        value={`${pickupTime.hour}:${pickupTime.minute}`} 
        onPress={() => setTimePickerVisible(true)} 
      />
      <OrderInfo
        iconName="payment" 
        iconType="MaterialIcons" 
        title="付款方式" 
        value={paymentMethod} 
        onPress={() => setPaymentModalVisible(true)} 
      />
      {paymentMethod === '線上轉帳付款' && (
        <View style={styles.paymentAccountContainer}>
          <Text style={styles.paymentAccountText}>宮廟匯款帳號 : 72668349{"\n"}請於送出訂單後12小時之內匯款</Text>
        </View>
      )}
    </View>
  );

  const orderDetails = {
    eventName: "左營仁濟宮 燈花供養祈福",
    pickupDate: pickupDate.toISOString().split('T')[0],
    pickupTime: `${pickupTime.hour}:${pickupTime.minute}`,
    paymentMethod: paymentMethod,
  };

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top, 
        paddingBottom: insets.bottom, 
        paddingLeft: insets.left, 
        paddingRight: insets.right 
      }}>

        <GoBackButton1 destination="OfferingsByTemple" />

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>訂單明細</Text>
          </View>

          {/* Item */}

          
          {items.map((item, index) => (
            <View style={styles.itemsContainer}>
              <ConfirmItem key={item.id} quantity={item.quantity} title={item.title} price={item.price} />
            </View>
          ))}
          
          {/* Total */}
          <View style={{width:width*0.95, paddingHorizontal:10, paddingTop: 15,justifyContent:"center", alignItems:"flex-end"}}>
            <Text style={{fontSize:18, fontWeight:"bold", color:"#4f4f4f"}}>總計 :  <Text style={{color:"orange"}}>${calculateTotalPrice()}</Text>  元</Text>
          </View>
          
          {/* Donation Choose*/}
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>捐贈選擇</Text>
          </View>

          {items.map((item, index) => (
            <View style={styles.itemsContainer}>
              <DonationItem key={item.id} quantity={item.quantity} title={item.title} price={item.price} />
            </View>
          ))}

          {/* Note */}
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>新增備註</Text>
          </View>
          <View style={styles.noteContainer}>
            <TextInput
              style={styles.noteInput}
              placeholder='請在此撰寫備註...'
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>
          
          {/* OrderInfo */}
          {renderOrderInfo()}

        </ScrollView>
        
        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <SetButton btnText={'送出訂單'} btnStatus={'primary'} onPress={handleOrderSubmit}/>
        </View>

        {/* Confirmation Modal */}
        <ConfirmModal
            isVisible={isConfirmModalVisible}
            onCancel={() => setConfirmModalVisible(false)}
            onConfirm={handleConfirmOrder}
            orderDetails={orderDetails}
            animationType="fade" transparent
        />
        {/* Date Picker Modal */}
        <DatePickerModal
          isVisible={isDatePickerVisible}
          onClose={() => setDatePickerVisible(false)}
          date={pickupDate}
          onChange={handleDateChange}
        />

        {/* Time Picker Modal */}
        <TimePickerModal
          isVisible={isTimePickerVisible}
          initialTime={pickupTime}
          onClose={() => setTimePickerVisible(false)}
          onConfirm={(hour, minute) => {
            setPickupTime({ hour, minute });
            setTimePickerVisible(false);
          }}
        />
        {/* Payment Method Modal*/}
        <PaymentMethodModal
          isVisible={isPaymentModalVisible}
          onClose={() => setPaymentModalVisible(false)}
          onMethodSelect={handlePaymentMethodChange}
        />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  goBackIcon: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
  titleContainer: {
    width: width*0.95,
    justifyContent: "center",
    alignItems: 'flex-start',
    marginTop: 10,       
    paddingHorizontal: 10,
  },
  pageTitle: {
    fontSize: 26,
    color: "#4F4F4F",
    fontWeight: "bold",
    textAlign: 'left',
    marginVertical: 2,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 80,
  },
  itemsContainer: {
    width: width*0.95,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 5,
  },
  noteContainer: {
    width: width*0.95,
    marginVertical: 2,
    padding: 10,
    borderRadius: 10,
    borderBottomWidth:1,
    borderColor: '#E0E0E0',
  },
  noteInput: {
    height: 100,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    textAlignVertical: 'top',
  },
  orderInfoContainer: {
    width: width*0.95,
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 20,
  },
  paymentAccountContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  paymentAccountText: {
    fontSize: 16,
    color: "#4F4F4F",
    textAlign: "center",
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
});

export default OrderConfirmationPage;
