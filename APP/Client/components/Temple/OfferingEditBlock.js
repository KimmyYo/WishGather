import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const OfferingEditBlock = ({ item, handleEdit, handleDelete }) => {
  const renderRightActions = () => (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
        <Text style={styles.actionText}>編輯</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.actionText}>刪除</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.offeringBlock}>
        <Image source={{ uri: item.imageUrl }} style={styles.offeringImage} />
        <View style={styles.offeringInfo}>
          <Text style={styles.offeringName}>{item.name}</Text>
          <Text style={styles.offeringPrice}>金額: ${item.price}</Text>
          <Text style={styles.offeringStock}>庫存數量: {item.stock}</Text>
          <Text style={styles.offeringRemark}>備註: {item.remark || '無'}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  offeringBlock: {
    width: width * 0.95,
    height: 140,
    alignItems:'center',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  offeringImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  offeringInfo: {
    flex: 1,
    paddingLeft: 18,
  },
  offeringName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#4F4F4F'
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
  // Swipe actions styles
  rightActionContainer: {
    height: 140,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#66a6ff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    width: 80,
    height: '100%',
    backgroundColor: '#ff524f',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius:10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OfferingEditBlock;
