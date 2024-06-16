import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import OfferingItem from "../components/OfferingItem"; // 引入新組件
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

const OfferingPage5 = () => {
  const navigation = useNavigation();

  {/*新增Category組件，用來顯示該廟宇提供甚麼類別的商品，連接資料庫處*/}
  const Category = ({ label }) => (
    <View style={[styles.categoryContainer, styles.shadowBox]}>
      <Text style={styles.categoryText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* 類別索引 */}
      <View style={styles.categories}>
        <Category label="點燈" />
        <Category label="文創商品" />
      </View>

      {/* 顯示廟宇資訊，連接資料庫處:名稱、營業時間*/}
      <View style={styles.infoContainer}>
        <Text style={styles.mainTitle}>大甲鎮瀾宮媽祖廟</Text>
        <Text style={styles.subTitle}>06:00~21:30 營業中</Text>
      </View>

      {/* 廟宇照片，連接資料庫處: 廟宇圖片 */}
      <Image
        style={styles.headerImage}
        contentFit="cover"
        source={require("../assets/rectangle-3.png")}
      />

      {/* OfferingPage專屬黑底返回鍵 */}
      <Pressable style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Image
          style={styles.goBackIcon}
          contentFit="cover"
          source={require("../assets/go-back-button1.png")}
        />
      </Pressable>

      {/* 顯示該廟宇提供之供品類別其所有內容，連接資料庫處 : imageSource、標題、金額、敘述*/}
      <ScrollView style={styles.itemsContainer}>
        <Text style={styles.sectionTitle}>點燈</Text>
        <OfferingItem
          imageSource={require("../assets/rectangle-4.png")}
          title="祈福燈"
          price="$800"
          description="請於備註填寫祈福對象資訊"
        />
        <OfferingItem
          imageSource={require("../assets/rectangle-43.png")}
          title="光明燈"
          price="$1000"
          description="請於備註填寫祈福對象資訊"
        />
        <OfferingItem
          imageSource={require("../assets/rectangle-44.png")}
          title="太歲燈"
          price="$1500"
          description="請於備註填寫祈福對象資訊"
        />
        <OfferingItem
          imageSource={require("../assets/rectangle-45.png")}
          title="媽祖燈"
          price="$1500"
          description="請於備註填寫祈福對象資訊"
        />
        <Text style={styles.sectionTitle}>文創商品</Text>
        <OfferingItem
          imageSource={require("../assets/rectangle-46.png")}
          title="開運吊飾"
          price="$120"
        />
        <OfferingItem
          imageSource={require("../assets/rectangle-47.png")}
          title="符令壓克力鑰匙圈"
          price="$100"
        />
        <OfferingItem
          imageSource={require("../assets/rectangle-48.png")}
          title="好運公仔五入組"
          price="$1500"
        />
      </ScrollView>
      
      {/* 前往結帳按鈕 */}
      <Pressable
        style={styles.goCheckoutButton}
        onPress={() => navigation.navigate("OfferingPage")}
      >
        <Image
          style={styles.checkoutImage}
          contentFit="cover"
          source={require("../assets/rectangle-93.png")}
        />
        <Text style={styles.checkoutText}>前往結帳</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
    overflow: "hidden",
  },
  shadowBox: {
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    borderColor: Color.colorWhitesmoke_300,
    backgroundColor: Color.colorGray_100,
    justifyContent: "center",
    alignItems: "center",
  },
  categories: {
    flexDirection: "row",
    paddingHorizontal: Padding.p_mini,
    paddingVertical: Padding.p_3xs,
    top: 287,
    position: "absolute",
    width: 430,
  },
  categoryContainer: {
    height: 50,
    width: 120,
    marginHorizontal: 5,
  },
  categoryText: {
    color: Color.colorDimgray_200,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  infoContainer: {
    top: 204,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    width: 430,
    position: "absolute",
  },
  mainTitle: {
    fontSize: FontSize.size_9xl,
    color: Color.colorBlack,
  },
  subTitle: {
    fontSize: FontSize.size_lg,
    color: Color.colorGray_200,
  },
  headerImage: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    height: 200,
    opacity: 0.9,
    width: 430,
    position: "absolute",
    top: 0,
  },
  goBackButton: {
    left: 16,
    top: 16,
    width: 45,
    height: 45,
    position: "absolute",
  },
  goBackIcon: {
    height: "100%",
    width: "100%",
  },
  itemsContainer: {
    top: 370,
    paddingHorizontal: Padding.p_mini,
  },
  sectionTitle: {
    paddingHorizontal:'2%',
    fontSize: FontSize.size_16xl,
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
    height: 70,
    textAlign: "left",
    alignItems: "center",
    display: "flex",
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

export default OfferingPage5;