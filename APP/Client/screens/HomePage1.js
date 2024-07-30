import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, FlatList, Dimensions } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import OfferingItem from "../components/OfferingItem"; 
import GoBackButton_B from "../components/GoBackButton_B";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

const { width, height } = Dimensions.get('window');

const HomePage1 = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Offering categories
  const categories = ["點燈", "文創商品"];

  // State for selected offerings and category
  const [selectedOfferings, setSelectedOfferings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Handler for selecting an offering
  const handleSelectOffering = (offering) => {
    setSelectedOfferings((prevOfferings) => [...prevOfferings, offering]);
  };

  // Handler for checkout
  const handleCheckout = () => {
    navigation.navigate("OfferingPage", { selectedOfferings });
  };

  // Offerings data
  const offerings = [
    { id: '1', imageSource: require("../assets/rectangle-4.png"), category:"點燈", title: "祈福燈", price: "$800", description: "請於備註填寫祈福對象資訊" },
    { id: '2', imageSource: require("../assets/rectangle-43.png"), category:"點燈", title: "光明燈", price: "$1000", description: "請於備註填寫祈福對象資訊" },
    { id: '3', imageSource: require("../assets/rectangle-44.png"), category:"點燈", title: "太歲燈", price: "$1500", description: "請於備註填寫祈福對象資訊" },
    { id: '4', imageSource: require("../assets/rectangle-45.png"), category:"點燈", title: "媽祖燈", price: "$1500", description: "請於備註填寫祈福對象資訊" },
    { id: '5', imageSource: require("../assets/rectangle-46.png"), category:"文創商品", title: "開運吊飾", price: "$120" },
    { id: '6', imageSource: require("../assets/rectangle-47.png"), category:"文創商品", title: "符令壓克力鑰匙圈", price: "$100" },
    { id: '7', imageSource: require("../assets/rectangle-48.png"), category:"文創商品", title: "好運公仔五入組", price: "$1500" },
  ];

  // Filtered offerings based on selected category
  const filteredOfferings = offerings.filter(offering => offering.category === selectedCategory);

  useEffect(() => {
    console.log(`Selected Category: ${selectedCategory}`);
    console.log('Filtered Offerings:', filteredOfferings);
  }, [selectedCategory]);

  const renderOfferingItem = ({ item }) => {
    console.log(`Rendering Offering: ${JSON.stringify(item, null, 2)}`);
    
    return (
      <OfferingItem
        imageSource={item.imageSource}
        title={item.title}
        price={item.price}
        description={item.description}
        onSelect={() => handleSelectOffering(item)}
      />
    );
  };

  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => setSelectedCategory(item)}>
      <View style={[styles.categoryContainer, selectedCategory === item && styles.selectedCategory]}>
        <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
          {item}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.homePage1, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
        {/* Temple Image */}
        <View>
          <Image style={styles.headerImage} contentFit="cover" source={require("../assets/rectangle-3.png")} />
          <GoBackButton_B/>
        </View>

        {/* Temple Title */}
        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>大甲鎮瀾宮媽祖廟</Text>
          <Text style={styles.subTitle}>06:00~21:30 營業中</Text>
        </View>

        {/* Show Category */}
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        />

        {/* Show Offerings */}
        <FlatList
          data={filteredOfferings} // 使用過濾後的數據
          renderItem={renderOfferingItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsContainer}
        />

        <Pressable style={styles.goCheckoutButton} onPress={handleCheckout}>
          <Image style={styles.checkoutImage} contentFit="cover" source={require("../assets/rectangle-93.png")} />
          <Text style={styles.checkoutText}>前往結帳</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  homePage1: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: Color.colorGray_100,
  },
  categories: {
    flexDirection: "row",
    width: width*0.9,
    marginHorizontal: 3,
    marginVertical: 3,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
  },
  categoryContainer: {
    height: 40,
    width: 120,
    marginHorizontal: 5,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    backgroundColor:"#9D9D9D",
  },
  selectedCategoryText: {
    color:"#FFFFFF",
  },
  categoryText: {
    color: Color.colorDimgray_200,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  mainTitle: {
    fontSize: FontSize.size_9xl,
    fontWeight: "600",
    color: 'black',
  },
  subTitle: {
    fontSize: FontSize.size_lg,
    color: Color.colorGray_200,
    marginTop: 5,
  },
  headerImage: {
    height: height * 0.25,
    opacity: 0.9,
    width: width,
    alignSelf: 'center',
  },
  itemsContainer: {
    position:"absolute",
    flexDirection: 'column',
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default HomePage1;
