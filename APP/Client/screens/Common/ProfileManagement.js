import React, { useState ,useContext,useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Text, Dimensions, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import axios from 'axios';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import CheckoutBar from '../../components/Believer/CheckoutBar';

import { UserContext } from '../../components/Context/UserContext';//for id

const API=require('../config/DBconfig')

const { width, height } = Dimensions.get('window');

const ProfileManagement = () => {

  const insets = useSafeAreaInsets();

  const { userId, userRole,token} = useContext(UserContext);
  
  const [profileImage, setProfileImage] = useState(null);
  const [newName, setName] = useState('');
  const [newPhone, setPhone] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageKey, setImageKey] = useState(0);
  

  const handleRegisterUpdate = async () => {
    console.log('Current state before submission:', { newName, newPhone, newEmail, newPassword });

    if (!newName.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (!newEmail.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    if (!newPassword) {
      Alert.alert('Error', 'Password is required ');
      return;
    }

    //API後面放要作用的後端
    const api = `${API}/believersUpdate`;
    try {
      const user = {
        NAME: newName.trim(),
        PHONE: newPhone.trim(),
        EMAIL: newEmail.trim(),
        PASSWORD: newPassword,
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
      Alert.alert('更新成功', '您的個資已更新!');
      navigation.navigate('SignIn');   //修改成功前往登入頁面


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

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const clearImageCache = async () => {
    // Clear the cache for the specific image
    if (profileImage) {
      await Image.prefetch(profileImage);
    }
    // Force re-render of the image component
    setImageKey(prevKey => prevKey + 1);
  };

  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(`${API}/user/${userId}/profilePicture`);
      if (response.data && response.data.imageUrl) {
        setProfileImage(`${API}${response.data.imageUrl}`);
        await clearImageCache();
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      Alert.alert('Error', 'Failed to fetch profile picture.');
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5, // Reduced quality
      base64: false, // We'll get base64 after resizing
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const resizedImage = await resizeImage(result.assets[0].uri);
      await sendProfilePictureToServer(resizedImage);
    }
  };

  const resizeImage = async (uri) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 300, height: 300 } }], // Resize to 300x300
      { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8, base64: true }
    );
    return manipulatedImage.base64;
  };

const sendProfilePictureToServer = async (base64Image) => {
  console.log('Sending profile picture to server...');
  setIsLoading(true);
  try {
    const response = await axios.post(`${API}/user/${userId}/profilePicture`, {
      photo: base64Image
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Server response received:', response.data);

    if (response.data && response.data.imageUrl) {
      
      await fetchProfilePicture(); // Fetch the updated profile picture
      
      Alert.alert('上傳成功!', '資料照片更新成功.');
    }
  } catch (error) {
    console.error('Error sending profile picture to server:', error);
    Alert.alert('Error', 'Failed to update profile picture. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const navigation = useNavigation();


  const renderUserImageSection = () => {
    if (userRole === '宮廟' || userRole === '社福') {
      return (
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imageContainer}>
            <Image
              key={imageKey}
              style={styles.userImage}
              contentFit="cover"
              source={profileImage ? { uri: profileImage } : `${API}/uploads/profilePictures/default.jpg`}
            />
            <View style={styles.imageOverlay}>
              <AntDesign name="edit" size={30} color="white" style={styles.editIcon} />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };




  {/* Style */}
  return (
    <SafeAreaProvider>
      <View style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: insets.top,
          paddingBottom: insets.bottom - 40,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}>
          
        <GoBackButton1 />

        {/* Page Title */}
        <View style={styles.titleContainer}>
            <AntDesign name="edit" size={24} color="orange" style={styles.icon} />
            <Text style={styles.pageTitle}>個資維護</Text>
           
        </View>
        
        {/* TextInput */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>

{/* 判斷用戶決定是否提供更新照片 */}
          {renderUserImageSection()} 

           {/* User Image Section */}
           
           {/* <TouchableOpacity onPress={pickImage}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.userImage}
                  contentFit="cover"
                  source={profileImage ? { uri: profileImage } : require("../../assets/ellipse-2.png")} // Default image
                />
                
                <View style={styles.imageOverlay}>
                  <AntDesign name="edit" size={30} color="white" style={styles.editIcon} />
                </View>
              </View>
            </TouchableOpacity> */}


            <View style={styles.inputContainer}>
              <Text style={styles.label}>名稱 :</Text>
              <TextInput 
                placeholder=" 中文名稱" 
                style={styles.input} 
                value={newName}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>電子郵件 :</Text>
              <TextInput
                placeholder=" 電子郵件" 
                style={styles.input} 
                value={newEmail}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>密碼 :</Text>
              <TextInput 
                placeholder=" 密碼" 
                style={styles.input} 
                secureTextEntry 
                value={newPassword}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>連絡電話 :</Text>
              <TextInput 
                placeholder=" 連絡電話" 
                style={styles.input}
                value={newPhone}
                onChangeText={setPhone}
              />
            </View>
            
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CheckoutBar btnText={'確認送出'} iconName={"checkbox-outline"} onPress={handleRegisterUpdate} />
        </View>

          

          {/* 確認送出按钮 */}
          {/* <Pressable
            style={[styles.confirmButton, styles.confirmLayout]}
            onPress={handleRegisterUpdate}
          >
            <Image
              style={[styles.confirmButtonChild, styles.confirmLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-91.png")}
            />
            <Text style={[styles.buttontext, styles.confirmLayout]}>確認送出</Text>
          </Pressable> */}

          {/* 確認送出連接資料庫的地方 */}
      </View>
    </SafeAreaProvider> 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  pageTitle: {
    fontSize: 28,
    color: "#4F4F4F",
    fontWeight: "bold",
    textAlign: 'left',
    marginBottom: 5,
  },
  imageContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Gray with 30% opacity
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80,
  },
  formContainer:{
    width: width*0.95,
    justifyContent:'center',
    alignSelf:'center',
    paddingHorizontal: 15,
    marginTop: 20,
    paddingBottom: 80,
    
  },
  label: {
    fontSize: 16,
    fontWeight:'bold',
    color: '#4F4F4F',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  
});

export default ProfileManagement;
