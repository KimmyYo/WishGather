import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Counter from "../components/Counter";

const { width } = Dimensions.get('window');

const ProductPage = ({ route }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { imageSource, title, price, description } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [remark, setRemark] = useState('');

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    navigation.navigate('HomePage1', { selectedQuantity: quantity, itemTitle: title });
  };

  return (
    <SafeAreaProvider>
      <View style={{
          flex: 1,
          justifyContent: 'start',
          alignItems: 'start',
          backgroundColor: "white",
          paddingTop: insets.top + 15,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right 
        }}>  
        <Pressable style={styles.closeButton} onPress={() => navigation.navigate('HomePage1')}>
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>
            
        <Image style={styles.image} contentFit="cover" source={imageSource} />
        
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>$ {price}</Text>
        {description && <Text style={styles.description}>備注 : {description}</Text>}
        
        <View style={{width:width, borderTopWidth:1, borderColor:"#E0E0E0", marginTop: 20}}>
            <Text style={styles.remark}>特殊指示 : </Text>
            <TextInput
            style={styles.remarkInput}
            placeholder="請輸入指示..."
            value={remark}
            onChangeText={setRemark}
            />
        </View>
        

        <View style={styles.counterContainer}>
          <Counter quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
        </View>

        <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>新增至購物車</Text>
        </Pressable>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Color.colorWhite,
  },
  image: {
    width: "100%",
    height: 250,
    alignSelf: 'center',
    marginBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: "gray",
    marginLeft: 20,
    marginVertical: 5,
  },
  description: {
    fontSize: 18,
    color: Color.colorGray_500,
    marginLeft: 20,
    marginVertical: 5,
  },
  remark: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
    marginVertical: 10,
  },
  counterContainer: {
    width: width,
    alignItems: 'center',
    borderTopWidth: 1, 
    borderColor: "#E0E0E0",
    marginTop: 20,
    paddingTop: 10,
  },
  remarkInput: {
    width: width * 0.9,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.interRegular,
    marginLeft: 20,
    marginVertical: 5,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 20,
    left: width * 0.1,
    width: width * 0.8,
    height: 50,
    backgroundColor: "#FFA500",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductPage;
