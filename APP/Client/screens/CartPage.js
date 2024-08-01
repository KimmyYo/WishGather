
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView,FlatList, Dimensions } from "react-native";

import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CartItem from "../components/CartItem";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";

import Footer from "../components/footer";
import axios from 'axios';

const API=require('./DBconfig')


const { width, height } = Dimensions.get('window');


const CartPage = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // 假設目前已登入的使用者ID為1

  useEffect(() => {
    axios.get(`${API}/test`, { params: { userId } })
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
      });
  }, []);

  const [cartItems, setCartItems] = useState([
    { id: '1', imageSource: require("../assets/ellipse-6.png"), orderTitle: '大甲 鎮瀾宮媽祖廟\n', orderDetails: '3 項商品 · NT$1040' },
    { id: '2', imageSource: require("../assets/ellipse-61.png"), orderTitle: '鳳邑 雷府大將廟\n', orderDetails: '2 項捐贈品' },
    { id: '3', imageSource: require("../assets/ellipse-62.png"), orderTitle: '左營 金鑾殿\n', orderDetails: '1 項捐贈品' },
    { id: '4', imageSource: require("../assets/ellipse-6.png"), orderTitle: '大甲 鎮瀾宮媽祖廟\n', orderDetails: '1 項商品 · NT$800' },
    { id: '5', imageSource: require("../assets/ellipse-63.png"), orderTitle: '艋舺 龍山寺\n', orderDetails: '2 項商品 · NT$1500' },
    { id: '6', imageSource: require("../assets/ellipse-64.png"), orderTitle: '台北 行天宮\n', orderDetails: '1 項商品 · NT$300' },
  ]);

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <CartItem
      onPress={() => navigation.navigate("OfferingPage")}
      imageSource={item.imageSource}
      orderTitle={item.orderTitle}
      orderDetails={item.orderDetails}
      onDelete={() => handleDelete(item.id)}
    />
  );


      <Text style={[styles.text1, styles.textTypo]}>購物車</Text>
    </View>


    <ScrollView contentContainerStyle={styles.scrollView} flex={1}>
        <View style={[styles.cartPageInner, styles.cartPageInnerPosition, { flexDirection: 'column' }]}>
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={{ uri: item.IMAGE }}
              orderTitle={`${item.templeName}\n`}
              orderDetails={`${item.itemCount} 項商品 · NT$${item.totalAmount}`}
            />
          ))}
        </View>
      </ScrollView>


    {/* <ScrollView contentContainerStyle={styles.scrollView} flex={1}>
      <View style={[styles.cartPageInner, styles.cartPageInnerPosition, { flexDirection: 'column' }]}>
        <CartItem
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={require("../assets/ellipse-6.png")}
              orderTitle={`大甲 鎮瀾宮媽祖廟\n`}
              orderDetails="3 項商品 · NT$1040"
            />
            <CartItem
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={require("../assets/ellipse-61.png")}
              orderTitle={`鳳邑 雷府大將廟\n`}
              orderDetails="2 項捐贈品"
            />
            <CartItem
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={require("../assets/ellipse-62.png")}
              orderTitle={`左營 金鑾殿\n`}
              orderDetails="1 項捐贈品"
            />
            <CartItem
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={require("../assets/ellipse-6.png")}
              orderTitle={`大甲 鎮瀾宮媽祖廟\n`}
              orderDetails="1 項商品 · NT$800"
            />
            <CartItem
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={require("../assets/ellipse-63.png")}
              orderTitle={`艋舺 龍山寺\n`}
              orderDetails="2 項商品 · NT$1500"
            />
            <CartItem
              onPress={() => navigation.navigate("OfferingPage")}
              imageSource={require("../assets/ellipse-64.png")}
              orderTitle={`台北 行天宮\n`}
              orderDetails="1 項商品 · NT$300"
            />
      </View>
    </ScrollView> */}
    <Footer />
    
      {/* <View style={[styles.footer, styles.menuLayout]}>
        <View style={[styles.menu, styles.menuLayout]}>
          <View style={[styles.homeIconParent, styles.iconPosition]}>
            <Pressable
              style={styles.iconLayout}
              onPress={() => navigation.navigate("HomePage")}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require("../assets/home-icon1.png")}
              />
            </Pressable>

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
        <View style={styles.headerContainer}>
          {/* Header */}
          <View style={styles.header}>

            <Pressable
              style={styles.goBackButton}
              onPress={() => navigation.navigate("OfferingPage")}
            >
              <Image
                style={styles.goBackImage}
                source={require("../assets/go-back-button.png")}
              />
            </Pressable>
            <Text style={styles.headerTitle}>購物車</Text>
          </View>

          {/* Order History Button */}
          <Pressable
            style={styles.pastOrder}
            onPress={() => navigation.navigate("UserPage3")}
          >
            <Image
              style={styles.plusIcon}
              contentFit="cover"
              source={require("../assets/materialsymbolsordersoutline1.png")}
            />
            <Text style={styles.addButtonText}>歷史訂單</Text>
          </Pressable>
        </View>

        {/* CartItem */}
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        {/* <Footer /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_200,
    marginLeft: 10,
  },
  pastOrder: {
    width: 120,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginLeft:5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom:40,
    justifyContent:"center",
  },
});

export default CartPage;
