import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, FlatList, Dimensions, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import OfferingItem from "../../components/OfferingItem"; 
import CloseButton from "../../components/CloseButton";
import SetButton from '../../components/Utility/SetButton';

const { width, height } = Dimensions.get('window');

const HomePage1 = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const categories = ["點燈", "文創商品"];
  const [selectedOfferings, setSelectedOfferings] = useState([]);
  const [chosenItems, setChosenItems] = useState([]); // State to store selected items with quantity
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (title, quantity, price, id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [title]: { quantity, price },
    }));

    Alert.alert('新增成功', `${title} 已新增至購物車`);
    
    console.log('title:', title);
    console.log('Updated quantities:', quantity); // Check the quantities
    console.log('Chosen Items:', chosenItems); // Check the chosen items
  };

  const offerings_1 = [
    { id: '1', imageSource: require("../../assets/rectangle-4.png"), title: "祈福燈", price: "800", description: "請於備註填寫祈福對象資訊" },
    { id: '2', imageSource: require("../../assets/rectangle-43.png"), title: "光明燈", price: "1000", description: "請於備註填寫祈福對象資訊" },
    { id: '3', imageSource: require("../../assets/rectangle-44.png"), title: "太歲燈", price: "1500", description: "請於備註填寫祈福對象資訊" },
    { id: '4', imageSource: require("../../assets/rectangle-45.png"), title: "媽祖燈", price: "1500", description: "請於備註填寫祈福對象資訊" },
  ];

  const offerings_2 = [
    { id: '1', imageSource: require("../../assets/rectangle-46.png"), title: "開運吊飾", price: "120", description:"無"},
    { id: '2', imageSource: require("../../assets/rectangle-47.png"), title: "符令壓克力鑰匙圈", price: "100", description:"無" },
    { id: '3', imageSource: require("../../assets/rectangle-48.png"), title: "好運公仔五入組", price: "1500", description:"無" },  
  ];

  const renderOfferingItem = ({ item }) => {
    return (
      <OfferingItem
        imageSource={item.imageSource}
        title={item.title}
        price={item.price}
        description={item.description}
        quantity={quantities[item.title]?.quantity || 0}
        onAddToCart={(title, quantity) => handleAddToCart(title, quantity, item.price, item.id)}
      />
    );
  };

  const handleCheckout = () => {
    const items = Object.keys(quantities)
      .filter(title => quantities[title].quantity > 0)
      .map(title => ({
        title,
        quantity: quantities[title].quantity,
        price: quantities[title].price,
      }));
  
    console.log("Selected items for checkout:", items);  // Log to check selected items
  
    navigation.navigate('OfferingPage', { items });
  };

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: insets.top -50,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }}>
        <View>
          <Image style={styles.headerImage} contentFit="cover" source={require("../../assets/rectangle-3.png")} />
          <CloseButton />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.mainTitle}>大甲鎮瀾宮媽祖廟</Text>
          <Text style={styles.subTitle}>營業時間 : 06:00~21:30</Text>
        </View>

        <View style={{ width:width*0.95 ,flexDirection: "row", alignSelf:"center", justifyContent: "start", paddingVertical: 10, borderBottomWidth: 1, borderColor:"#ccc"}}>
          {categories.map((category) => (
            <Pressable key={category} onPress={() => setSelectedCategory(category)} style={{borderRadius:15}}>
              <Text style={[styles.category, selectedCategory === category && styles.selectedCategory]}>
                {category}
              </Text>
            </Pressable>
          ))}
        </View>

        {selectedCategory === "點燈" ? (
          <FlatList
            data={offerings_1}
            renderItem={renderOfferingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <FlatList
            data={offerings_2}
            renderItem={renderOfferingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
          />
        )}
        
        <View style={styles.buttonContainer}>
          <SetButton onPress={handleCheckout} btnText={'前往結帳'} btnStatus={'primary'} />
        </View>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  headerImage: {
    height: height * 0.30,
    opacity: 0.9,
    width: width,
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: '#4F4F4F',
  },
  subTitle: {
    fontSize: 16,
    color: "#9D9D9D",
    marginTop: 5,
  },
  category: {
    fontSize: 18,
    color: "#4F4F4F",
    fontWeight: "500",
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginLeft: width * 0.05,
  },
  selectedCategory: {
    color: "white",
    backgroundColor: "#FFA042",
    borderRadius: 15,
  },
  flatListContent: {
    paddingVertical: 10,
    justifyContent:'center',
    alignItems: 'center',
    paddingBottom:60,
  },
  buttonContainer: {
    width: width,
    justifyContent: "center",
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
});

export default HomePage1;
