import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';

const SignUp = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    console.log('Current state before submission:', { name, phone, email, password });

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

    const api = 'http://192.168.1.102:3000/believers';
    try {
      const user = {
        NAME: name.trim(),
        PHONE: phone.trim(),
        EMAIL: email.trim(),
        PASSWORD: password,
      };

      console.log('User data being sent:', user);
      console.log('User data being sent:', JSON.stringify(user));

      const result = await axios.post(api, user
        ,{
          headers: {
            'Content-Type': 'application/json',
          },
    }
  );
      console.log('Registration successful:', result.data);
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('UserPage');
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
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>確認送出</Text>
      </Pressable>
      
      
      
      {/* Debug Information */}
      <View style={styles.debugContainer}>
        <Text>Debug Info:</Text>
        <Text>Name: {name}</Text>
        <Text>Phone: {phone}</Text>
        <Text>Email: {email}</Text>
        <Text>Password: {password.replace(/./g, '*')}</Text>
      </View>
      
    
    </LinearGradient>
    


  

    </View>

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
    marginBottom: 5,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor:"#FFFAF4",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    width: '35%',
    height: 50,
    backgroundColor: '#FF9224',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: '#FCFCFC',
    fontSize: 18, 
    fontWeight:'500'
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default SignUp;