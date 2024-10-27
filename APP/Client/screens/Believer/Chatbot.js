import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import axios from "axios";
import drawLotsData from "../../assets/drawLotsData.json";
import { OPENAI_API_KEY } from "@env";

const WishGatherChatbot = ({ route, navigation }) => {
  
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  const [currentLot, setCurrentLot] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);




  const handleScrollBeginDrag = () => {
    setIsUserScrolling(true);
  };

  const handleScrollEndDrag = () => {
    setIsUserScrolling(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        if (!isUserScrolling) {
          // 增加延遲時間，確保內容完全更新
          setTimeout(() => {
            scrollToBottom();
          }, 300); // 延長延遲時間
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        if (!isUserScrolling) {
          setTimeout(() => {
            scrollToBottom();
          }, 300);
        }
      }
    );
 
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [isUserScrolling]);
  const scrollToBottom = () => {
    if (!isUserScrolling && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({
          animated: true,
          duration: 500, // 增加動畫持續時間
        });
      }, 100);
    }
  };

  const formatMessage = (text) => {
    if (!text) return null;

    const lines = text.split("\n");

    return lines.map((line, index) => {
      // 處理標題 (###)
      if (line.startsWith("###")) {
        return (
          <Text key={index} style={styles.titleText}>
            {line.replace("###", "").trim()}
          </Text>
        );
      }

      // 處理重點提示 (⭐️)
      if (line.startsWith("⭐️")) {
        return (
          <Text key={index} style={styles.highlightText}>
            {line.trim()}
          </Text>
        );
      }

      // 處理解籤中的引文（用「」包圍的文字）
      if (line.includes("「") && line.includes("」")) {
        // 將行分成引文和非引文部分
        const parts = line.split(/([「」])/);
        return (
          <Text key={index} style={styles.botMessage}>
            {parts.map((part, partIndex) => {
              if (part === "「" || part === "」") {
                return (
                  <Text key={partIndex} style={styles.quotationMark}>
                    {part}
                  </Text>
                );
              } else if (
                parts[partIndex - 1] === "「" &&
                parts[partIndex + 1] === "」"
              ) {
                return (
                  <Text key={partIndex} style={styles.quoteText}>
                    {part}
                  </Text>
                );
              } else {
                return <Text key={partIndex}>{part}</Text>;
              }
            })}
          </Text>
        );
      }

      // 一般文本
      return (
        <Text key={index} style={styles.botMessage}>
          {line}
        </Text>
      );
    });
  };

  useEffect(() => {
    console.log("Full drawLotsData:", JSON.stringify(drawLotsData, null, 2));
    const { lotNumber, lotMessage, fromDrawLot } = route.params || {};
    console.log("Route params:", { lotNumber, lotMessage });

    if (lotNumber && lotMessage && fromDrawLot) {
      const matchedLot = drawLotsData.find(
        (lot) => lot.number === `第${lotNumber}籤`
      );
      console.log("Full matched lot:", JSON.stringify(matchedLot, null, 2));

      if (matchedLot) {
        setCurrentLot(matchedLot);
        setMessages([
          { type: "bot", text: `歡迎來解籤！您抽到的是：${matchedLot.number}` },

          { type: "bot", text: `籤詩內容: ${matchedLot.content}` },
          {
            type: "bot",
            text: "您可以詢問任何問題，我會根據這支籤為您提供綜合解答。",
          },
        ]);
      } else {
        console.error(`未找到匹配的籤: 第${lotNumber}籤`);
        setMessages([
          { type: "bot", text: "抱歉，未找到匹配的籤。請重新抽籤。" },
        ]);
      }
    } else {
      setMessages([{ type: "bot", text: "歡迎來到解籤！請先抽一支籤。" }]);
    }
  }, [route.params]);

  const addMessage = (content, type) => {
    setMessages((prevMessages) => [...prevMessages, { type, text: content }]);

    setTimeout(() => {
      if (!isUserScrolling) {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  // 新增問題改寫函數
  const rewriteQuery = async (userQuery) => {
    try {
      const rewritePrompt = `作為一個專業的宮廟籤詩解讀專家，請分析以下用戶的問題，並判斷是否能從籤詩角度給予解答。

      原始問題: "${userQuery}"
      
      請依照以下步驟分析：
      1. 首先判斷這個問題是否適合用籤詩來解答
      2. 如果適合解籤：
         - 解讀用戶真正想問的核心問題
         - 識別問題類別（運勢/事業/愛情/健康/財運）
         - 提取相關關鍵詞
      3. 如果不適合解籤 例如數學計算、與GPT的基本對話那些不屬於解籤的疑問的：
         - 請直接給答案，例如計算題、基本知識、與基本對話
         - 如果無法直接回答再分析如何將問題轉化為運勢相關的回答
         - 思考如何用籤詩智慧給予啟發
         - 設計一個得體的回應方向
      
      請用以下格式回覆：
      是否適合解籤: [是/否]
      如果適合解籤：
        核心問題: [簡短陳述核心問題]
        問題類型: [對應類別]
        關鍵詞: [相關關鍵詞]
        建議回應方向: [籤詩解讀方向]
      如果不適合解籤：
        問題解答:[直接提供問題簡答]
        問題轉化: [如何轉化為可解籤的方向]
        建議切入點: [從什麼角度給予啟發]
        回應建議: [如何委婉回應並給予指引]
      
      注意：
      - 保持專業性和靈活度
      - 對於不適合解籤的問題，要有智慧地轉化
      - 設法找出對求籤者有幫助的角度
      - 維持籤詩解讀的莊重感`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "你是專業的籤詩解讀與問題分析專家。" },
            { role: "user", content: rewritePrompt },
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error rewriting query:", error);
      return userQuery; // 如果改寫失敗，返回原始問題
    }
  };

  const handleSend = async () => {
    if (userMessage.trim() === "") return;

    addMessage(userMessage, "user");
    setUserMessage("");
    scrollToBottom(); // 發送消息時滾動

    if (!currentLot) {
      addMessage("抱歉，您還未抽籤或發生了錯誤。請先抽一支籤。", "bot");
      return;
    }

    try {
      // 1. 改寫用戶問題
      const rewrittenQueryAnalysis = await rewriteQuery(userMessage);
      console.log("Rewritten query analysis:", rewrittenQueryAnalysis);

      // 2. 構建包含改寫分析的 prompt
      const contextPrompt = `用戶抽到的籤：
籤號：${currentLot.number}
內容：${currentLot.content}
解釋：${currentLot.interpretation}
關鍵詞：${currentLot.keywords.join(", ")}
運勢：${currentLot.aspects.fortune}
事業：${currentLot.aspects.career}
愛情：${currentLot.aspects.love}
健康：${currentLot.aspects.health}
財務：${currentLot.aspects.finance}
建議：${currentLot.advice}

問題分析：
${rewrittenQueryAnalysis}

用戶原始問題：${userMessage}

回答要求:
------------------------------------------
1. '不適合' 解籤 但有問題解答的問題：回答格式指南：
⭐️ 溫馨提醒：
雖然這個問題無法幫你解籤，但答案是:[問題解答] 
------------------------------------------(#回應結束這一行不用顯示)

2.'適合' 解籤的問題：
   - 按原有格式詳細解答
   - 連結籤詩內容與現實狀況
   - 給予具體可行的建議
   - 適合解籤的問題的回答格式指南：
### [重複 改寫後的用戶問題]

⭐️ 籤詩原文參考：
[引用最相關的籤詩原文片段，使用「」標註]

⭐️ 解籤： (請挑選最相關的兩個籤詩片段)
1. 「[引用籤詩片段A]」暗示[相應解釋A] 因此 [相應結論A]
2. 「[引用籤詩片段B]」表示[相應解釋B] 因此 [相應結論B]

⭐️ 具體建議：
1. [基於解釋A的具體建議]
2. [基於解釋B的具體建議]

[在此加入一句正面鼓勵的話，例如「保持信心」、「耐心等待」等]
--------------------------------回答結束

通用回答要求：
1. 使用"###"標記問題重述
2. 使用"⭐️"標記重要內容
3. 解籤時必須引用原文並給出對應解釋
4. 建議要與解籤內容緊密連接
5. 結尾必須包含鼓勵性話語
6. 回答簡潔有力，避免冗長
7. 保持溫暖正面的語調
----------------------------------
不適合解籤且沒有答案的的回答範例：
### 詢問MLB冠軍歸屬

⭐️ 溫馨提醒：
雖然無法直接預測比賽結果，但我可以從您抽到的籤詩來分析您關注的賽事運勢。「[回應建議20字摘要]」

-----------------------------
不適合解籤的回答範例：
### 1+1

⭐️ 溫馨提醒：
雖然無法針對此問題幫你解籤，但可以回答你答案是2。

------------------------------------------------
適合解籤的問題的回答範例：
###您問到感情運勢

⭐️ 籤詩原文參考：
「花開結子一半枯，可惜今年汝虛度」

⭐️ 解籤：
1. 「花開結子一半枯」暗示您目前的感情狀況未完全成熟。
因此「需要更多時間培育」
2. 「今年汝虛度」表示現階段應該專注自我提升而非強求。
因此「不適合強求姻緣」

⭐️ 具體建議：
1. 根據花開未盡的提示，建議您耐心培養感情
2. 切勿虛度光陰，多充實自己、提升個人魅力

無需著急，花開有時，您的良緣一定會在最好的時機綻放！`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "你是專業的解籤人員，根據籤詩資訊回答" },
            { role: "user", content: contextPrompt },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage =
        response.data.choices[0]?.message?.content ||
        "對不起，我目前無法處理您的請求。";
      addMessage(botMessage, "bot");

      requestAnimationFrame(() => {
        scrollToBottom();
      });
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      const errorMessage = error.response
        ? `錯誤：服務器響應異常 (狀態碼: ${error.response.status})`
        : "錯誤：無法連接到服務器。";
      addMessage(errorMessage, "bot");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>你好</Text>
        <Text style={styles.subtitle}>歡迎使用WishGather解籤功能</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesArea}
        contentContainerStyle={styles.messagesContent}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        keyboardShouldPersistTaps="handled"
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
      >
        {messages.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageBox,
              msg.type === "user"
                ? styles.userMessageBox
                : styles.botMessageBox,
            ]}
          >
            {msg.type === "user" ? (
              <Text style={styles.userMessage}>{msg.text}</Text>
            ) : (
              <View style={styles.botMessageContent}>
                {formatMessage(msg.text)}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // 調整此偏移量以適應不同平台
        style={styles.typingAreaContainer}
      >
        <View style={styles.typingArea}>
          <TextInput
            style={styles.input}
            value={userMessage}
            onChangeText={setUserMessage}
            placeholder="請輸入您的問題"
            placeholderTextColor="#a9a9a9"
            multiline={false}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>詢問</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#fff",
    paddingBottom: -5,
  },
  title: {
    paddingTop: 18,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
  },
  messagesArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContent: {
    padding: 20,
    paddingBottom: 20,
  },
  messageBox: {
    maxWidth: "80%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  userMessageBox: {
    alignSelf: "flex-end",
    backgroundColor: "rgb(135,24,68)",
  },
  botMessageBox: {
    alignSelf: "flex-start",
    backgroundColor: "rgb(237,225,217)",
  },
  userMessage: {
    color: "rgb(237,225,217)",
    lineHeight: 20,
  },
  botMessage: {
    color: "#000",
    lineHeight: 20,
  },
  typingArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  typingAreaContainer: { borderTopWidth: 1, borderColor: "#ddd" },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1.5,
    borderRadius: 13,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#E8E9EB",
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#F89880",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },

  highlightText: {
    fontWeight: "bold",
    color: "#000",
  },

  quoteText: {
    fontSize: 16, // 引文稍微大一點
    fontWeight: "bold", // 加粗
    color: "#871844", // 使用主題色
    backgroundColor: "#F8E8E8", // 淡色背景突出顯示
    paddingHorizontal: 4, // 左右間距
    borderRadius: 4, // 圓角
  },

  quotationMark: {
    color: "#871844", // 引號也使用主題色
    fontWeight: "bold",
  },
});

export default WishGatherChatbot;
