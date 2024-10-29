import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DrawlotsModal = () => {
  const navigation = useNavigation();
  const [randomNumber, setRandomNumber] = useState(null);
  const [message, setMessage] = useState("");
  const [showGif, setShowGif] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 定義六十甲子籤文
  const stickMessages = [
    `第六十籤\n癸亥 屬水利冬 宜其北方\n月出光輝本清吉，\n浮雲總是蔽陰色，\n戶內用心再作福，\n當官分理便有益。`,
    `第五十九籤\n癸酉 屬金利秋 宜其西方\n有心作福莫遲疑，\n求名清吉正當時，\n此事必能成會合，\n財寶自然喜相隨。`,
    `第五十八籤\n癸未 屬木利春 宜其東方\n蛇身意欲變成龍，\n只恐命內運未通，\n久病且作寬心坐，\n言語雖多不可從。`,
    `第五十七籤\n癸已 屬水利冬 宜其北方\n勸君把定心莫虛，\n前途清吉得運時，\n到底中間無大事，\n又遇神仙守安居。`,
    `第五十六籤\n癸卯 屬金利秋 宜其西方\n病中若得苦心勞，\n到底完全總未遭，\n去後不須回頭問，\n心中事務盡消磨。`,
    `第五十五籤\n癸丑 屬木利春 宜其東方\n須知進退總虛言，\n看看發暗未必全，\n珠玉深藏還未變，\n心中但得枉徒然。`,
    `第五十四籤\n壬戌 屬水利冬 宜其北方\n孤燈寂寂夜沉沉，\n萬事清吉萬事成，\n若逢陰中有善果，\n燒得好香達神明。`,
    `第五十三籤\n壬申 屬金利秋 宜其西方\n看君來問心中事，\n積善之家慶有餘，\n運亨財子雙雙全，\n指日喜氣溢門閭。`,
    `第五十二籤\n壬午 屬木利春 宜其東方\n功名事業本由天，\n不須掛念意懸懸，\n若問中間遲與速，\n風雲際會在眼前。`,
    `第五十一籤\n壬辰 屬水利冬 宜其北方\n東西南北不堪行，\n前途此事正可當，\n勸君把定莫煩惱，\n家門自有保安康。`,
    `第五十籤\n壬寅 屬金利秋 宜其西方\n佛前發誓無異心，\n且看前途得好音，\n此物原來本是鐵，\n也能變化得成金。`,
    `第四十九籤\n壬子 屬木利春 宜其東方\n言語雖多不可從，\n風雲靜處未行龍，\n暗中終得明消息，\n君爾何須問重重。`,
    `第四十八籤\n辛亥 屬金利秋 宜其西方\n陽世作事未和同，\n雲遮月色正朦朧，\n心中意欲前途去，\n只恐命內運未通。`,
    `第四十七籤\n辛酉 屬木利春 宜其東方\n君爾何須問聖跡，\n自己心中皆有益，\n於今且看月中旬，\n凶事脫出化成吉。`,
    `第四十六籤\n辛未 屬土利年 四方皆宜\n功名得位與君顯，\n前途富貴喜安然，\n若遇一輪明月照，\n十五團圓照滿天。`,
    `第四十五籤\n辛巳 屬金利秋 宜其西方\n花開今已結成果，\n富貴榮華終到老，\n君子小人相會合，\n萬事清吉莫煩惱。`,
    `第四十四籤\n辛卯 屬木利春 宜其東方\n客到前途多得利，\n君爾何故兩相疑，\n雖是中間逢進退，\n月出光輝得運時。`,
    `第四十三籤\n辛丑 屬土利年 四方皆宜\n一年作事急如飛，\n君爾寬心莫遲疑，\n貴人還在千里外，\n音信月中漸漸知。`,
    `第四十二籤\n庚戌 屬金利秋 宜其西方\n一重江水一重山，\n誰知此去路又難，\n任他改救終不過，\n是非終久未得安。`,
    `第四十一籤\n庚申 屬木利春 宜其東方\n今行到手實難推，\n歌歌暢飲自徘徊，\n雞犬相聞消息近，\n婚姻夙世結成雙。`,
    `第四十籤\n庚午 屬土利年 四方皆宜\n平生富貴成祿位，\n君家門戶定光輝，\n此中必定無損失，\n夫妻百歲喜相隨。`,
    `第三十九籤\n庚辰 屬金利秋 宜其西方\n意中若問神仙路，\n勸爾且退望高樓，\n寬心且守寬心坐，\n必然遇得貴人扶。`,
    `第三十八籤\n庚寅 屬木利春 宜其東方\n名顯有意在中間，\n不須祈禱心自安，\n看看早晚日過後，\n即時得意在其間。`,
    `第三十七籤\n庚子 屬土利年 四方皆宜\n運逢得意身顯變，\n君爾身中皆有益，\n一向前途無難事，\n決意之中保清吉。`,
    `第三十六籤\n己亥 屬木利春 宜其東方\n福如東海壽如山，\n君爾何須嘆苦難，\n命內自然逢大吉，\n祈保分明得平安。`,
    `第三十五籤\n己酉 屬土利年 四方皆宜\n此事何須用心機，\n前途變怪自然知，\n看看此去得和合，\n漸漸脫出見太平。`,
    `第三十四籤\n己未 屬火利夏 宜其南方\n危險高山行過盡，\n莫嫌此路有重重，\n若見蘭桂漸漸發，\n長蛇反轉變成龍。`,
    `第三十三籤\n己巳 屬木利春 宜其東方\n欲去長江水闊茫，\n行船把定未遭風，\n戶內用心再作福，\n看看魚水得相逢。`,
    `第三十二籤\n己卯 屬土利年 四方皆宜\n龍虎相交在門前，\n此事必定兩相連，\n黃金忽然變成鐵，\n何用作福問神仙。`,
    `第三十一籤\n己丑 屬火利夏 宜其西方\n綠柳蒼蒼正當時，\n任君此去作乾坤，\n花果結實無殘謝，\n福祿自有慶家門。`,
    `第三十籤\n戊戌 屬木利春 宜其東方\n漸漸看此月中和，\n過後須防未得高，\n改變顏色前途去，\n凡事必定見重勞。`,
    `第二十九籤\n戊申 屬土利年 四方皆宜\n枯木可惜逢春時，\n如今還在暗中藏，\n寬心且守風霜退，\n還君依舊作乾坤。`,
    `第二十八籤\n戊午 屬火利夏 宜其南方\n於今莫作此當時，\n虎落平陽被犬欺，\n世間凡事何難定，\n千山萬水也遲疑。`,
    `第二十七籤\n戊辰 屬木利春 宜其東方\n君爾寬心且自由，\n門庭清吉家無憂，\n財寶自然終吉利，\n凡事無傷不用求。`,
    `第二十六籤\n戊寅 屬土利年 四方皆宜\n選出牡丹第一枝，\n勸君折取莫遲疑，\n世間若問相知處，\n萬事逢春正及時。`,
    `第二十五籤\n戊子 屬火利夏 宜其南方\n總是前途莫心勞，\n求神問聖枉是多，\n但看雞犬日過後，\n不須作福事如何。`,
    `第二十四籤\n丁亥 屬土利年 四方皆宜\n月出光輝四海明，\n前途祿位見太平，\n浮雲掃退終無事，\n可保禍患不臨身。`,
    `第二十三籤\n丁酉 屬火利夏 宜其南方\n欲去長江水濶茫，\n前途未遂運未通，\n如今絲綸常在手，\n只恐魚水不相逢。`,
    `第二十二籤\n丁未 屬水利冬 宜其北方\n太公家業八十成，\n月出光輝四海明，\n命內自然逢大吉，\n茅屋中間百事亨。`,
    `第二十一籤\n丁巳 屬土利年 四方皆宜\n十方佛法有靈通，\n大難禍患不相同，\n紅日當空常照耀，\n還有貴人到家堂。`,
    `第二十籤\n丁卯 屬火利夏 宜其南方\n前途功名未得意，\n只恐命內有交加，\n兩家必定防損失，\n勸君且退莫咨嗟。`,
    `第十九籤\n丁丑 屬水利冬 宜其北方\n富貴由命天註定，\n心高必然誤君期，\n不然且回依舊路，\n雲開月出自分明。`,
    `第十八籤\n丙戌 屬土利年 四方皆宜\n君問中間此言因，\n看看祿馬拱前程，\n若得貴人多得利，\n和合自有兩分明。`,
    `第十七籤\n丙申 屬火利夏 宜其南方\n舊恨重重未改為，\n家中禍患不臨身，\n須當謹防宜作福，\n龍蛇交會得和合。`,
    `第十六籤\n丙午 屬水利冬 宜其北方\n不須作福不須求，\n用盡心機總未休，\n陽世不知陰世事，\n官法如爐不自由。`,
    `第十五籤\n丙辰 屬土利年 四方皆宜\n八十原來是太公，\n看看晚景遇文王，\n目下緊事休相問，\n勸君且守待運通。`,
    `第十四籤\n丙寅 屬火利夏 宜其南方\n財中漸漸見分明，\n花開花謝結子成，\n寬心且看月中桂，\n郎君即便見太平。`,
    `第十三籤\n丙子 屬水利冬 宜其北方\n命中正逢羅孛關，\n用盡心機總未休，\n作福問神難得過，\n恰是行船上高灘。`,
    `第十二籤\n乙亥 屬火利夏 宜其南方\n長江風浪漸漸靜，\n于今得進可安寧，\n必有貴人相扶助，\n凶事脫出見太平。`,
    `第十一籤\n乙酉 屬水利冬 宜其北方\n靈雞漸漸見分明，\n凡事且看子丑寅，\n雲開月出照天下，\n郎君即便見太平。`,
    "第十籤\n 乙未 屬金利秋　宜其西方\n 花開結子一半枯，\n 可惜今年汝虛度，\n 漸漸日落西山去，\n 勸君不用向前途。",
    "第九籤\n 乙巳 屬火利夏　宜其南方\n 龍虎相隨在深山，\n 君爾何須背後看，\n 不知此去相愛愉，\n 他日與我卻無干。",
    "第八籤\n 乙卯 屬水利冬 宜其北方\n 禾稻看看結成完，\n 此事必定兩相全，\n 回到家中寬心坐，\n 妻兒鼓舞樂團圓。",
    "第七籤\n 乙丑 屬金利秋 宜其西方\n 雲開月出見分明，\n 不須進退向前程，\n 婚姻皆由天註定，\n 和合清吉萬事成。",
    "第六籤\n 甲戌 屬火利夏 宜其南方\n 風雲致雨落洋洋，\n 天災時氣必有傷，\n 命內此事難和合，\n 更逢一足出外鄉。",
    "第五籤\n 甲申 屬水利冬 宜其北方\n 只恐前途明有變，\n 勸君作急可宜先，\n 且守長江無大事，\n 命逢太白守身邊。",
    "第四籤\n 甲午 屬金利秋 宜其西方\n 風恬浪靜可行船，\n 恰是中秋月一輪，\n 凡事不須多憂慮，\n 福祿自有慶家門。",
    "第三籤\n 甲辰 屬火利夏 宜其南方\n 勸君把定心莫虛，\n 天註姻緣自有餘，\n 和合重重常吉慶，\n 時來終遇得明珠。",
    "第二籤\n 甲寅 屬水利冬 宜其北方\n 於今此景正當時，\n 看看欲吐百花魁， \n若能遇得春色到， \n一洒清吉脫塵埃，",
    "第一籤 \n甲子 屬金利秋　宜其西方\n 日出便見風雲散， \n光明清靜照世間，\n 一向前途通大道，\n 萬事清吉保平安。",
  ];

  const handlePress = () => {
    setShowGif(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * stickMessages.length);
      setRandomNumber(60 - randomIndex);
      setMessage(stickMessages[randomIndex]);
      setShowGif(false);
      setShowResult(true);
    }, 2000);
  };

  const handleInterpret = () => {
    setShowResult(false); // 先淡出結果框
    setTimeout(() => {
      navigation.navigate("Chatbox", {
        lotNumber: randomNumber,
        lotMessage: message,
        fromDrawLot: true,
      });
    }, 100); // 短暫延遲確保動畫順暢
  };

  return (
    <View style={styles.container}>
      {!showGif && !showResult && (
        <View>
          <Image
            source={require("../../assets/drawlots.png")}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>開始求籤</Text>
          </TouchableOpacity>
        </View>
      )}
      {showGif && (
        <Image
          source={require("../../assets/drawlots.gif")}
          style={styles.gif}
        />
      )}
      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>籤號: 第{randomNumber}籤</Text>
          <Text style={styles.messageText}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.interpretButton}
              onPress={handleInterpret}
            >
              <Text style={styles.interpretButtonText}>前往解籤</Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,

    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  gif: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  resultContainer: {
    alignItems: "center",
  },
  resultText: {
    color: "orange",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    color: "#4F4F4F",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 30,
  },
  buttonContainer: {
    marginTop: 25,
  },
  icon: {
    marginLeft: 5,
  },
  interpretButton: {
    flexDirection: "row",
    backgroundColor: "orange",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  interpretButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DrawlotsModal;
