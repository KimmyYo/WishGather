import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Pressable, View, Text, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily, Padding } from "../GlobalStyles";
import TempleCard from "../components/TempleCard";
// import Footer from "../components/Footer_OfferingPage";
// import Footer from "../components/footer";

const { width, height } = Dimensions.get('window');

const OfferingPage6 = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.offeringPage6}>

        <View style={styles.titleContainer}>
          {/*標題*/}
          <View>
            <Text style={[styles.titleText, styles.borderText]}>線上點燈</Text>
          </View>
          
          {/*返回鍵*/}
          <Pressable
            style={styles.goBackButton}
            onPress={() => navigation.navigate("OfferingPage4")}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../assets/go-back-button.png")}
            />
          </Pressable>

        </View>

        {/*TempleCard onpress會對應到該廟宇的有關線上點燈的商品頁面*/}
        <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true} >

          {/* 顯示廟宇內容 */}
          <View style={styles.templeCard_container}>
            <TempleCard
              imageSource={require("../assets/rectangle-214.png")}
              title={`大甲 鎮瀾宮媽祖廟`}
              distance="222公里"
              savedStateSource={require("../assets/saved-state1.png")}
              onPress={() => navigation.navigate("OfferingPage5")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-215.png")}
              title={`左營 仁濟宮`}
              distance="11公里"
              savedStateSource={require("../assets/saved-state2.png")}
              onPress={() => navigation.navigate("OfferingPage5")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-216.png")}
              title={`鳳邑 雷府大將廟`}
              distance="12公里"
              savedStateSource={require("../assets/saved-state2.png")}
              onPress={() => navigation.navigate("OfferingPage5")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-217.png")}
              title={`左營 金鑾殿`}
              distance="12公里"
              savedStateSource={require("../assets/saved-state2.png")}
              onPress={() => navigation.navigate("OfferingPage5")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-218.png")}
              title={`朝元宮 鐵路媽祖`}
              distance="8.2公里"
              savedStateSource={require("../assets/saved-state2.png")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-219.png")}
              title={`東照山 關帝廟`}
              distance="24公里"
              savedStateSource={require("../assets/saved-state2.png")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-2110.png")}
              title={`府城 三山國王廟`}
              distance="34公里"
              savedStateSource={require("../assets/saved-state2.png")}
            />
            <TempleCard
              imageSource={require("../assets/rectangle-2111.png")}
              title={`車城 福安宮`}
              distance="82公里"
              savedStateSource={require("../assets/saved-state1.png")}
            />
          </View>
        </ScrollView>

        {/* <Footer/> */}
      </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    overflow: 'hidden',
  },
  offeringPage6: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  titleContainer:{
    width:width,
    height:50,
    display:'flex',
    flexDirection:'row',
  },
  
  titleText: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    
  },
  borderText:{
    width: width*0.9,
    height: 50,
    marginHorizontal: 50,
  },
  goBackButton: {
    width: 40,
    height: 40,
    position: "absolute",
    alignSelf:'center',
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  scrollView:{
    paddingTop:5,
  },
  scrollViewContent:{
    paddingVertical: 2,
    alignItems: "center",
  },
  templeCard_container:{
    flexGrow:1,
  },

});

export default OfferingPage6;
