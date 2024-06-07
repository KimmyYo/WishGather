import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";

const HomePage1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.homePage2}>
      <View style={styles.parent}>
        <Text style={styles.text}>{` 糕點 `}</Text>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-49.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`紅龜粿
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-410.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`發粿
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-412.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`壽桃
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-413.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`草仔粿
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <Text style={styles.text}> 水果</Text>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-414.png")}
          />
          <Text style={[styles.text14, styles.textTypo1]}>{`蘋果
`}</Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-415.png")}
          />
          <Text style={[styles.text14, styles.textTypo1]}>{`香蕉
`}</Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-416.png")}
          />
          <Text style={[styles.text14, styles.textTypo1]}>鳳梨</Text>
        </View>
        <Text style={styles.text}> 餅乾</Text>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-417.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`可樂果豌豆酥
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-418.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`多力多滋玉米脆餅
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-419.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`樂事洋芋片
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-420.png")}
          />
          <Text style={[styles.text1, styles.textTypo1]}>
            <Text style={styles.text2}>{`孔雀餅乾
`}</Text>
            <Text style={styles.text3}>注意：本產品可能含有小麥或麩質成分</Text>
          </Text>
        </View>
        <Text style={styles.text}> 飲料</Text>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-421.png")}
          />
          <Text style={[styles.text14, styles.textTypo1]}>{`波蜜果菜汁
`}</Text>
        </View>
        <View style={styles.view}>
          <View style={[styles.child, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.item, styles.itemLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-422.png")}
          />
          <Text style={[styles.text14, styles.textTypo1]}>可口可樂</Text>
        </View>
      </View>
      <View style={styles.view13}>
        <View style={styles.viewLayout}>
          <View style={[styles.child22, styles.childPosition]} />
          <Text style={[styles.text33, styles.textFlexBox]}>糕點</Text>
        </View>
        <View style={[styles.view15, styles.viewLayout]}>
          <View style={[styles.child22, styles.childPosition]} />
          <Text style={[styles.text33, styles.textFlexBox]}>水果</Text>
        </View>
        <View style={[styles.view15, styles.viewLayout]}>
          <View style={[styles.child22, styles.childPosition]} />
          <Text style={[styles.text33, styles.textFlexBox]}>餅乾</Text>
        </View>
        <View style={[styles.view15, styles.viewLayout]}>
          <View style={[styles.child22, styles.childPosition]} />
          <Text style={[styles.text33, styles.textFlexBox]}>飲料</Text>
        </View>
      </View>
      <Text style={[styles.text37, styles.text37Position]}>
        <Text style={styles.txt}>
          <Text style={[styles.text38, styles.textTypo]}>{`左營 仁濟宮
`}</Text>
          <Text style={styles.text39}>
            <Text style={[styles.text40, styles.textTypo1]}>24小時營業</Text>
            <Text style={styles.text41}>
              <Text style={styles.text42}>{` `}</Text>
              <Text style={styles.text43}>營業中</Text>
            </Text>
          </Text>
        </Text>
      </Text>
      <Image
        style={[styles.homePage2Child, styles.text37Position]}
        contentFit="cover"
        source={require("../assets/rectangle-38.png")}
      />
      <Pressable
        style={styles.goBackButton}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          style={styles.iconLayout}
          contentFit="cover"
          source={require("../assets/go-back-button1.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.goCheckout, styles.text44Layout]}
        onPress={() => navigation.navigate("HomePage2")}
      >
        <Pressable
          style={[styles.wrapper, styles.text44Layout]}
          onPress={() => navigation.navigate("HomePage2")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-92.png")}
          />
        </Pressable>
        <Text style={[styles.text44, styles.text44Layout]}>前往結帳</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  childPosition: {
    borderColor: Color.colorWhitesmoke_300,
    borderStyle: "solid",
    bottom: "0%",
    right: "0%",
    left: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
    backgroundColor: Color.colorGray_100,
  },
  itemLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textTypo1: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  textFlexBox: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
  },
  viewLayout: {
    height: 50,
    width: 120,
  },
  text37Position: {
    left: 1,
    width: 430,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  text44Layout: {
    width: 360,
    height: 70,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  text: {
    fontSize: FontSize.size_16xl,
    fontFamily: FontFamily.interRegular,
    height: 70,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    width: 430,
  },
  child: {
    borderWidth: 1,
  },
  counterIcon: {
    height: "26.67%",
    width: "32.56%",
    top: "57.33%",
    right: "63.72%",
    bottom: "16%",
    left: "3.72%",
    maxWidth: "100%",
  },
  item: {
    height: "80%",
    width: "27.91%",
    top: "10%",
    right: "4.19%",
    bottom: "10%",
    left: "67.91%",
    borderRadius: Border.br_8xs,
  },
  text2: {
    fontSize: FontSize.size_6xl,
  },
  text3: {
    fontSize: FontSize.size_mini,
  },
  text1: {
    top: "12%",
    width: "62.79%",
    height: "66.67%",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: "3.72%",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  view: {
    height: 150,
    width: 430,
  },
  text14: {
    fontSize: FontSize.size_6xl,
    top: "12%",
    width: "62.79%",
    height: "66.67%",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: "3.72%",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  parent: {
    top: 359,
    height: 573,
    width: 430,
    left: 0,
    position: "absolute",
  },
  child22: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
  },
  text33: {
    fontSize: FontSize.size_xl,
    color: Color.colorDimgray_200,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: "0%",
    top: "0%",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  view15: {
    marginLeft: 10,
  },
  view13: {
    top: 287,
    left: -2,
    flexDirection: "row",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    width: 430,
    position: "absolute",
  },
  text38: {
    fontSize: FontSize.size_9xl,
    color: Color.colorBlack,
  },
  text40: {
    color: Color.colorGray_200,
  },
  text42: {
    color: Color.colorBlack,
  },
  text43: {
    color: Color.colorLimegreen,
  },
  text41: {
    fontWeight: "200",
    fontFamily: FontFamily.interExtraLight,
  },
  text39: {
    fontSize: FontSize.size_lg,
  },
  txt: {
    width: "100%",
  },
  text37: {
    top: 204,
    textAlign: "center",
    left: 1,
    height: 70,
    alignItems: "center",
    display: "flex",
  },
  homePage2Child: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    height: 200,
    opacity: 0.9,
    top: 0,
  },
  goBackButton: {
    left: 16,
    top: 16,
    width: 45,
    height: 45,
    position: "absolute",
  },
  icon1: {
    borderRadius: Border.br_xl,
  },
  wrapper: {
    top: 0,
    left: 0,
  },
  text44: {
    fontSize: FontSize.size_11xl,
    color: Color.colorWhite,
    top: 0,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    left: 0,
  },
  goCheckout: {
    top: 828,
    left: 33,
  },
  homePage2: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorGray_100,
    width: "100%",
  },
});

export default HomePage1;
