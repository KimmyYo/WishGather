import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const FrameComponent = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.view}>
        <View style={[styles.child, styles.textLayout]} />
        <Text style={[styles.text, styles.textFlexBox]}>
          <Text style={styles.txt}>
            <Text style={styles.text1}>
              <Text style={styles.text2}>
                <Text style={styles.text3}>{` `}</Text>
              </Text>
              <Text style={styles.text4}>
                <Text style={styles.text2}>{`  `}</Text>
                <Text style={styles.text6}>{`取貨地址
`}</Text>
              </Text>
            </Text>
            <Text style={styles.text7}>
              <Text style={styles.text1}>{`   `}</Text>
              <Text style={styles.text9}>高雄市左營區左營新路17號</Text>
            </Text>
          </Text>
        </Text>
      </View>
      <View style={[styles.view1, styles.viewSpaceBlock]}>
        <View style={[styles.child, styles.textLayout]} />
        <Text style={[styles.text, styles.textFlexBox]}>
          <Text style={styles.txt}>
            <Text style={styles.text1}>
              <Text style={styles.text2}>
                <Text style={styles.text3}>{` `}</Text>
              </Text>
              <Text style={styles.text4}>
                <Text style={styles.text2}>{`  `}</Text>
                <Text style={styles.text6}>{`取貨時間
`}</Text>
              </Text>
            </Text>
            <Text style={styles.text7}>
              <Text style={styles.text1}>{`   `}</Text>
              <Text style={styles.text9}>2024/04/25 01:30 PM</Text>
            </Text>
          </Text>
        </Text>
      </View>
      <View style={[styles.view2, styles.viewSpaceBlock]}>
        <View style={[styles.inner, styles.innerLayout]} />
        <Text style={[styles.text17, styles.innerLayout]}>
          <Text style={styles.txt}>
            <Text style={styles.text1}>
              <Text style={styles.text2}>
                <Text style={styles.text3}>{` `}</Text>
              </Text>
              <Text style={styles.text4}>
                <Text style={styles.text2}>{`  `}</Text>
                <Text style={styles.text6}>{`取貨項目
`}</Text>
              </Text>
            </Text>
            <Text style={styles.text7}>
              <Text style={styles.text1}>{`   `}</Text>
              <Text style={styles.text9}>{`紅龜粿 *1
   壽桃 * 2
`}</Text>
            </Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textLayout: {
    height: 100,
    left: 0,
    width: 320,
    position: "absolute",
  },
  textFlexBox: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    top: 5,
  },
  viewSpaceBlock: {
    marginTop: 22,
    width: 320,
  },
  innerLayout: {
    height: 150,
    left: 0,
    width: 320,
    position: "absolute",
  },
  child: {
    backgroundColor: Color.colorWhitesmoke_100,
    top: 0,
  },
  text3: {
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
  },
  text2: {
    fontSize: FontSize.size_xl,
  },
  text6: {
    fontSize: FontSize.size_6xl,
  },
  text4: {
    fontWeight: "300",
    fontFamily: FontFamily.interLight,
  },
  text1: {
    color: Color.colorBlack,
  },
  text9: {
    color: Color.colorDimgray_100,
  },
  text7: {
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xl,
  },
  txt: {
    width: "100%",
  },
  text: {
    height: 100,
    left: 0,
    width: 320,
    position: "absolute",
  },
  view: {
    height: 105,
    width: 320,
  },
  view1: {
    height: 105,
  },
  inner: {
    backgroundColor: Color.colorWhitesmoke_100,
    top: 0,
  },
  text17: {
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    top: 5,
  },
  view2: {
    height: 155,
  },
  parent: {
    top: 206,
    left: 55,
    alignItems: "flex-end",
    position: "absolute",
  },
});

export default FrameComponent;
