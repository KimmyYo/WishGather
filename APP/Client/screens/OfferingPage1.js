import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import DonationItem from "../components/DonationItem";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const OfferingPage1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.offeringPage}>
      
      {/* 此頁標題 : 捐贈選擇 */}
      <Text style={styles.headerText}>捐贈選擇</Text>

      {/* 顯示上一頁所選購的供品並顯示在這，不確定需不需要連資料庫處顯示或是直接傳送 */}
      <View style={styles.donationItemsContainer}>
        <DonationItem
          title="開運吊飾"
          description="捐贈數量"
          imageSource={require("../assets/rectangle-112.png")}
          tickSource={require("../assets/tick-box.png")}
        />
        <DonationItem
          title="光明燈"
          description="捐贈數量"
          imageSource={require("../assets/rectangle-111.png")}
          tickSource={require("../assets/tick-box.png")}
        />
      </View>

      {/* 送出訂單按鈕，顯示訂購收據 */}
      <Pressable
        style={styles.goCheckoutButton}
        onPress={() => navigation.navigate("OfferingPage2")}
      >
        <Image
          style={styles.checkoutImage}
          contentFit="cover"
          source={require("../assets/rectangle-92.png")}
        />
        <Text style={styles.checkoutText}>送出訂單</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  offeringPage: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    width: "100%",
    height: '100%',
    overflow: "hidden",
  },
  headerText: {
    fontSize: FontSize.size_16xl,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_200,
    marginTop: '15%',
    marginBottom: 10,
    left:'5%'
  },
  donationItemsContainer: {
    marginTop: 10,
    width:'100%',
    height:140,
    display:'flex',
    flexDirection:'column',
  },
  goCheckoutButton: {
    top: '90%',
    left: '8%',
    width: 360,
    height: 70,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Border.br_xl,
  },
  checkoutText: {
    position: "absolute",
    fontSize: FontSize.size_11xl,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
  },
});

export default OfferingPage1;
