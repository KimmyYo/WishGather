import React, { useState, useMemo } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, TextInput, Dimensions, FlatList, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Color } from "../GlobalStyles";
import ProductItem from "../components/ProductItem";
// import Footer from "../components/footer";
import { FontFamily, FontSize, Border } from '../GlobalStyles';

const { width } = Dimensions.get('window');

const OfferingPage4 = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const products = [
    { id: '1', imageSource: require("../assets/rectangle-19.png"), title: "線上點燈" },
    { id: '2', imageSource: require("../assets/rectangle-191.png"), title: "金紙香品" },
    { id: '3', imageSource: require("../assets/rectangle-192.png"), title: "生鮮蔬果" },
    { id: '4', imageSource: require("../assets/rectangle-193.png"), title: "精緻糕點" },
    { id: '5', imageSource: require("../assets/rectangle-194.png"), title: "餅乾糖果" },
    { id: '6', imageSource: require("../assets/rectangle-195.png"), title: "解渴飲品" },
    { id: '7', imageSource: require("../assets/rectangle-196.png"), title: "文創周邊" },
  ];

  // Memoize filtered products to avoid unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!searchText) return products;
    return products.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, products]);

  const renderItem = ({ item }) => (
    <View style={styles.productItemWrapper}>
      <ProductItem
        onPress={() => navigation.navigate("OfferingPage6")}
        imageSource={item.imageSource}
        title={item.title}
      />
    </View>
  );

  const noResults = searchText && filteredProducts.length === 0;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.offeringPage4}>
          {/* Category Title */}
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={() => navigation.navigate("HomePage")}>
              <Image style={styles.backIcon} source={require("../assets/go-back-button.png")} />
            </Pressable>
            <Text style={styles.headerText}>供品類別</Text>
          </View>

          {/* SearchBar */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="搜尋(Ex:祭拜禮盒)"
              style={styles.input}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {noResults ? (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>查無此品項 ! 請重新輸入 !</Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={2}
              contentContainerStyle={styles.flatListContent}
            />
          )}

          {/* <Footer /> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
    overflow: 'hidden',
  },
  offeringPage4: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
  },
  header: {
    width: width * 0.9,
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 30,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_200,
    marginLeft: 10,
    fontWeight: '500',
  },
  searchContainer: {
    width: width,
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    width: width * 0.9,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  flatListContent: {
    paddingVertical: 10,
    paddingBottom: 60,
  },
  productItemWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    maxWidth: '50%', // Ensures the item occupies half of the screen width
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray_200,
    textAlign: 'center',
  },
});

export default OfferingPage4;
