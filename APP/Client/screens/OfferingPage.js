import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Pressable, Modal, Image, ScrollView, Dimensions } from "react-native";
import OfferingItem from "../components/OfferingItem";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const { width, height } = Dimensions.get('window');

const OfferingPage = () => {
  const navigation = useNavigation();

  const BoughtItem = ({ imageSource, title, description}) => (
    <View style={styles.container}>
      <View style={[styles.inner, styles.childPosition]} />
      <Image
        style={[styles.rectangleIcon, styles.iconLayout]}
        contentFit="cover"
        source={imageSource}
      />
      <View style={styles.textContainer}>
        <Text style={styles.textTypo}>
          <Text style={styles.title}>{`${title} `}</Text>
          <Text style={styles.price}>{`${price}\n`}</Text>
        </Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.counterContainer}>
          <Counter quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        </View>
      </View>
    </View>
  );

  const [mageeditIconVisible, setMageeditIconVisible] = useState(false);
  const [mageeditIcon1Visible, setMageeditIcon1Visible] = useState(false);

  const openMageeditIcon = useCallback(() => {
    setMageeditIconVisible(true);
  }, []);

  const closeMageeditIcon = useCallback(() => {
    setMageeditIconVisible(false);
  }, []);

  const openMageeditIcon1 = useCallback(() => {
    setMageeditIcon1Visible(true);
  }, []);

  const closeMageeditIcon1 = useCallback(() => {
    setMageeditIcon1Visible(false);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text_title}>訂單</Text>

      {/* 返回鍵 */}
      <Pressable style={styles.crossIcon} onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          source={require("../assets/cross-icon.png")}
        />
      </Pressable>

      <Text style={[styles.textTypo, styles.text_temple_name]}>
        大甲鎮瀾宮媽祖廟
      </Text>

      {/* 選購的供品 */}
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <OfferingItem
          imageSource={require("../assets/rectangle-46.png")}
          title="開運吊飾"
          price="$120"
          description="備註："
        />
        <OfferingItem
          imageSource={require("../assets/rectangle-43.png")}
          title="光明燈"
          price="$800"
          description="備註：被祈福人資訊"
        />
        
        {/* 返回繼續選擇新增供品 */}
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("OfferingPage5")}
        >
          <Image
            style={styles.addButtonChild}
            source={require("../assets/rectangle-12.png")}
          />
          <Image
            style={styles.plusIcon}
            source={require("../assets/plus-icon.png")}
          />
          <Text style={styles.text12}>新增商品</Text>
        </Pressable>
      </ScrollView>

      

      {/* 下一步按鈕 */}
      <Pressable
        style={styles.goCheckoutButton}
        onPress={() => navigation.navigate("OfferingPage1")}
      >
        <Image
          style={styles.checkoutImage}
          source={require("../assets/rectangle-9.png")}
        />
        <Text style={styles.checkoutText}>下一步</Text>
      </Pressable>

      {/* 付款資訊 */}
      <Text style={[styles.textTypo, styles.textContainer]}>
        <Text style={styles.text2}>共計 3 樣商品，小計 1040 元</Text>{"\n"}
        <Text style={styles.text2}>取貨地址：高雄市鼓山區蓮海路70號</Text>{"\n"}
        <Text style={styles.text2}>付款方式：線上轉帳付款</Text>
      </Text>

      

      {/* 備註區 */}
      <Pressable style={styles.mageedit} onPress={openMageeditIcon}>
        <Image
          style={styles.icon}
          source={require("../assets/mageedit.png")}
        />
      </Pressable>
      <Pressable style={styles.mageedit1} onPress={openMageeditIcon1}>
        <Image
          style={styles.icon}
          source={require("../assets/mageedit.png")}
        />
      </Pressable>

      {/* 地址Overlay */}
      <Modal animationType="fade" transparent visible={mageeditIconVisible}>
        <View style={styles.overlayContainer}>
          <Pressable style={styles.overlayBg} onPress={closeMageeditIcon} />
          {/* AddressOverlay 內容 */}
        </View>
      </Modal>

      {/* 光明燈信息Overlay */}
      <Modal animationType="fade" transparent visible={mageeditIcon1Visible}>
        <View style={styles.overlayContainer}>
          <Pressable style={styles.overlayBg} onPress={closeMageeditIcon1} />
          {/* LightInfoOverlay 內容 */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
    paddingHorizontal: 20,
    
  },
  text_title: {
    fontSize: FontSize.size_16xl,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_200,
    marginTop: '15%',
    marginBottom: 20,
  },
  text_temple_name: {
    fontSize: FontSize.size_8xl,
    marginBottom:15
  },
  itemsContainer: {
    width:'100%',
    height:140,
    
  },
  crossIcon: {
    position: "absolute",
    marginTop: '15%',
    right: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  goCheckoutButton: {
    width: width * 0.85,
    bottom: height * 0.03,
    left: '8%',
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
  textTypo: {
    width:'100%',
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
  },
  textContainer:{
    width:'100%',
    position:'absolute',
    top:'65%',
    left:'8%'

  },
  addButton: {
    position: "absolute",
    right: 10,
    top:300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorGray_100,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonChild: {
    ...StyleSheet.absoluteFillObject, 
  },
  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 5, 
  },
  text12: {
    fontSize: FontSize.size_xl,
    color: Color.colorDimgray_100,
  },
  mageedit: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  mageedit1: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  overlayBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default OfferingPage;
