import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isChecked, setChecked] = useState(false);

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Password is required');
      return;
    }

    const api = 'http://192.168.1.102:3000/login';
    try {
      const user = {
        EMAIL: email.trim(),
        PASSWORD: password,
      };

      const result = await axios.post(api, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Success', 'User logged in successfully!');
      navigation.navigate('UserPage');
    } catch (error) {
      if (error.response) {
        Alert.alert('Login Failed', error.response.data.error || 'Unknown error');
      } else if (error.request) {
        Alert.alert('Connection Error', 'No response from server. Check your connection.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    }
  };

  return (
    <LinearGradient
      colors={['#EA7500', '#FFFAF4']}
      style={styles.container}
    >
      <Text style={{ color: "#272727", fontSize: 35, marginBottom: 10, fontWeight: '500'}}>登入</Text>
      <Text style={{ color: "#272727", fontSize: 25, marginBottom: 50 }}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="輸入電子郵件"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="輸入密碼"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

    <View style={styles.rememberme}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#FF9224' : undefined}
        />
        <Text style={styles.paragraph}>記住我</Text>
    </View>

    <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>登入</Text>
    </Pressable>
      
      {/* Debug Information */}
      <View style={styles.debugContainer}>
        <Text>Debug Info:</Text>
        <Text>Email: {email}</Text>
        <Text>Password: {password.replace(/./g, '*')}</Text>
      </View>
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
  input: {
    width: '90%',
    height: 50,
    backgroundColor: "#FFFAF4",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  rememberme: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
  },
  checkbox: {
    margin: 8,
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

export default Login;
