import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.container}>
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
      <Button title="Register" onPress={handleRegister} />

      <Button title="測試登入連結" onPress={() => navigation.navigate("SignIn")} />

  

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default SignUp;