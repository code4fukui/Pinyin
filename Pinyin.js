// 声調マーク
const toneMarks = {
  "a": ["ā", "á", "ǎ", "à"],
  "e": ["ē", "é", "ě", "è"],
  "i": ["ī", "í", "ǐ", "ì"],
  "o": ["ō", "ó", "ǒ", "ò"],
  "u": ["ū", "ú", "ǔ", "ù"],
  "ü": ["ǖ", "ǘ", "ǚ", "ǜ"],
  "A": ["Ā", "Á", "Ǎ", "À"],
  "E": ["Ē", "É", "Ě", "È"],
  "I": ["Ī", "Í", "Ǐ", "Ì"],
  "O": ["Ō", "Ó", "Ǒ", "Ò"],
  "U": ["Ū", "Ú", "Ǔ", "Ù"],
  "Ü": ["Ǖ", "Ǘ", "Ǚ", "Ǜ"],
};

// 音節内で声調マークがつくべき母音を見つける優先順位
const vowelPriority = "aeoiuvü";

const pinyinToneToUnicode = (pinyinWithNumber) => {

  // 数字声調を取得 (最後の数字)
  const toneNumberMatch = pinyinWithNumber.match(/[1-5]$/);
  if (!toneNumberMatch) {
    return pinyinWithNumber;  // 声調記号がない場合はそのまま返す
  }

  const toneNumber = parseInt(toneNumberMatch[0]);
  if (toneNumber == 5) {
    // 第五声 (軽声) の場合は数字を取り除くだけ
    return pinyinWithNumber.slice(0, -1);
  } else {
    // 声調記号を付けるべき母音を探す
    let vowelToReplace = "";
    for (let i = 0; i < vowelPriority.length; i++) {
      if (pinyinWithNumber.indexOf(vowelPriority[i]) !== -1) {
        vowelToReplace = vowelPriority[i];
        break;
      }
    }
    if (!vowelToReplace) {
      return pinyinWithNumber.slice(0, -1);
    }
    // 母音と声調を置換
    return pinyinWithNumber.slice(0, -1).replace(vowelToReplace, toneMarks[vowelToReplace][toneNumber - 1]);
  }
};

const decode = (s) => {
  const res = [];
  const ps = s.split(" ");
  for (const p of ps) {
    res.push(pinyinToneToUnicode(p));
  }
  return res.join(" ");
};

export const Pinyin = { decode };
