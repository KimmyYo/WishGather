import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";

const UserPage3 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.userPage1}>
      <View style={styles.parent}>
        <View style={styles.view}>
          <Text style={[styles.text, styles.textFlexBox]}>姓名</Text>
          <View style={[styles.child, styles.childBorder]} />
          <Text style={[styles.text1, styles.textTypo]}>
            <Text style={styles.txt}>
              <Text style={styles.text2}>{`   `}</Text>
              <Text style={styles.text3}>小猴吱</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.view1, styles.viewSpaceBlock]}>
          <Text style={[styles.text, styles.textFlexBox]}>電子郵件</Text>
          <View style={[styles.child, styles.childBorder]} />
          <Text style={[styles.text1, styles.textTypo]}>
            <Text style={styles.txt}>
              <Text style={styles.text2}>{`   `}</Text>
              <Text style={styles.text3}>monkey@gmail.com</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.view1, styles.viewSpaceBlock]}>
          <Text style={[styles.text, styles.textFlexBox]}>密碼</Text>
          <View style={[styles.child, styles.childBorder]} />
          <Text style={[styles.text1, styles.textTypo]}>
            <Text style={styles.txt}>
              <Text style={styles.text2}>{`   `}</Text>
              <Text style={styles.text3}>********</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.view1, styles.viewSpaceBlock]}>
          <Text style={[styles.text, styles.textFlexBox]}>連絡電話</Text>
          <View style={[styles.child, styles.childBorder]} />
          <Text style={[styles.text1, styles.textTypo]}>
            <Text style={styles.txt}>
              <Text style={styles.text2}>{`   `}</Text>
              <Text style={styles.text3}>0912345678</Text>
            </Text>
          </Text>
        </View>
        <View style={[styles.view4, styles.viewSpaceBlock]}>
          <View style={[styles.child1, styles.child1Position]} />
          <Image
            style={[styles.faBrandsccVisaIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/fabrandsccvisa.png")}
          />
          <Image
            style={[styles.mageeditIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/mageedit.png")}
          />
          <Text style={[styles.text15, styles.textFlexBox]}>付款方式</Text>
          <Text style={[styles.text16, styles.child1Position]}>
            {" "}
            ************1234
          </Text>
        </View>
      </View>
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
      <Image
        style={[styles.userPage1Child, styles.text17Position]}
        contentFit="cover"
        source={require("../assets/ellipse-21.png")}
      />
      <Text style={[styles.text17, styles.text17Position]}>個資維護</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  childBorder: {
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
  },
  textTypo: {
    fontSize: FontSize.size_lg,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
  },
  viewSpaceBlock: {
    marginTop: 30,
    width: 350,
  },
  child1Position: {
    height: 50,
    top: 36,
    position: "absolute",
  },
  iconLayout: {
    height: 25,
    width: 25,
    position: "absolute",
  },
  text17Position: {
    width: 120,
    left: 155,
    position: "absolute",
  },
  text: {
    height: "32.58%",
    width: "45.43%",
    top: "0%",
    fontSize: FontSize.size_xl,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
    left: "0%",
  },
  child: {
    right: "0%",
    bottom: "0%",
    borderColor: Color.colorDarkgray_200,
    borderWidth: 1.5,
    top: "43.82%",
    height: "56.18%",
    left: "0%",
    position: "absolute",
    width: "100%",
  },
  text2: {
    color: Color.colorBlack,
  },
  text3: {
    color: Color.colorGray_400,
  },
  txt: {
    width: "100%",
  },
  text1: {
    width: "69.43%",
    top: "43.82%",
    height: "56.18%",
    left: "0%",
    position: "absolute",
  },
  view: {
    height: 89,
    width: 350,
  },
  view1: {
    height: 89,
  },
  child1: {
    borderColor: Color.colorDarkgray_100,
    borderWidth: 1,
    left: 0,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    width: 350,
  },
  faBrandsccVisaIcon: {
    top: 44,
    left: 11,
  },
  mageeditIcon: {
    top: 52,
    left: 311,
  },
  text15: {
    top: 0,
    width: 150,
    height: 30,
    left: 0,
    fontSize: FontSize.size_xl,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  text16: {
    left: 48,
    color: Color.colorDarkgray_100,
    width: 206,
    fontSize: FontSize.size_lg,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
  },
  view4: {
    height: 86,
  },
  parent: {
    top: 277,
    left: 46,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  goBackButton: {
    left: 20,
    top: 28,
    width: 40,
    height: 40,
    position: "absolute",
  },
  userPage1Child: {
    top: 142,
    height: 120,
  },
  text17: {
    top: 48,
    fontSize: FontSize.size_11xl,
    height: 77,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.interRegular,
    color: Color.colorBlack,
  },
  userPage1: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default UserPage3;
