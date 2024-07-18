import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, Modal, ScrollView, TextInput, SafeAreaView,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, Padding, FontSize, FontFamily } from "../GlobalStyles";
import ProductItem from "../components/ProductItem";
import Footer from "../components/Footer_OfferingPage";

const { width, height } = Dimensions.get('window');

const OfferingPage4 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.offeringPage4}>

        {/* 搜尋欄位 */}
        <View style={styles.searchContainer}>
           <Image
          style={styles.searchIcon}
          contentFit="cover"
          source={require("../assets/search-icon.png")}
        />
          <TextInput placeholder="搜尋(Ex:祭拜禮盒)" style={styles.input}
            value={searchText}
            onChangeText={setSearchText} />
        </View>
      

        {/*此處先以自帶資料顯示，帶連接資料庫後再更動，目前點擊該項目product後會先統一至offeringpage6*/}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.productItem_container}>
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-19.png")}
              title="線上點燈"
            />
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-191.png")}
              title="金紙香品"
            />
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-192.png")}
              title="生鮮蔬果"
              backgroundColor="#fff"
              fontFamily="Roboto-Regular"
            />
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-193.png")}
              title="精緻糕點"
            />
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-194.png")}
              title="餅乾糖果"
            />
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-195.png")}
              title="解渴飲品"
            />
            <ProductItem
              onPress={() => navigation.navigate("OfferingPage6")}
              imageSource={require("../assets/rectangle-196.png")}
              title="文創周邊"
              fontFamily="Inter-Regular"
            />
          </View>
        </ScrollView>

        <Footer></Footer>

      
      </View>
  </SafeAreaView>        
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
    overflow: 'hidden',
  },
  offeringPage4: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
  },
  searchContainer: {
    width: width,
    paddingHorizontal: 5,
    paddingVertical: 5,
    alignSelf: 'center',
    justifyContent:'center',
    display:'flex',
    flexDirection:'row',
  },
  input: {
    width: width*0.80,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    height: 35,
    width: 35,
  },
  scrollView:{
    paddingVertical:10,
  },
  scrollViewContent: { 
    paddingVertical: 2,
    alignItems: "center",
  },
  productItem_container: {
    display:'flex',
    flexWrap:'wrap',
    flexDirection: "row",
    paddingHorizontal:10,
    alignContent:'center',
    justifyContent:'center',
  },
});

export default OfferingPage4;
