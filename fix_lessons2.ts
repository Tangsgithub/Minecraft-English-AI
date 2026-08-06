import fs from 'fs';

const content = fs.readFileSync('src/data/lessonsData.ts', 'utf8');

const replacement = `  100: { title: "He says that... She says that...", titleZh: "他说... 她说...", topic: "Reported Speech", topicZh: "间接引语", grammar: "He says that..." },
  101: { title: "A card from Jimmy", titleZh: "吉米寄来的明信片", topic: "Postcards & Travels", topicZh: "明信片与旅行问候", grammar: "He has just arrived in..." },
  102: { title: "He says he... She says she...", titleZh: "他说他... 她说她...", topic: "Reported Speech 2", topicZh: "间接引语2", grammar: "He says he..." },
  103: { title: "The French test", titleZh: "法语考试", topic: "Exams & School", topicZh: "考试体验与成绩", grammar: "How was your test?" },
  104: { title: "Too, very, enough", titleZh: "太、非常、足够", topic: "Degree Adverbs", topicZh: "程度副词", grammar: "Too, very, enough" },
  105: { title: "Full of mistakes", titleZh: "满是错误", topic: "Correcting Work", topicZh: "检查作业与改错", grammar: "It is full of mistakes" },
  106: { title: "I want you/him/her/them to...", titleZh: "我想要你/他/她/他们...", topic: "Wishes", topicZh: "愿望与要求", grammar: "I want you to..." },
  107: { title: "It's too small", titleZh: "它太小了", topic: "Clothing Sizes", topicZh: "衣服尺寸与不合适", grammar: "Too + 形容词 / Enough" },
  108: { title: "How do they compare?", titleZh: "它们怎么比较？", topic: "Comparisons", topicZh: "比较事物", grammar: "Comparatives" },
  109: { title: "A good idea", titleZh: "好主意", topic: "Suggestions", topicZh: "提出建议与讨论", grammar: "Shall we...? / What about...?" },
  110: { title: "How do they compare?", titleZh: "它们怎么比较？(2)", topic: "Comparisons", topicZh: "比较事物2", grammar: "Comparatives" },
  111: { title: "The most expensive model", titleZh: "最昂贵的型号", topic: "Comparatives & Superlatives", topicZh: "比价与最高级", grammar: "The most + 多音节形容词" },
  112: { title: "How do they compare?", titleZh: "它们怎么比较？(3)", topic: "Comparisons", topicZh: "比较事物3", grammar: "Superlatives" },
  113: { title: "Small change", titleZh: "零钱", topic: "Money & Change", topicZh: "买东西找零钱", grammar: "I haven't got any change" },
  114: { title: "I've got none.", titleZh: "我一点也没有。", topic: "Possession", topicZh: "拥有与没有", grammar: "I've got none." },`;

const regex = /  100: \{ title: "How do you feel\?".*?114: \{ title: "How much change\?", [^\n]*\n/s;
const newContent = content.replace(regex, replacement + '\n');

fs.writeFileSync('src/data/lessonsData.ts', newContent);
console.log('Done 2!');
