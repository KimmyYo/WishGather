import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import OfferingItem from '../components/OfferingItem';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles';

const { width, height } = Dimensions.get('window');

const OfferingPage = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const chosenItems = [
    { id: '1', imageSource: require('../assets/rectangle-46.png'), title: '開運吊飾', price: '120', description: '無' },
    { id: '2', imageSource: require('../assets/rectangle-43.png'), title: '光明燈', price: '800', description: '需填寫被祈福人資訊' },
    // Add more items as needed
  ];

  const [mageeditIconVisible, setMageeditIconVisible] = useState(false);
  const [mageeditIcon1Visible, setMageeditIcon1Visible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [note, setNote] = useState('');

  const openMageeditIcon = useCallback(() => setMageeditIconVisible(true), []);
  const closeMageeditIcon = useCallback(() => setMageeditIconVisible(false), []);
  const openMageeditIcon1 = useCallback(() => setMageeditIcon1Visible(true), []);
  const closeMageeditIcon1 = useCallback(() => setMageeditIcon1Visible(false), []);
  const openNoteModal = useCallback(() => setNoteModalVisible(true), []);
  const closeNoteModal = useCallback(() => setNoteModalVisible(false), []);
  
  const handleNoteConfirm = useCallback(() => {
    setNoteModalVisible(false);
  }, []);

  return (
    <SafeAreaProvider>
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate("UserPage")}>
            <Image style={styles.backIcon} source={require("../assets/go-back-button.png")} />
          </Pressable>
          <Text style={styles.headerText}>訂單確認</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.itemsContainer}>
            {chosenItems.map((item) => (
              <OfferingItem
                key={item.id}
                imageSource={item.imageSource}
                title={item.title}
                price={item.price}
                description={item.description}
              />
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable style={styles.noteButton} onPress={openNoteModal}>
              <Text style={styles.addButtonText}>新增備註</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={() => navigation.navigate('OfferingPage5')}>
              <Image style={styles.plusIcon} source={require('../assets/plus-icon.png')} />
              <Text style={styles.addButtonText}>新增商品</Text>
            </Pressable>
          </View>

          <View style={styles.orderInfoContainer}>
            <Text style={styles.orderInfoText}>
              <Text style={styles.orderInfoTitle}>訂單資訊{'\n'}</Text>
              <Text style={styles.infoText}>宮廟名稱 : 大甲鎮瀾宮媽祖廟{'\n'}</Text>
              <Text style={styles.infoText}>總數量 : 3項{'\n'}</Text>
              <Text style={styles.infoText}>總金額 : 1040元{'\n'}</Text>
              <Text style={styles.infoText}>付款方式：線上轉帳付款{'\n'}</Text>
              <Text style={styles.infoText}>領貨日期 : 2024/08/06(三){'\n'}</Text>
              {note ? <Text style={styles.infoText}>備註 : {note}</Text> : null}
            </Text>
          </View>
        </ScrollView>

        <Pressable style={styles.checkoutButton} onPress={() => navigation.navigate('OfferingPage1')}>
          <Image style={styles.checkoutImage} source={require('../assets/rectangle-9.png')} />
          <Text style={styles.checkoutText}>下一步</Text>
        </Pressable>

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

        <Modal animationType="slide" transparent visible={noteModalVisible}>
          <View style={styles.overlayContainer}>
            <View style={styles.noteModalContent}>
              <Text style={styles.modalTitle}>新增備註</Text>
              <TextInput
                style={styles.notesInput}
                placeholder='請在此撰寫備註...'
                multiline
                value={note}
                onChangeText={setNote}
              />
              <View style={{ flexDirection: "row" }}>
                <Pressable style={styles.modalButton} onPress={handleNoteConfirm}>
                  <Text style={styles.modalButtonText}>確認</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={closeNoteModal}>
                  <Text style={styles.modalButtonText}>取消</Text>
                </Pressable>
              </View>
            </View>
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
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  itemsContainer: {
    width: width * 0.9,
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width * 0.9,
    marginVertical: 10,
  },
  addButton: {
    width: 120,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    marginLeft:5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  noteButton: {
    width: 120,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3C3C3C",
  },
  orderInfoContainer: {
    width: width * 0.9,
    height: height * 0.35,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  orderInfoText: {
    lineHeight: 30,
  },
  orderInfoTitle: {
    color: Color.colorDimgray_200,
    fontWeight: '500',
    fontSize: 24,
  },
  infoText: {
    fontSize: 18,
    color: Color.colorBlack,
    fontWeight: '500',
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
  noteModalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notesInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  modalButton: {
    marginTop: 10,
    marginRight: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.colorDimgray_200,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default OfferingPage;
