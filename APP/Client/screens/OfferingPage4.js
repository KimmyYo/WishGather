import React, { useState, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, Modal, ScrollView,KeyboardAvoidingView,Platform, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Border, Color, Padding, FontSize, FontFamily } from "../GlobalStyles";
import ProductItem from "../components/PouductItem";

const OfferingPage4 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();


  return (
    
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View style={styles.offeringPage1}>

        {/*footer*/}
        <View style={[styles.footer, styles.menuLayout]}>
          <View style={[styles.menu, styles.menuLayout]}>
            <View style={[styles.homeIconParent, styles.parentFlexBox]}>
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
              <Image
                style={[styles.templeIcon, styles.iconLayout]}
                contentFit="cover"
                source={require("../assets/temple-icon1.png")}
              />
              <Pressable
                style={[styles.templeIcon, styles.iconLayout]}
                onPress={() => navigation.navigate("CartPage")}
              >
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/shopping-bag-icon.png")}
                />
              </Pressable>


              <Pressable
                style={[styles.templeIcon, styles.iconLayout]}
                onPress={() => navigation.navigate("UserPage")}
              >
                <Image
                  style={styles.icon}
                  contentFit="cover"
                  source={require("../assets/user-icon.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
        
        {/* <Image
          style={[styles.offeringPage1Child, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-3.png")}
        /> */}

      
        <View style={styles.searchBar}>
              <Image
                style={[styles.searchIcon]}
                source={require("../assets/search-icon.png")}
              />
              <TextInput
                style={[styles.input, styles.textFlexBox]}
                placeholder="搜索"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
        </View>
      

        {/*此處先以自帶資料顯示，帶連接資料庫後再更動，目前點擊該項目product後會先統一至offeringpage6*/}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={[styles.parent, styles.parentFlexBox]}>
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
      </View>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  menuLayout: {
    height: 66,
    position: "absolute",
  },
  parentFlexBox: { 
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
   
  },
  scrollViewContent: { 
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconLayout: {
    height: 40,
    width: 40,
  },
  childPosition: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  textFlexBox: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  templeIcon: {
    marginLeft: 41,
  },
  homeIconParent: {
    marginTop: -33,
    marginLeft: -177.5,
    top: "50%",
    left: "50%",
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhitesmoke_100,
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_smi,
    overflow: "hidden",
  },
  menu: {
    top: 0,
    left: 0,
    width: 355,
  },
  footer: {
    top: 831,
    left: 38,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 30,
    elevation: 30,
    shadowOpacity: 1,
    width: 383,
  },
  offeringPage1Child: {
    height: "1.07%",
    width: "2.33%",
    top: "94.85%",
    right: "58.14%",
    bottom: "4.08%",
    left: "39.53%",
    position: "absolute",
  },
  container: {
    flex:1,
    backgroundColor: '#fff',
  },

  searchIcon: {
    height: 30,
    width: 30,
  },

  searchBar: {
    display:'flex',
    flexDirection: 'row',
    width:'auto',
    top:'15%',
    left:'5%',
    alignItems:'center',
  },

  input: {
    height: 50,
    width:'80%',
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
  },
  
  pressable: {
    width: 160,
    height: 160,
  },
  parent: {
    left: 40,
    width: 'auto',
    flexWrap: "wrap",
    overflow:'hidden',
  },
  offeringPage1: {
    borderRadius: Border.br_21xl,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorWhite,
  },
});

export default OfferingPage4;
