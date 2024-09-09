import { React, useState, useEffect, useContext } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, TextInput } from 'react-native'
import { SafeAreaProvider,  useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../components/Context/UserContext';
import  Dialog  from "react-native-dialog";
import Lunar from '@tony801015/chinese-lunar';

import TextInputSet from '../../components/Utility/TextInputSet';

import PageTitle from '../../components/Utility/PageTitle';
import SetButton from '../../components/Utility/SetButton';
import DatePicker from '../../components/Utility/DatePicker';
import NavigateBack from '../../components/Utility/NavigateBack';

function EditTempleInfoPage(){
    const navigation = useNavigation();
    const route = useRoute();
    // 編輯頁傳入的資料
    const event = route.params.event;
    const forEdit = route.params.forEdit;
    const { userId } = useContext(UserContext);
    const insets = useSafeAreaInsets();
    const [date, setDate] = useState(new Date(event.DATE));

    return (
        <SafeAreaProvider>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left ,
                    paddingRight: insets.right
                }}
            >
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.textDanger}>取消</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Text style={styles.textSucceed}>完成</Text>
                    </Pressable>
                </View>
                
                <PageTitle  iconName ={forEdit ? "edit" : "add"} titleText={forEdit ? "編輯法會資訊" : "新增法會資訊"}></PageTitle>
                
                <View style={styles.formContainer}>
                    <TextInputSet labelName={'法會名稱'} defaultValue={event.NAME} multiLine={false} placeholder={"請輸入法會名稱"}/>
                    <DatePicker dateValue={event.DATE} labelName={"農曆日期"} isLunar={true} editable={false} /> 
                    <DatePicker dateValue={event.DATE} labelName={"國曆日期"} isLunar={false} editable={true}/>
                    <TextInputSet labelName={'法會簡介'} defaultValue={event.DESCRIPTION} multiLine={true} placeholder={"請輸入法會簡介"}/>
                </View>
                              
                {/* <View style={styles.buttonPosition}>
                    <SetButton 
                        btnText={'確定'} 
                        btnStatus={'primary'}
                        navigateScreen={'TempleEventPage'}
                    >
                    </SetButton>
                </View> */}
            </View>
        </SafeAreaProvider>
    )
}   

const styles = StyleSheet.create({
    formContainer: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
    },
    buttonPosition: {
        marginTop: 30,

    },
    buttonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    textDanger: {
        color: "red",
        fontWeight: "bold"
    },
    textSucceed: {
        color: "blue",
        fontWeight: "bold"
    }
   
})  

export default EditTempleInfoPage;