import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const UserPage2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.userPage4}>
      <View style={styles.applicationSoftwareLicenseAWrapper}>
        <Text style={[styles.applicationSoftwareLicense, styles.textTypo]}>{`




Application Software License Agreement

This  Application Software License Agreement ("Agreement") is entered into between [Developer/Company Name], a [State/Country] corporation, located at [Address] ("Developer"), and the end user ("User") of the iOS application ("Application").

1. Grant of License
Subject to the terms and conditions of this Agreement, Developer grants User a limited, non-exclusive, non-transferable license to download, install, and use the Application solely for User's personal, non-commercial use on any iOS device that User owns or controls.

2. Restrictions
User shall not:
- Modify, adapt, translate, or create derivative works of the Application.
- Reverse engineer, decompile, disassemble, or attempt to derive the source code of the Application.
- Remove, alter, or obscure any copyright, trademark, or other proprietary notices from the Application.
- Rent, lease, lend, sell, redistribute, or sublicense the Application.
- Use the Application for any unlawful purpose or in any manner inconsistent with this Agreement.

3. Ownership
Developer retains all rights, title, and interest in and to the Application, including all intellectual property rights therein. This Agreement does not convey to User any rights of ownership in or related to the Application.

4. Updates and Support
Developer may, but is not obligated to, provide updates, upgrades, or support for the Application. User acknowledges that Developer has no obligation to provide any maintenance or support services for the Application.

5. Warranty Disclaimer

THE APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, DEVELOPER DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

6. Limitation of Liability
IN NO EVENT SHALL DEVELOPER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO USER'S USE OR INABILITY TO USE THE APPLICATION.

7. Termination
Developer may terminate this Agreement at any time without notice if User breaches any provision of this Agreement. Upon termination, User must cease all use of the Application and delete all copies of the Application from User's iOS device(s).


8. Governing Law
This Agreement shall be governed by and construed in accordance with the laws of [State/Country] without regard to its conflict of law provisions.

9. Entire Agreement
This Agreement constitutes the entire agreement between Developer and User concerning the subject matter hereof and supersedes all prior or contemporaneous agreements, representations, warranties, and understandings.

10. Contact Information
If User has any questions about this Agreement, User may contact Developer at [Contact Email/Address].

11. Acceptance

BY DOWNLOADING, INSTALLING, OR USING THE APPLICATION, USER ACKNOWLEDGES THAT USER HAS READ, UNDERSTOOD, AND AGREES TO `}</Text>
      </View>
      <Text style={[styles.text, styles.textTypo]}>服務條款</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interRegular,
    position: "absolute",
  },
  applicationSoftwareLicense: {
    top: -95,
    left: 12,
    fontSize: 10,
    height: 844,
    width: 364,
  },
  applicationSoftwareLicenseAWrapper: {
    top: 119,
    left: 33,
    height: 806,
    width: 364,
    position: "absolute",
  },
  text: {
    top: 48,
    left: 155,
    fontSize: FontSize.size_11xl,
    display: "flex",
    alignItems: "center",
    width: 120,
    height: 77,
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
  userPage4: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGray_100,
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default UserPage2;
