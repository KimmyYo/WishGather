import React, { useState, useCallback, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Pressable, FlatList, Dimensions, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import CheckoutBar from '../../components/Believer/CheckoutBar';
import OfferingItem from "../../components/Believer/OfferingItem"; 
import CloseButton from "../../components/Utility/CloseButton";
import DrawlotsButton from '../../components/Believer/DrawlotsButton';

import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../components/Context/UserContext';
const API = require('../config/DBconfig');
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const OfferingsByTemple = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { userId } = useContext(UserContext);
  const route = useRoute();
  const { templeId } = route.params;

  const [selectedOfferings, setSelectedOfferings] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [templeInfo, setTempleInfo] = useState({});

  // Fetch temple offering data by templeId
  const believerFetchTempleOfferingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/believer_get_temple_items/${templeId}`);
      setSelectedOfferings(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch temple offerings');
    }
  };

  // Fetch temple information
  const fetchTempleInfo = async () => {
    try {
      const response = await axios.get(`${API}/believer_get_temple_info/${templeId}`);
      setTempleInfo(response.data);
    } catch (err) {
      Alert.alert('Error', 'Failed to fetch temple information');
    }
  };

  useEffect(() => {
    believerFetchTempleOfferingData();
    fetchTempleInfo();
  }, [templeId]);

  // Add selected item to the cart_items table in the backend
  const handleAddToCart = async (title, quantity, price, image, type) => {
    try {
      const totalAmount = quantity * price;
      const itemCount = quantity;

      await axios.post(`${API}/add_to_cart`, {
        templeName: templeInfo.NAME,
        itemCount,
        totalAmount,
        IMAGE: image,
        pID: userId,
        tID: templeId,
        type
      });

      Alert.alert('新增成功', `${title} 已新增至購物車`);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  // Checkout and add all selected items to cart_items in backend
  const handleCheckout = async () => {
    const itemsToAdd = selectedOfferings.filter(item => quantities[item.NAME]?.quantity > 0);

    try {
      for (const item of itemsToAdd) {
        const title = item.NAME;
        const quantity = quantities[item.NAME]?.quantity;
        const price = item.PRICE;
        const image = item.IMAGE;
        const type = item.TYPE;
        const totalAmount = quantity * price;

        await axios.post(`${API}/add_to_cart`, {
          templeName: templeInfo.NAME,
          itemCount: quantity,
          totalAmount,
          IMAGE: image,
          pID: userId,
          tID: templeId,
          type
        });
      }

      navigation.navigate('OrderConfirmationPage', { templeId, templeName: templeInfo.NAME });
    } catch (error) {
      console.error('Failed to checkout:', error);
      Alert.alert('Error', 'Failed to checkout');
    }
  };

  const renderOfferingItem = ({ item }) => (
    <OfferingItem
      imageSource={{ uri: item.IMAGE }}
      title={item.NAME}
      price={item.PRICE != null ? item.PRICE.toString() : '0'}
      description={item.DESCRIPTION}
      quantity={quantities[item.NAME]?.quantity || 0}
      onAddToCart={(title, quantity) => handleAddToCart(title, quantity, item.PRICE, item.IMAGE, item.TYPE)}
    />
  );

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top -50,
        paddingBottom: insets.bottom - 40,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        
        <View>
          <Image 
            style={styles.headerImage} 
            contentFit="cover" 
            source={{ uri: templeInfo.IMAGE ? `${API}${templeInfo.IMAGE}` : require("../../assets/rectangle-3.png") }} 
          />
          <CloseButton />
        </View>

        {/* Display temple information */}
        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>{templeInfo.NAME || "宮廟名稱"}</Text>
        </View>
          
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={selectedOfferings}
            renderItem={renderOfferingItem}
            keyExtractor={(item) => item.offering_id.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        )}
        
        <View style={styles.buttonContainer}>
           <CheckoutBar btnText={"前往結帳"} iconName={"cart-outline"} onPress={handleCheckout} />
        </View>

        <View style={styles.buttonContainer}>
          <DrawlotsButton />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: height * 0.30,
    opacity: 0.9,
    width: width,
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#4F4F4F',
  },
  flatListContent: {
    paddingVertical: 10,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom:60,
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default OfferingsByTemple;
