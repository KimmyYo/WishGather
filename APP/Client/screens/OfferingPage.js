import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import OfferingItem from '../components/OfferingItem';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

const OfferingPage = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();



  const chosenItems = [
    { id: '1', imageSource: require('../assets/rectangle-46.png'), title: '開運吊飾', price: '$120', description: '備註：' },
    { id: '2', imageSource: require('../assets/rectangle-43.png'), title: '光明燈', price: '$800', description: '備註：被祈福人資訊' },
    // Add more items as needed
  ];

  const [mageeditIconVisible, setMageeditIconVisible] = useState(false);
  const [mageeditIcon1Visible, setMageeditIcon1Visible] = useState(false);

  const openMageeditIcon = useCallback(() => setMageeditIconVisible(true), []);
  const closeMageeditIcon = useCallback(() => setMageeditIconVisible(false), []);
  const openMageeditIcon1 = useCallback(() => setMageeditIcon1Visible(true), []);
  const closeMageeditIcon1 = useCallback(() => setMageeditIcon1Visible(false), []);

  const renderItem = ({ item }) => (
    <OfferingItem
      imageSource={item.imageSource}
      title={item.title}
      price={item.price}
      description={item.description}
    />
  );

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>

        <View style={{ width: width * 0.8, height: 65, flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
    
            <Pressable
              style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => navigation.navigate("UserPage")}
            >
              <Image
                style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                source={require("../assets/go-back-button.png")}
              />
            </Pressable>

            <Text style={{ fontSize: 30, fontFamily: FontFamily.interSemiBold, color: Color.colorDimgray_200 }}>
              訂單確認
            </Text>
    
        </View>

        <FlatList
          data={chosenItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.itemsContainer}
        />

        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('OfferingPage5')}
        >
          <Image style={styles.addButtonImage} source={require('../assets/rectangle-12.png')} />
          <Image style={styles.plusIcon} source={require('../assets/plus-icon.png')} />
          <Text style={styles.addButtonText}>新增商品</Text>
        </Pressable>

        <Pressable
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('OfferingPage1')}
        >
          <Image style={styles.checkoutImage} source={require('../assets/rectangle-9.png')} />
          <Text style={styles.checkoutText}>下一步</Text>
        </Pressable>

        <Text style={[styles.text, styles.paymentInfo]}>
          <Text>宮廟名稱 : 大甲鎮瀾宮媽祖廟{'\n'}</Text>
          <Text>共計 3 樣商品，小計 1040 元{'\n'}</Text>
          <Text>付款方式：線上轉帳付款</Text>
        </Text>

        

        <Modal animationType="fade" transparent visible={mageeditIconVisible}>
          <View style={styles.overlayContainer}>
            <Pressable style={styles.overlayBg} onPress={closeMageeditIcon} />
            {/* AddressOverlay content */}
          </View>
        </Modal>

        <Modal animationType="fade" transparent visible={mageeditIcon1Visible}>
          <View style={styles.overlayContainer}>
            <Pressable style={styles.overlayBg} onPress={closeMageeditIcon1} />
            {/* LightInfoOverlay content */}
          </View>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGray_100,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_200,
    textAlign:'center',
  },
  goBackButton: {
    left: width * 0.001,
    top: width * 0.001,
    width: 45,
    height: 45,
    position: "absolute",
  },
  templeName: {
    fontSize: FontSize.size_8xl,
    marginBottom: 15,
  },
  itemsContainer: {
    width: '100%',
    paddingBottom: 70,
  },
  backButton: {
    position: 'absolute',
    marginTop: '15%',
    right: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButton: {
    width: width * 0.85,
    bottom: height * 0.03,
    left: '8%',
    height: 70,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutImage: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Border.br_xl,
  },
  checkoutText: {
    position: 'absolute',
    fontSize: FontSize.size_11xl,
    fontWeight: '600',
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
  },
  text: {
    width: '100%',
    fontFamily: FontFamily.interMedium,
    fontWeight: '500',
    fontSize: FontSize.size_xl,
    color: Color.colorBlack,
  },
  paymentInfo: {
    position: 'absolute',
    top: '65%',
    left: '8%',
  },
  addButton: {
    position: 'absolute',
    right: 10,
    top: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorGray_100,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addButtonImage: {
    ...StyleSheet.absoluteFillObject,
  },
  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addButtonText: {
    fontSize: FontSize.size_xl,
    color: Color.colorDimgray_100,
  },
  mageedit: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mageedit1: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
  },
  overlayBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default OfferingPage;
