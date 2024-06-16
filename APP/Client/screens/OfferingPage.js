{/*點擊廟宇後顯示該廟宇提供之商品頁面後按下前往結帳之頁面*/}

import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import AddressOverlay from "../components/AddressOverlay";
import LightInfoOverlay from "../components/LightInfoOverlay";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const OfferingPage = () => {
  const navigation = useNavigation();
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
    <>
      <View style={styles.offeringPage4}>
        {/*此頁標題 : 訂單*/}
        <Text style={[styles.text_title]}> 訂單</Text>

         {/*宮廟名稱*/}
        <Text style={[styles.textTypo, styles.text_temple_name]}> 大甲鎮瀾宮媽祖廟</Text>
        
        <View style={[styles.view, styles.viewLayout]}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={styles.counterIcon}
            contentFit="cover"
            source={require("../assets/counter.png")}
          />
          <Image
            style={[styles.item, styles.itemPosition]}
            contentFit="cover"
            source={require("../assets/rectangle-11.png")}
          />
          <Text style={[styles.text, styles.textFlexBox1]}>
            <Text style={styles.txt}>
              <Text style={styles.text1}>{`開運吊飾 `}</Text>
              <Text style={styles.text2}>$120</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.view1, styles.viewLayout]}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon1, styles.addLayout]}
            contentFit="cover"
            source={require("../assets/counter1.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.itemPosition]}
            contentFit="cover"
            source={require("../assets/rectangle-111.png")}
          />
          <Text style={[styles.text3, styles.textLayout]}>
            <Text style={styles.txt}>
              <Text style={styles.text1}>{`光明燈 `}</Text>
              <Text style={styles.text2}>{`$800
`}</Text>
              <Text style={styles.text6}>備註：被祈福人資訊</Text>
            </Text>
          </Text>
        </View>
        <Pressable style={styles.crossIcon} onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/cross-icon.png")}
          />
        </Pressable>
        
        <Pressable
          style={[styles.confirmOrder, styles.confirmLayout]}
          onPress={() => navigation.navigate("OfferingPage1")}
        >
          <Image
            style={[styles.confirmOrderChild, styles.confirmLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-9.png")}
          />
          <Text style={[styles.text8, styles.textFlexBox]}>下一步</Text>
        </Pressable>
        <Text style={[styles.text9, styles.textTypo]}>
          <Text style={styles.text10}>{`   共計 3 樣商品，小計 1040 元
`}</Text>
          <Text style={styles.text2}>{`    取貨地址：高雄市鼓山區蓮海路70號
    付款方式：線上刷卡付款`}</Text>
        </Text>
        <Pressable
          style={[styles.addButton, styles.addLayout]}
          onPress={() => navigation.navigate("OfferingPage5")}
        >
          <Image
            style={[styles.addButtonChild, styles.addLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-12.png")}
          />
          <Image
            style={styles.plusIcon}
            contentFit="cover"
            source={require("../assets/plus-icon.png")}
          />
          <Text style={[styles.text12, styles.textTypo]}>新增商品</Text>
        </Pressable>
        <Text style={[styles.text13, styles.textFlexBox1]}>
          
        </Text>
        <Pressable
          style={[styles.mageedit, styles.mageeditLayout]}
          onPress={openMageeditIcon}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/mageedit.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.mageedit1, styles.mageeditLayout]}
          onPress={openMageeditIcon1}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/mageedit.png")}
          />
        </Pressable>
      </View>

      <Modal animationType="fade" transparent visible={mageeditIconVisible}>
        <View style={styles.mageeditIconOverlay}>
          <Pressable
            style={styles.mageeditIconBg}
            onPress={closeMageeditIcon}
          />
          <AddressOverlay onClose={closeMageeditIcon} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={mageeditIcon1Visible}>
        <View style={styles.mageeditIcon1Overlay}>
          <Pressable
            style={styles.mageeditIcon1Bg}
            onPress={closeMageeditIcon1}
          />
          <LightInfoOverlay onClose={closeMageeditIcon1} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 140,
    width: 430,
    left: 0,
    position: "absolute",
  },
  childPosition: {
    borderColor: Color.colorWhitesmoke_300,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    top: 0,
    height: 140,
    width: 430,
    left: 0,
    position: "absolute",
  },
  itemPosition: {
    width: 100,
    left: 19,
    position: "absolute",
  },
  textFlexBox1: {
    height: 50,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  addLayout: {
    height: 40,
    width: 140,
    position: "absolute",
  },
  textLayout: {
    width: 247,
    fontFamily: FontFamily.interRegular,
    left: 128,
  },
  confirmLayout: {
    height: 70,
    width: 360,
  },
  textFlexBox: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  mageeditLayout: {
    height: 25,
    width: 25,
    position: "absolute",
  },
  child: {
    borderBottomWidth: 3,
  },
  counterIcon: {
    top: 85,
    height: 43,
    width: 140,
    left: 281,
    position: "absolute",
  },
  item: {
    height: 108,
    top: 16,
  },
  text1: {
    fontSize: FontSize.size_6xl,
  },
  text2: {
    fontSize: FontSize.size_xl,
  },
  txt: {
    width: "100%",
  },
  text: {
    width: 247,
    fontFamily: FontFamily.interRegular,
    left: 128,
    top: 16,
  },
  view: {
    top: 334,
  },
  inner: {
    borderWidth: 3,
  },
  counterIcon1: {
    top: 88,
    left: 285,
  },
  rectangleIcon: {
    top: 15,
    height: 100,
  },
  text6: {
    fontSize: FontSize.size_lg,
  },
  text3: {
    top: 24,
    height: 46,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  view1: {
    top: 194,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  crossIcon: {
    left: 375,
    top: 72,
    width: 30,
    height: 30,
    position: "absolute",
  },
  text_title: {
    top: '7%',
    left: '3%',
    width: 430,
    height: 80,
    fontSize: FontSize.size_16xl,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    color: Color.colorDimgray_200,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    position: "absolute",
  },
  confirmOrderChild: {
    borderRadius: Border.br_xl,
    top: 0,
    left: 0,
    position: "absolute",
  },
  text8: {
    color: Color.colorWhite,
    fontSize: FontSize.size_11xl,
    height: 70,
    width: 360,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    top: 0,
    left: 0,
  },
  confirmOrder: {
    top: 828,
    left: 33,
    position: "absolute",
  },
  text10: {
    fontSize: FontSize.size_4xl,
  },
  text9: {
    top: 614,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    width: 430,
    left: 0,
    position: "absolute",
  },
  addButtonChild: {
    borderRadius: Border.br_31xl,
    top: 0,
    left: 0,
  },
  plusIcon: {
    top: 2,
    left: 10,
    width: 32,
    height: 36,
    position: "absolute",
  },
  text12: {
    top: 10,
    left: 34,
    color: Color.colorDimgray_100,
    width: 97,
    height: 24,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    fontSize: FontSize.size_xl,
  },
  addButton: {
    top: 516,
    left: 281,
    height: 40,
  },
  //宮廟名稱
  text_temple_name: {
    top: '15%',
    left: '4%',
    fontSize: FontSize.size_11xl,
    width: 'auto',
  },

  mageeditIconOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  mageeditIconBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  mageedit: {
    left: 355,
    top: 659,
  },
  mageeditIcon1Overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(113, 113, 113, 0.3)",
  },
  mageeditIcon1Bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
  },
  mageedit1: {
    left: 297,
    top: 247,
  },
  offeringPage4: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default OfferingPage;
