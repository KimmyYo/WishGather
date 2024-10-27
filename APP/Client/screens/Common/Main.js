import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function Home({ navigation }) {
  return (
    <LinearGradient colors={['#e08371', '#FF9C33']} style={styles.background}>
      {/* Logo 置中 */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require('../../assets/new_logo.png')}
        />
      </View>

      {/* CurvedContainer 貼合螢幕底部 */}
      <View style={styles.curvedContainer}>
        {/* <Text style={styles.title}>WishGather</Text> */}

        <Text style={styles.description}>「 科技連結信仰, 讓供品化為愛的循環 」</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.buttonText}>登入</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.loginButtonText}>註冊</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  logoContainer: {
    width: "100%",
    height: "50%",
    justifyContent:'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: 300,
    height: 300 ,
    // borderWidth:1,
    bottom:-40
  },
  curvedContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 80,
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: -2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF7F00',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#4F4F4F',
    textAlign: 'center',
    fontWeight:'bold',
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',    
    justifyContent: 'center', 
    alignItems: 'center',     
    gap: 20,                
  },
  button: {
    backgroundColor: '#FF9C33',
    padding: 15,
    borderRadius: 25,
    width: 170,  
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 25,
    width: 170,  
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
