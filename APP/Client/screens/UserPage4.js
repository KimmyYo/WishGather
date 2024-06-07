import * as React from "react";
import { ScrollView, StyleSheet, View, TextInput, Text, KeyboardAvoidingView, Platform, Pressable, YellowBox } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { FontSize, Padding, FontFamily, Color, Border } from "../GlobalStyles";



const UserPage4 = () => {
  const navigation = useNavigation();
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
    
      <View style={styles.userPage4}>
          
          <Pressable
          style={styles.goBackButton}
          onPress={() => navigation.navigate("UserPage")}
          >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/go-back-button.png")}
          />
        </Pressable>

        <Text style={[styles.title, styles.textTypo]}>個資維護</Text>

        <Image
          style={styles.userPageChild}
          contentFit="cover"
          source={require("../assets/ellipse-2.png")}
        />

        {/* 待修改 : 增加更換照片功能 */}
       
        {/* 輸入框 */}
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>姓名</Text>
              <TextInput placeholder="姓名" style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>電子郵件</Text>
              <TextInput placeholder="電子郵件" style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>密碼</Text>
              <TextInput placeholder="密碼" style={styles.input} secureTextEntry />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>連絡電話</Text>
              <TextInput placeholder="連絡電話" style={styles.input} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>付款方式</Text>
              <TextInput placeholder="付款方式" style={styles.input} secureTextEntry />
            </View>
          </View>

          {/* 確認送出按钮 */}
          <Pressable
            style={[styles.confirmButton, styles.confirmLayout]}
            onPress={() => navigation.navigate("OfferingPage3")}
          >
            <Image
              style={[styles.confirmButtonChild, styles.confirmLayout]}
              contentFit="cover"
              source={require("../assets/rectangle-91.png")}
            />
            <Text style={[styles.buttontext, styles.confirmLayout]}>確認送出</Text>
          </Pressable>

          {/* 確認送出連接資料庫的地方 */}
      </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  scrollView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    top: '7%',
    left: '35%',
    fontSize: 30,
    textAlign: "center",
    width: 120,
    height: 77,
  },

  textTypo: {
    display: "flex",
    fontFamily: FontFamily.interRegular,
    alignItems: "center",
    position: "absolute",
  },
  formContainer: {
    top :'80%',
    width: '100%',
    
  },

  icon: {
    height: "100%",
    width: "100%",
  },
  goBackButton: {
    
    top: '5%',
    width: 40,
    height: 40,
    position: "absolute",
  },
 
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    
  },
  userPageChild: {
    top: '30%',
    left: '30%',
    width: 170,
    height: 170,
    position: "absolute",
  },
  confirmLayout: {
    height: 70,
    width: 300,
    position: "absolute",
  },
  confirmButton: {
    top: 746,
    left:'10%',
  },
  confirmButtonChild: {
    borderRadius: Border.br_xl,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttontext: {
    fontSize: FontSize.size_11xl,
    color: Color.colorWhite,
    textAlign: "center",
    justifyContent: "center",
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    alignItems: "center",
    display: "flex",
    marginTop: 10,
  },

  
});

export default UserPage4;
