import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Alert ,Pressable} from 'react-native';

//儲存空間用來放token(類似php session那種感覺)
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//連線axios

import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";

//把API抓進來-都固定用專案教室IP
const API=require('./DBconfig')

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const [token, setToken] = useState(null);

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(value => {
      if (value) setToken(value);
    }).catch(error => {
      console.error('Error reading userToken from AsyncStorage', error);
    });
  }, []);

  /*跳轉頁面*/
  useEffect(() => {
    if (token) {
      navigation.replace('UserPage');
    }
  }, [token, navigation]);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setIsLoading(true);

    
    const api = `${API}/signin`;  


    const user = {
      EMAIL: email,
      PASSWORD: password,
    };

    try {
      const response = await axios.post(api, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token } = response.data;

      console.log('token:', response.data);

      if (token) {
        setToken(token);
        await AsyncStorage.setItem('userToken', token);
      } else {
        throw new Error('Token is undefined');
      }
    } catch (error) {
      console.error('Sign in error', error);
      Alert.alert('Error', 'Failed to sign in. Please check your credentials.');
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    setToken(null);
    setProfile(null);
    await AsyncStorage.removeItem('userToken');
  };


  if (token) {
    return (
      
    <SafeAreaView style={styles.container}>
    <StatusBar style="auto" />
    <Text style={styles.title}>登入成功！正在跳轉...</Text>
  </SafeAreaView>
);
  }

  return (
    <LinearGradient
      colors={['#EA7500', '#FFFAF4']}
      style={styles.container}
    >
      <Text style={{ color: "#272727", fontSize: 35, marginBottom: 10, fontWeight: '500'}}>登入</Text>
      <Text style={{ color: "#272727", fontSize: 25, fontFamily:"Roboto", marginBottom: 50}}>Login</Text>

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
          color={isChecked ? '#FFA500' : undefined}
        />
        <Text style={styles.paragraph}>記住我</Text>
    </View>

    <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>登入</Text>
    </Pressable>

    <Pressable style={styles.button} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.buttonText}>前往註冊
        
        </Text>
    </Pressable>


      

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