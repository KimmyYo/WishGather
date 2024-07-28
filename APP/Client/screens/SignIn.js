import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const API_URL = '192.168.1.102:3000'; // Replace with your actual API URL

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(value => {
      if (value) setToken(value);
    }).catch(error => {
      console.error('Error reading userToken from AsyncStorage', error);
    });
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setIsLoading(true);

    const api = 'http://192.168.1.102:3000/signin';
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


  const fetchProfile = async () => {
    if (!token) {
      Alert.alert('Error', 'No token available');
      return;
    }
    setIsLoading(true);
    console.log('token:', token);
  
    try {
      const response = await axios.get('http://192.168.1.102:3000/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('Response headers:', response.headers); // 打印響應頭以進行調試
      console.log('Profile data:', response.data); // 打印響應數據以進行調試
  
      // 將獲取的資料設置到 `profile` 狀態中
      setProfile(response.data);
    } catch (error) {
      console.error('Fetch profile error', error);
      Alert.alert('Error', 'Failed to fetch profile. Please try again.');
    }
    setIsLoading(false);
  };
  

  if (token) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Welcome!</Text>
        <TouchableOpacity style={styles.button} onPress={fetchProfile} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Fetch Profile'}</Text>
        </TouchableOpacity>
        {profile && (
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>User ID: {profile.userId}</Text>
            <Text style={styles.profileText}>Email: {profile.email}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Signing In...' : 'Sign In'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    marginTop: 200,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
  },
  profileText: {
    fontSize: 16,
    marginBottom: 5,
    
  },
});
