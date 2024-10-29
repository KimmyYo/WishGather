import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, SafeAreaView, Image ,KeyboardAvoidingView, Platform} from 'react-native';

//儲存空間用來放token(類似php session那種感覺)
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//連線axios

import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import TempleTab from '../../components/NavTab/TempleTab';
import NavigateBack from '../../components/Utility/NavigateBack';
import GoBackButton1 from '../../components/Utility/GoBackButton1';
import TextInputBox from '../../components/Utility/TextInputBox';
import { useAlertDialog } from '../../components/CustomHook/useAlertDialog';
import { useValidation } from '../../components/CustomHook/useValidateInput';
import { UserContext } from '../../components/Context/UserContext';
// 把API抓進來-都固定用專案教室IP
const API = require('../config/DBconfig');

function SignIn() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [role, setRole] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const { setUserId,setUserRole ,setUserToken} = useContext(UserContext);
  const { showAlertDialog, renderAlertDialog } = useAlertDialog();
  const {
    validateUserEmail,
    validateUserPassword,
    userEmailError,
    userPasswordError,
  } = useValidation();

  useEffect(() => {
    AsyncStorage.getItem('userToken').then(value => {
      if (value) setToken(value);
    }).catch(error => {
      console.error('Error reading userToken from AsyncStorage', error);
    });
  }, []);

  useEffect(() => {
    if (token) {
      // 根據token獲取用戶角色
      axios.get(`${API}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { userId, role } = response.data;
        setRole(role);
        setUserId(userId); // 設定global userId (會員table)
        setUserRole(role); // 設定global userRole (會員table)
        setUserToken(token);// 設定global token
        // 根據角色導航
        if (role === '信眾') {
          navigation.replace('BelieverTab');
        } else if (role === '社福') {
          navigation.replace('WelfareTab');
        } else if (role === '宮廟') {
          navigation.replace('TempleTab');
        } else {
          console.error('Unknown role:', role);
        }
      })
      .catch(error => { 
         Alert.alert('請重新登入')
      });
    }
  }, [token, navigation]);
  
// Function to refresh token
  const refreshTokens = async () => {
    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    try {
    const response = await axios.post(`${API}/refreshtoken`, { refreshToken: storedRefreshToken });
    const { token } = response.data;

    // Save new access token
    await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  // Handle 403 errors to trigger token refresh
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 403) {
        await refreshTokens();
      }
      return Promise.reject(error);
    }
  );


  const handleSignIn = async () => {
    const isEmailValid = validateUserEmail(email.trim());
    const isPasswordValid = validateUserPassword(password);
    const signInApi = `${API}/signin`;
    
    if(isEmailValid && isPasswordValid){
      setIsLoading(true);
      const userData = {
        EMAIL: email,
        PASSWORD: password,
      };
      // 登入Server 
      try {
        const response = await axios.post(`${API}/signin`, userData, { // Ensure correct variable names
          headers: {'Content-Type': 'application/json'},
        });
        const { token, refreshToken } = response.data;
        if (token && refreshToken) {
          setToken(token);
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          setIsLoading(false);
        } else {
          console.log("no token here...");
          showAlertDialog('登入失敗', '請重新試');
        }
      } catch (error) {
        console.error('Sign-in failed:', error);
        showAlertDialog('登入失敗', '請重新嘗試');
      } 
    }
  };


  // 登出設定
  const handleSignOut = async () => {
    setToken(null);
    setRole(null);
    await AsyncStorage.removeItem('userToken');
  };

  if (token && role) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>登入成功！正在跳轉...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
      <LinearGradient
        colors={['#e08371', '#FF9C33']}
        style={styles.container}
      >
        <View style={styles.btncontainer}>
          <NavigateBack />
        </View>

        <View style={styles.logoContainer}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require('../../assets/new_logo.png')}
          />
        </View>
        
        
        <View style={styles.curvedContainer}>

          
          <Text style={{ width:'100%', textAlign:'center',color: "#4F4F4F", fontSize: 35, marginBottom: 30, fontWeight: '500'}}>登入</Text>
          {/* <Text style={{ color: "#4F4F4F", fontSize: 25, fontFamily:"Roboto", marginBottom: 50}}>Login</Text> */}
  

          <TextInputBox
                inputType='email'
                placeholder="輸入電子郵件"
                textValue={email}
                onChangeText={(text) => {
                  setEmail(text);
                  validateUserEmail(text);
                }}
                validState={!userEmailError}
                invalidInput={userEmailError || ''}
            />
            <TextInputBox
              inputType='password'
              placeholder="設定密碼"
              textValue={password}
              onChangeText={(text) => {
                setPassword(text);
                validateUserPassword(text);
              }}
              validState={!userPasswordError}
              invalidInput={userPasswordError || ''}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                  <Text style={styles.buttonText}>登入</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("SignUp")}>
                  <Text style={styles.loginButtonText}>前往註冊</Text>
                </TouchableOpacity>
            </View>

          {/* <Pressable style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>登入</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.buttonText}>前往註冊</Text>
          </Pressable> */}
        </View>
      {renderAlertDialog()}
      </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  logoContainer: {
    width: "100%",
    height: "50%",
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: 300,
    height: 300 ,
    // borderWidth:1,
    bottom:-40
  },
  btncontainer:{
    position: 'absolute',
    top: 60,
    zIndex:999,
  },
  curvedContainer: {
    backgroundColor: 'white',
    width: '100%',
    height:'50%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent:'flex-start',
    alignItems: 'center',
    paddingBottom: Platform.OS === "ios" ? 20 : 0,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  buttonContainer: {
    flexDirection: 'row',    
    justifyContent: 'center', 
    alignItems: 'center',     
    gap: 20,
    marginTop: 30,                
  },
  button: {
    backgroundColor: '#FF9C33',
    padding: 15,
    borderRadius: 25,
    width: 170,  
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 25,
    width: 170,  
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

});

export default SignIn;