import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button, Dimensions, Alert } from 'react-native';
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import GoBackButton1 from '../../components/Utility/GoBackButton1';
import PageTitle from '../../components/Utility/PageTitle';
import OfferingEditBlock from '../../components/Temple/OfferingEditBlock';

const {width, height} = Dimensions.get('window');

const mockOfferings = [
  {
    id: 1,
    name: '供品 A',
    price: 100,
    stock: 10,
    remark: '這是一個測試供品 A',
    imageUrl: 'https://via.placeholder.com/80',
  },
  {
    id: 2,
    name: '供品 B',
    price: 200,
    stock: 5,
    remark: '這是一個測試供品 B',
    imageUrl: 'https://via.placeholder.com/80',
  },
  {
    id: 3,
    name: '供品 C',
    price: 150,
    stock: 8,
    remark: '這是一個測試供品 C',
    imageUrl: 'https://via.placeholder.com/80',
  },
];

const OfferingEditPage = () => {
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    
    setTimeout(() => {
      setOfferings(mockOfferings);
      setLoading(false);
    }, 1000); 
  }, []);

  const handleDelete = (offeringId) => {
    Alert.alert(
      '刪除供品',
      '確定要刪除此供品嗎？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '確定',
          onPress: () => {
            // 刪除供品邏輯，從假資料中移除
            setOfferings(prevOfferings => prevOfferings.filter(item => item.id !== offeringId));
          },
        },
      ]
    );
  };

  const handleEdit = (offering) => {
    navigation.navigate('EditOfferingInfoPage', { offering });
  };

  const renderOfferingItem = ({ item }) => (
    <OfferingEditBlock item={item} handleEdit={handleEdit} handleDelete={() => handleDelete(item.id)} />
  );

  return (
    <SafeAreaProvider>
        <View style={{
                flex: 1,
                backgroundColor: '#f2f2f2',
                justifyContent: 'start',
                alignItems: 'center',
                // Paddings to handle safe area
                paddingTop: insets.top + 30,
                paddingBottom: insets.bottom - 40,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }}>
            <View style={styles.btncontainer}><GoBackButton1 /></View>
            <PageTitle iconName={'edit'} titleText="供品編輯"></PageTitle>

            {loading ? (
            <Text>Loading...</Text>
            ) : (
            <FlatList
                data={offerings}
                renderItem={renderOfferingItem}
                keyExtractor={(item) => item.id.toString()}
            />
            )}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  btncontainer:{
    position: 'absolute',
    top: 60,
    left: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  offeringBlock: {
    width: width * 0.95,
    height: 140,
    alignItems:'center',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  offeringImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  offeringInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  offeringName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  offeringPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  offeringStock: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  offeringRemark: {
    fontSize: 14,
    color: '#777',
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
});

export default OfferingEditPage;
