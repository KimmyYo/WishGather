import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { FontFamily, Border, FontSize, Color } from '../GlobalStyles';

const { width } = Dimensions.get('window');

const CartItem = ({ onPress, imageSource, orderTitle, orderDetails, onDelete }) => {
  const renderRightActions = () => (
    <View style={styles.deleteButtonContainer}>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>刪除</Text>
      </Pressable>
    </View>
  );

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>

          <Image style={styles.image} source={imageSource} />

          <View style={styles.textContainer}>
            <Text style={styles.title}>{orderTitle}</Text>
            <Text style={styles.description}>{orderDetails}</Text>
            <Pressable onPress={onPress} style={styles.viewOrderButton}>
              <Text style={styles.viewOrderText}>編輯</Text>
            </Pressable>
          </View>

        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 150,
    backgroundColor: Color.colorGray_100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: Color.colorWhitesmoke_300,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent:"center",
    alignItems:"flex-start",
    marginTop:10,
    paddingLeft: 15,
    flex: 1,
  },
  title: {
    height:40,
    fontSize: 23,
    fontWeight: '500'
  },
  description: {
    height:20,
    fontSize: 14,
    color: Color.colorGray_400,
    marginBottom: 5,
  },
  viewOrderButton: {
    height: 45,
    width: '100%',
    backgroundColor: Color.colorGoldenrod,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Border.br_3xs,
  },
  viewOrderText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FontFamily.interSemiBold,
  },
  deleteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 150,
    marginLeft: 5,
    borderRadius: Border.br_xl,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: FontSize.size_xl,
  },
});

export default CartItem;
