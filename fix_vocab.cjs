const fs = require('fs');

let content = fs.readFileSync('src/data/nceBook1FullVocab.ts', 'utf8');

// The original words for 125 and 126 are scattered. 
// The easiest way is to parse the array, remove all items where lessonId is 125 or 126,
// and append the correct ones.

const startIdx = content.indexOf('export const NCE_BOOK1_FULL_VOCAB: NCEVocabEntry[] = [');
if (startIdx === -1) {
    console.error("Could not find start of array");
    process.exit(1);
}

// We will do a regex approach or JSON parse approach.
// Since the file is a TS module, we can extract the array part, parse it, filter, and write it back.
const arrayStr = content.substring(content.indexOf('[', startIdx), content.lastIndexOf(']') + 1);

let arr;
try {
    arr = eval('(' + arrayStr + ')');
} catch (e) {
    console.error(e);
    process.exit(1);
}

arr = arr.filter(item => item.lessonId !== 125 && item.lessonId !== 126);

const lesson125_126_vocab = [
  { word: "water", phonetic: "/ˈwɔːtər/", meaning: "名词：水", mcItem: "Water Bucket", mcItemIcon: "🪣", sampleSentence: "Would you like a glass of water?", sampleTranslation: "你想来杯水吗？", lessonId: 125 },
  { word: "terribly", phonetic: "/ˈterəbli/", meaning: "副词：非常", mcItem: "Redstone Dust", mcItemIcon: "🔴", sampleSentence: "I am terribly dry.", sampleTranslation: "我非常口渴。", lessonId: 125 },
  { word: "dry", phonetic: "/draɪ/", meaning: "形容词：干燥的，干渴的", mcItem: "Dead Bush", mcItemIcon: "🥀", sampleSentence: "The weather is very dry.", sampleTranslation: "天气非常干燥。", lessonId: 125 },
  { word: "nuisance", phonetic: "/ˈnjuːsns/", meaning: "名词：讨厌的东西或人", mcItem: "Zombie", mcItemIcon: "🧟", sampleSentence: "What a nuisance!", sampleTranslation: "真讨厌！", lessonId: 125 },
  { word: "mean", phonetic: "/miːn/", meaning: "动词：意味着，意思是", mcItem: "Book", mcItemIcon: "📘", sampleSentence: "What do you mean?", sampleTranslation: "你是什么意思？", lessonId: 125 },
  { word: "surprise", phonetic: "/səˈpraɪz/", meaning: "名词：惊奇，意外的事", mcItem: "Cake", mcItemIcon: "🎂", sampleSentence: "It was a big surprise.", sampleTranslation: "这是一个大大的惊喜。", lessonId: 125 },
  { word: "have to", phonetic: "/hæv tu/", meaning: "词组：不得不，必须", mcItem: "Iron Pickaxe", mcItemIcon: "⛏️", sampleSentence: "You have to mine diamonds.", sampleTranslation: "你必须去挖钻石。", lessonId: 126 },
  { word: "do not need to", phonetic: "/du nɒt niːd tu/", meaning: "词组：不需要，不必", mcItem: "Bed", mcItemIcon: "🛏️", sampleSentence: "You do not need to work today.", sampleTranslation: "你今天不需要工作。", lessonId: 126 }
];

arr = arr.concat(lesson125_126_vocab);
arr.sort((a, b) => a.lessonId - b.lessonId);

const newContent = content.substring(0, content.indexOf('[', startIdx)) + JSON.stringify(arr, null, 2) + ';\n';

fs.writeFileSync('src/data/nceBook1FullVocab.ts', newContent);
console.log('Vocab fixed!');
