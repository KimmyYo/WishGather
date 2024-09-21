import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../components/Context/UserContext';

import CheckoutBar from '../../components/Utility/CheckoutBar';

const{ width } = Dimensions.get('window');

function OfferingUpload() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { userId } = useContext(UserContext);

  // State to handle image, name, price, and remark
  const [imageUri, setImageUri] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [remark, setRemark] = useState('');

  // Image picker function
  const selectImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);  // Use result.assets[0].uri to get the image URI
    }
  };

  {/* 進資料庫動作 */}
  const handleSubmit = () => {
   
  };

  return (
    <SafeAreaProvider>
      <View
        style={[
          styles.container,
          {
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 30,
            paddingRight: insets.right + 30,
          },
        ]}>
        <Text style={styles.header}>供品上傳</Text>

        {/* Image Upload Section */}
        <Pressable style={styles.imagePicker} onPress={selectImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePickerText}>點擊上傳圖片</Text>
          )}
        </Pressable>

        {/* Offering Name Input */}
        <TextInput style={styles.input} placeholder="供品名稱" value={name} onChangeText={setName}/>

        {/* Offering Price Input */}
        <TextInput style={styles.input} placeholder="供品價錢" value={price} keyboardType="numeric" onChangeText={setPrice}/>

        {/* Offering Remark Input */}
        <TextInput style={styles.input} placeholder="供品備註" value={remark} onChangeText={setRemark} />
        

		<View style={styles.buttonContainer}>
          <CheckoutBar btnText={'確認送出'} iconName={"checkbox-outline"} onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePicker: {
    backgroundColor: '#F0F0F0',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  imagePickerText: {
    fontSize: 18,
    color: '#888',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default OfferingUpload;
