import React, { useState } from 'react';

import { View, TextInput, Pressable, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const API = require('./DBconfig');


const SignUp = () => {
  //宣告要用到的變數
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [role, setRole] = useState('');


  const navigation = useNavigation();

  const handleRegister = async () => {

    console.log('Current state before submission:', { name, phone, email, password, role });


    
    //檢查值
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    }

//把要輸入的table、值(取名叫user)設定
    if (!role) {
      Alert.alert('Error', 'Please select a role');
      return;
    }


    const api = `${API}/believers`;
    try {
      const user = {
        NAME: name.trim(),
        PHONE: phone.trim(),
        EMAIL: email.trim(),
        PASSWORD: password,

        ROLE: role,
      };
      console.log('User data being sent:', user);
      console.log('User data being sent:', JSON.stringify(user));

      //重點是這邊，這一行會把它丟進去後端，回傳result用來看有沒有成功
      const result = await axios.post(api, user
        ,{
          headers: {
            'Content-Type': 'application/json',
          },
    }
  );
      console.log('Registration successful:', result.data);


      Alert.alert('註冊成功', '歡迎登入!');
      navigation.navigate('SignIn');

    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        Alert.alert('Registration Failed', error.response.data.error || 'Unknown error');
      } else if (error.request) {
        console.log('No response received:', error.request);
        Alert.alert('Connection Error', 'No response from server. Check your connection.');
      } else {
        console.log('Error', error.message);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#EA7500','#FFFAF4']}
      style={styles.container}
    >
    
      {/* Logo設計好可以考慮放上去 */}
      <Text style={{color:"#272727", fontSize: 35, marginBottom: 15, fontWeight: '500'}}>註冊</Text>
      <Text style={{color:"#272727", fontSize: 25, marginBottom: 50}}>Registration</Text>


      <TextInput
        style={styles.input}
        placeholder="輸入姓名"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="輸入電話號碼"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="輸入電子郵件"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="設定密碼"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />


      {/* Role Selection Buttons */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === '信眾' && styles.roleButtonSelected,
          ]}
          onPress={() => setRole('信眾')}
        >
          <Text style={styles.roleButtonText}>信眾</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === '廟方' && styles.roleButtonSelected,
          ]}
          onPress={() => setRole('廟方')}
        >
          <Text style={styles.roleButtonText}>廟方</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === '社福' && styles.roleButtonSelected,
          ]}
          onPress={() => setRole('社福')}
        >
          <Text style={styles.roleButtonText}>社福</Text>
        </TouchableOpacity>
      </View>

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>確認送出</Text>
      </Pressable>

      {/* Debug Information */}
      {/* <View style={styles.debugContainer}>
        <Text>(For Debug)</Text>
        <Text>Name: {name}</Text>
        <Text>Phone: {phone}</Text>
        <Text>Email: {email}</Text>
        <Text>Password: {password.replace(/./g, '*')}</Text>
      </View> */}

    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 30,
    fontFamily:"Roboto",
    marginBottom: 5,

    color: '#272727',
    fontSize: 35,
    marginBottom: 15,
    fontWeight: '500',

  },
  input: {
    width: '90%',
    height: 50,

    backgroundColor: '#FFFAF4',

    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 15,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFA500',
    borderRadius: 20,
  },
  roleButtonSelected: {
    backgroundColor: '#FF8500',
  },
  roleButtonText: {
    color: '#FCFCFC',
    fontSize: 16,
  },
  button: {
    

    width: '35%',
    height: 50,
    backgroundColor: '#FFA500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {

    color : '#FCFCFC',

    fontSize: 18, 
    fontWeight:'500'
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',

    color: '#FCFCFC',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SignUp;

