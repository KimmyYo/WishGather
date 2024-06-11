import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

const OfferingPage5 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.offeringPage3}>
      <View style={styles.view}>
        <View style={styles.viewLayout}>
          <View style={[styles.child, styles.childPosition]} />
          <Text style={[styles.text, styles.textFlexBox]}>點燈</Text>
        </View>
        <View style={[styles.view2, styles.viewLayout]}>
          <View style={[styles.child, styles.childPosition]} />
          <Text style={[styles.text, styles.textFlexBox]}>文創商品</Text>
        </View>
      </View>
      <Text style={styles.text2}>
        <Text style={styles.txt}>
          <Text style={styles.textTypo}>
            <Text style={styles.text4}>{`大甲 鎮瀾宮媽祖廟
`}</Text>
            <Text style={styles.text5}>
              <Text style={styles.text6}>06:00~21:30</Text>
            </Text>
          </Text>
          <Text style={styles.text5}>
            <Text style={styles.text8}>
              <Text style={styles.text9}>{` `}</Text>
              <Text style={styles.text10}>營業中</Text>
            </Text>
          </Text>
        </Text>
      </Text>
      <Image
        style={styles.offeringPage3Child}
        contentFit="cover"
        source={require("../assets/rectangle-3.png")}
      />
      <Pressable
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/go-back-button1.png")}
        />
      </Pressable>
      <View style={styles.parent}>
        <Text style={styles.text11}>{`  點燈 `}</Text>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-4.png")}
          />
          <Text style={[styles.text12, styles.textPosition]}>
            <Text style={styles.text13}>{`祈福燈 `}</Text>
            <Text style={styles.text14}>{`$800
`}</Text>
            <Text style={styles.text15}>請於備註填寫祈福對象資訊</Text>
          </Text>
        </View>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-43.png")}
          />
          <Text style={styles.textPosition}>
            <Text style={styles.textTypo}>
              <Text style={styles.text13}>{`光明燈 `}</Text>
              <Text style={styles.text14}>{`$1000
`}</Text>
            </Text>
            <Text style={styles.text20}>請於備註填寫祈福對象資訊</Text>
          </Text>
        </View>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-44.png")}
          />
          <Text style={styles.textPosition}>
            <Text style={styles.textTypo}>
              <Text style={styles.text13}>{`太歲燈 `}</Text>
              <Text style={styles.text14}>{`$1500
`}</Text>
            </Text>
            <Text style={styles.text20}>請於備註填寫祈福對象資訊</Text>
          </Text>
        </View>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-45.png")}
          />
          <Text style={styles.textPosition}>
            <Text style={styles.textTypo}>
              <Text style={styles.text13}>{`媽祖燈 `}</Text>
              <Text style={styles.text14}>{`$1500
`}</Text>
            </Text>
            <Text style={styles.text20}>請於備註填寫祈福對象資訊</Text>
          </Text>
        </View>
        <Text style={styles.text11}> 文創商品</Text>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-46.png")}
          />
          <Text style={[styles.text12, styles.textPosition]}>
            <Text style={styles.text13}>{`開運吊飾 `}</Text>
            <Text style={styles.text14}>{`$120
`}</Text>
          </Text>
        </View>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-47.png")}
          />
          <Text style={[styles.text12, styles.textPosition]}>
            <Text style={styles.text13}>{`符令壓克力鑰匙圈 `}</Text>
            <Text style={styles.text14}>{`$100
`}</Text>
          </Text>
        </View>
        <View style={styles.view3}>
          <View style={[styles.inner, styles.childPosition]} />
          <Image
            style={[styles.counterIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/counter3.png")}
          />
          <Image
            style={[styles.rectangleIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-48.png")}
          />
          <Text style={[styles.text12, styles.textPosition]}>
            <Text style={styles.text13}>{`好運公仔五入組 `}</Text>
            <Text style={styles.text14}>$1500</Text>
          </Text>
        </View>
      </View>
      <Pressable
        style={styles.goCheckout}
        onPress={() => navigation.navigate("OfferingPage")}
      >
        <Image
          style={[styles.goCheckoutChild, styles.text41Position]}
          contentFit="cover"
          source={require("../assets/rectangle-93.png")}
        />
        <Text style={[styles.text41, styles.text41Position]}>前往結帳</Text>
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
  textFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  viewLayout: {
    height: 50,
    width: 120,
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  textPosition: {
    top: "5%",
    width: "62.79%",
    height: "66.67%",
    left: "3.72%",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  text41Position: {
    left: 0,
    width: 360,
    top: -10,
    height: 70,
    position: "absolute",
  },
  child: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
  },
  text: {
    color: Color.colorDimgray_200,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    left: "0%",
    top: "0%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  view2: {
    marginLeft: 10,
  },
  view: {
    top: 287,
    left: -2,
    flexDirection: "row",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    width: 430,
    position: "absolute",
  },
  text4: {
    fontSize: FontSize.size_9xl,
    color: Color.colorBlack,
  },
  text6: {
    color: Color.colorGray_200,
  },
  text5: {
    fontSize: FontSize.size_lg,
  },
  textTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  text9: {
    color: Color.colorBlack,
  },
  text10: {
    color: Color.colorLimegreen,
  },
  text8: {
    fontWeight: "200",
    fontFamily: FontFamily.interExtraLight,
  },
  txt: {
    width: "100%",
  },
  text2: {
    top: 204,
    height: 70,
    left: 1,
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    width: 430,
    position: "absolute",
  },
  offeringPage3Child: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    height: 200,
    opacity: 0.9,
    top: 0,
    left: 1,
    width: 430,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  goBackButton: {
    left: 16,
    top: 16,
    width: 45,
    height: 45,
    position: "absolute",
  },
  text11: {
    fontSize: FontSize.size_16xl,
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    height: 70,
    alignItems: "center",
    display: "flex",
    width: 430,
  },
  inner: {
    borderWidth: 1,
  },
  counterIcon: {
    height: "26.67%",
    width: "32.56%",
    top: "57.33%",
    right: "63.72%",
    bottom: "16%",
    left: "3.72%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  rectangleIcon: {
    height: "80%",
    width: "27.91%",
    top: "10%",
    right: "4.19%",
    bottom: "10%",
    left: "67.91%",
    borderRadius: Border.br_8xs,
  },
  text13: {
    fontSize: FontSize.size_6xl,
  },
  text14: {
    fontSize: FontSize.size_xl,
  },
  text15: {
    fontSize: FontSize.size_mini,
  },
  text12: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  view3: {
    height: 150,
    width: 430,
  },
  text20: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.interRegular,
  },
  parent: {
    top: 370,
    height: 562,
    left: 1,
    position: "absolute",
  },
  goCheckoutChild: {
    borderRadius: Border.br_xl,
  },
  text41: {
    paddingVertical: 10,
    fontSize: FontSize.size_11xl,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  goCheckout: {
    top: 828,
    left: 33,
    width: 360,
    height: 70,
    position: "absolute",
  },
  offeringPage3: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: 932,
    overflow: "hidden",
    backgroundColor: Color.colorGray_100,
    width: "100%",
  },
});

export default OfferingPage5;
