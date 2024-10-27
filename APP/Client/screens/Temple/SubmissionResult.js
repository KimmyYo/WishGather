import React from "react";
import { StyleSheet, Pressable, Text, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

import GoBackButton1 from "../../components/Utility/GoBackButton1";
import PageTitle from "../../components/Utility/PageTitle";

import { FontSize, FontFamily, Color, Border } from "../../GlobalStyles";

const { width, height } = Dimensions.get('window');

const SubmissionResult = ({ route }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { items } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.countContainer}>
                <Text style={styles.itemCount}>x {item.count}</Text>
            </View>
        </View>
        <View style={styles.orangeBar} />
    </View>
 );

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={[styles.container, {
                paddingTop: insets.top,
                paddingBottom: insets.bottom+20,
                paddingLeft: insets.left,
                paddingRight: insets.right
            }]}>
      
          <View style={{width:'100%'}}><GoBackButton1 /></View>

          <View style={styles.header}>
              
          </View>
          
          <View style={styles.content}>
               <PageTitle titleText={'提交成功'} iconName2={'checkcircle'}/>
               
               <FlatList
                   data={items}
                   renderItem={renderItem}
                   keyExtractor={(item, index) => index.toString()}
                   ListHeaderComponent={<View style={styles.listHeader} />}
                   ListFooterComponent={<View style={styles.listFooter} />}
               />
           </View>

           <TouchableOpacity
               style={styles.returnHomeButton}
               onPress={() => navigation.navigate("TempleHomePage")}
           >
               <View style={styles.buttonContent}>
                  <AntDesign name="home" size={24} color="white" />
                  <Text style={styles.returnHomeText}>返回首頁</Text>
              </View>
           </TouchableOpacity>

      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  
  content: {
    flex: 1,
    width: width * 0.9,
    alignSelf: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
},

contentTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4F4F4F',
    marginBottom: 20,
    textAlign: 'center',
},
itemContainer: {
    width: width*0.9,
    height: 70,
    position: 'relative',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',

    justifyContent:'center',
},
itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
},
itemName: {
    fontSize: 18,
    color: '#4F4F4F',
    fontWeight: '500',
},
countContainer: {
    backgroundColor: '#FFF5E6',  // 淡橘色背景
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
},
itemCount: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF9C33',  // 橘色文字
},
orangeBar: {
    position: 'absolute',
    left: 0,
    width: 4,
    height: '80%',
    backgroundColor: '#FF9C33',
    borderRadius: 2,
    alignSelf: 'center',
},
listHeader: {
    height: 10,
},
listFooter: {
    height: 100,
},
returnHomeButton: {
  position: 'absolute',
  bottom: 30,
  alignSelf: 'center',
  width: width * 0.9,
  height: 50,
  backgroundColor: '#FF9C33',
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
buttonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,  // icon 和文字的間距
},
returnHomeText: {
  fontSize: 18,
  color: 'white',
  fontWeight: 'bold',
},
});

export default SubmissionResult;