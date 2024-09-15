// translations.js

const translations = {
    'apple': '蘋果',
    'banana': '香蕉',
    'orange': '橘子',
    'grape': '葡萄',
    'watermelon': '西瓜',
    'strawberry': '草莓',
    'pear': '梨',
    'peach': '桃子',
    'pineapple': '鳳梨',
    'mango': '芒果',
    'bottledrink':'瓶裝飲料',
    'yuzi':'柚子',
    'kiwi':'奇異果',
    'zaozi':'棗子',
    'can':'罐頭',
    'canchips':'罐裝洋芋片',
    'candrinks':'罐裝飲料',
    'chips':'洋芋片',
    'cookie':'餅乾',
    'dragoneye':'龍眼',
    'eggroll':'蛋捲',
    'fagao':'發糕',
    'firedragon':'火龍果',
    'grapes':'葡萄',
    'liuding':'柳丁',
    'malao':'麻粩',
    'melon':'哈密瓜',
    'onehand':'一手飲料',
    'pineapple':'鳳梨',
    'rice':'米',
    'science':'科學麵',
    'shize':'柿子',
    'shoutao':'壽桃',
    'snow':'雪餅',
    'sweetcan':'八寶粥',
    'turtle':'紅龜粿',
    'watermelon':'西瓜',
    'wong':'旺旺',
    'bag':'袋裝餅乾',
    'bag_noodles':'袋裝泡麵',
    'bowl_noodles':'碗裝泡麵',
    'box':'箱裝零食',
    'boxcookies':'箱裝餅乾',


    // Add more translations as needed
  };
  
  export const translateToChinese = (englishName) => {
    const lowerCaseName = englishName.toLowerCase();
    return translations[lowerCaseName] || englishName;
  };
  
  export const getTranslations = () => translations;