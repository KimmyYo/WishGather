import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import GoBackButton1 from '../../components/Utility/GoBackButton1'; // Assuming you have a GoBackButton component
import PageTitle from '../../components/Utility/PageTitle'; // Assuming you have a PageTitle component
import CloseButton from '../../components/Utility/CloseButton';
const { width, height } = Dimensions.get('window');

function TransportDetail({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { temple } = route.params; // Passing temple details from the previous page (WelfareTransportPage)

  // State to manage if the items list should be shown
  const [showItems, setShowItems] = useState(false);

  // Example items list (you can replace this with actual data)
  const itemsList = [
    { name: '供品A', quantity: 10 },
    { name: '供品B', quantity: 5 },
    { name: '供品C', quantity: 3 },
  ];

  return (
    <SafeAreaProvider>
      <View style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingTop: insets.top-50,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>

        {/* Top Section */}
        <View style={styles.headerSection}>
          <Image source={{ uri: temple.IMAGE }} style={styles.templeImage} />
          <Text style={styles.templeName}>{temple.NAME}</Text>
          <Text style={styles.templeAddress}>{'地址 : '}{temple.ADDRESS}</Text>
        </View>

        <View style={styles.btncontainer}>
            <CloseButton />
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送期限 : </Text>
            <Text style={styles.detailValue}>4/1 ~ 4/30</Text> {/* Static value for now */}
          </Text>

          <Text style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送距離 : </Text>
            <Text style={styles.detailValue}>2.3 km</Text> {/* Static value for now */}
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>配送物資 : </Text>
            <TouchableOpacity
              style={styles.viewItemsButton}
              onPress={() => setShowItems(!showItems)}
            >
              <Text style={styles.viewItemsText}>{showItems ? '收起' : '查看'}</Text>
            </TouchableOpacity>
          </View>

          {/* Conditionally render items list */}
          {showItems && (
            <View style={styles.itemsList}>
              {itemsList.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>數量: {item.quantity}</Text>
                </View>
              ))}
            </View>
          )}

        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    height: '40%',
    backgroundColor: '#FF6D00',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  btncontainer:{
    position: 'absolute',
    top: 20,
    right:10,
  },
  templeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  templeName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  templeAddress:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20, 
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
  },
  detailLabel: {
    fontSize: 18,
    color: '#4F4F4F',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#4F4F4F',
  },
  viewItemsButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginLeft :8,
    borderRadius: 5,
  },
  viewItemsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsList: {
    marginTop: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight:'semibold',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight:'semibold',
    color: '#333',
  },
});

export default TransportDetail;
