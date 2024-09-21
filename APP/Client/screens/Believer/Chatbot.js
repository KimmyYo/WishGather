import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import drawLotsData from '../../assets/drawLotsData.json';

const WishGatherChatbot = ({ route }) => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [currentLot, setCurrentLot] = useState(null);

  useEffect(() => {
    console.log("drawLotsData:", drawLotsData); // 調試: 輸出整個 drawLotsData
    const { lotNumber, lotMessage } = route.params || {};
    console.log("Route params:", { lotNumber, lotMessage }); // 調試: 輸出路由參數
    if (lotNumber && lotMessage) {
      const matchedLot = drawLotsData.find(lot => lot.number === `第${lotNumber}籤`);
      console.log("Matched lot:", matchedLot); // 調試: 輸出匹配的籤
      setCurrentLot(matchedLot);

      setMessages([
        { type: 'bot', text: '歡迎來到解籤！您抽到的籤是：' },
        { type: 'bot', text: `籤號: 第${lotNumber}籤` },
        { type: 'bot', text: lotMessage },
        { type: 'bot', text: '您有什麼想問的嗎？' }
      ]);
    } else {
      setMessages([{ type: 'bot', text: '歡迎來到解籤！請輸入您的問題。' }]);
    }
  }, [route.params]);

  const addMessage = (content, type) => {
    setMessages(prevMessages => [...prevMessages, { type, text: content }]);
  };

  const retrieveRelevantInfo = (query) => {
    if (currentLot) {
      // 如果有當前籤,只返回當前籤的資訊
      return [currentLot];
    } else {
      // 否則搜索所有籤
      const keywords = query.toLowerCase().split(' ');
      return drawLotsData.filter(doc => 
        keywords.some(keyword => 
          doc.number.toLowerCase().includes(keyword) ||
          doc.content.toLowerCase().includes(keyword) || 
          doc.interpretation.toLowerCase().includes(keyword)
        )
      );
    }
  };

  const handleSend = async () => {
    if (userMessage.trim() === '') return;

    addMessage(userMessage, 'user');
    setUserMessage('');

    const relevantDocs = retrieveRelevantInfo(userMessage);
    let contextPrompt = '相關的籤詩資訊：\n';
    relevantDocs.forEach(doc => {
      contextPrompt += `籤號：${doc.number}\n內容：${doc.content}\n解釋：${doc.interpretation}\n\n`;
    });

    if (currentLot) {
      contextPrompt += `用戶當前抽到的籤是：${currentLot.number}\n`;
    }

    contextPrompt += '請注意，籤詩解釋應該考慮到求籤者的具體情況和問題。解釋應該給出積極、有建設性的建議。\n\n';

    try {
      const apiKey = 'AIzaSyCVwhW9XKHti21w_aqlK5FSdHOgx3LDO04';
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `${contextPrompt}用戶問題：${userMessage}\n\n請根據以上信息，特別是用戶當前抽到的籤（如果有），給出籤詩的解釋和對用戶問題的回答：`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "對不起，我目前無法處理您的請求。";
      addMessage(botMessage, 'bot');
    } catch (error) {
      console.error('Error:', error);
      addMessage('錯誤：無法連接到服務器。', 'bot');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>你好</Text>
            <Text style={styles.subtitle}>歡迎使用WishGather解籤功能</Text>
          </View>

          <ScrollView 
            ref={scrollViewRef} 
            style={styles.messagesArea} 
            contentContainerStyle={{ paddingBottom: 100 }}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageBox,
                  msg.type === 'user' ? styles.userMessageBox : styles.botMessageBox
                ]}
              >
                <Text style={msg.type === 'user' ? styles.userMessage : styles.botMessage}>
                  {msg.text}
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.typingArea}>
            <TextInput
              style={styles.input}
              value={userMessage}
              onChangeText={setUserMessage}
              placeholder="請輸入您的問題"
              placeholderTextColor="#a9a9a9"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  messagesArea: {
    flex: 1,
    marginBottom: 10,
  },
  messageBox: {
    maxWidth: '80%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  userMessageBox: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(135,24,68)',
  },
  botMessageBox: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(237,225,217)',
  },
  userMessage: {
    color: 'rgb(237,225,217)',
  },
  botMessage: {
    color: '#000',
  },
  typingArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: 'absolute', // 固定位置
    bottom: 0,  // 固定在底部
    left: 0,
    right: 0,
    paddingHorizontal: 20, // 讓左右有些邊距
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#d3d3d3', // 淺灰背景
  },
  sendButton: {
    backgroundColor: '#007BFF', // 藍色背景
    borderRadius: 5, // 邊角圓角
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff', // 白色文字
    fontSize: 16,
  },
});

export default WishGatherChatbot;