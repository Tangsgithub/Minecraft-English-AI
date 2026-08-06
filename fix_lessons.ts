import fs from 'fs';

const content = fs.readFileSync('src/data/lessonsData.ts', 'utf8');

const replacement = `  115: { title: "Knock, knock!", titleZh: "敲敲门！", topic: "Visitors", topicZh: "敲门与来访", grammar: "Who is at the door?" },
  116: { title: "Every, no, any and some", titleZh: "Every, no, any和some", topic: "Pronouns", topicZh: "不定代词", grammar: "Every, no, any and some" },
  117: { title: "Tommy's breakfast", titleZh: "汤米的早餐", topic: "Breakfast", topicZh: "早餐", grammar: "Past continuous tense" },
  118: { title: "What were you doing?", titleZh: "你在做什么？", topic: "Past actions", topicZh: "过去的动作", grammar: "Past continuous tense" },
  119: { title: "A true story", titleZh: "一个真实的故事", topic: "Handbag Theft", topicZh: "真实经历与失物复得", grammar: "Past Perfect 过去完成时" },
  120: { title: "It had already happened", titleZh: "事情已经发生了", topic: "Past Perfect Tense", topicZh: "过去完成时复习与实操", grammar: "过去完成时 had + v-ed 及其应用" },
  121: { title: "The man in a hat", titleZh: "戴帽子的男士", topic: "Descriptions", topicZh: "外貌描述", grammar: "Relative clauses" },
  122: { title: "Who (whom), which and that", titleZh: "关系代词", topic: "Relative pronouns", topicZh: "关系代词", grammar: "Who (whom), which and that" },
  123: { title: "A trip to Australia", titleZh: "澳大利亚之行", topic: "Travel", topicZh: "旅行", grammar: "Relative clauses" },
  124: { title: "(Who) / (whom), (which) and (that)", titleZh: "关系代词(省略)", topic: "Relative pronouns", topicZh: "关系代词", grammar: "(Who) / (whom), (which) and (that)" },
  125: { title: "Tea for two", titleZh: "双人茶会", topic: "Social Tea", topicZh: "喝下午茶招待", grammar: "Would you like some tea?" },
  126: { title: "Have to and do not need to", titleZh: "不得不与不需要", topic: "Obligations", topicZh: "必须与不必", grammar: "Have to and do not need to" },
  127: { title: "A famous actress", titleZh: "一位著名的女演员", topic: "Celebrities", topicZh: "名人与电影", grammar: "She is a famous actress" },
  128: { title: "He can't be...", titleZh: "他不可能...", topic: "Deductions", topicZh: "推测", grammar: "He can't be..." },
  129: { title: "Seventy miles an hour", titleZh: "时速70英里", topic: "Speeding & Police", topicZh: "超速与警察问询", grammar: "You were driving too fast" },
  130: { title: "He can't have been...", titleZh: "他那时不可能...", topic: "Past Deductions", topicZh: "对过去的推测", grammar: "He can't have been..." },
  131: { title: "Don't be so sure!", titleZh: "别那么肯定！", topic: "Doubt", topicZh: "怀疑与不确定", grammar: "Don't be so sure!" },
  132: { title: "He may be...", titleZh: "他可能是...", topic: "Possibilities", topicZh: "可能性推测", grammar: "He may be..." },
  133: { title: "Sensational news!", titleZh: "轰动性新闻！", topic: "Big News", topicZh: "大新闻传达", grammar: "Have you heard the news?" },
  134: { title: "He said (that) he...", titleZh: "他说他...", topic: "Reported Speech", topicZh: "间接引语", grammar: "He said (that) he..." },
  135: { title: "The latest report", titleZh: "最新报道", topic: "News", topicZh: "新闻报道", grammar: "Reported speech" },
  136: { title: "He said (that) he...", titleZh: "他说他...", topic: "Reported Speech 2", topicZh: "间接引语2", grammar: "He said (that) he..." },
  137: { title: "A pleasant dream", titleZh: "美好的梦想", topic: "Dreams", topicZh: "梦想与愿望", grammar: "I wish I could..." },
  138: { title: "If...", titleZh: "如果...", topic: "Conditionals", topicZh: "条件句", grammar: "If..." },
  139: { title: "Is that you, John?", titleZh: "是你吗，约翰？", topic: "Phone Calls", topicZh: "打电话确认身份", grammar: "Is that you? Speaking." },
  140: { title: "He wants to know if/why/what/when", titleZh: "他想知道...", topic: "Indirect Questions", topicZh: "间接疑问句", grammar: "He wants to know..." },
  141: { title: "Sally's first train ride", titleZh: "萨莉第一次坐火车", topic: "Train Travels", topicZh: "第一次坐火车的兴奋", grammar: "It was her first train ride" },
  142: { title: "Someone invited Sally to a party", titleZh: "有人邀请萨莉去参加聚会", topic: "Passive Voice", topicZh: "被动语态", grammar: "Passive voice" },
  143: { title: "A walk through the woods", titleZh: "树林漫步", topic: "Nature Walks", topicZh: "在森林里漫步", grammar: "We walked through the woods" },
  144: { title: "He hasn't been served yet", titleZh: "他还没有被招待", topic: "Course Finale", topicZh: "全书毕业与回顾", grammar: "Passive voice" }
`;

const regex = /  115: \{ title: "Knock, knock!".*?144: \{ title: "Did you enjoy your walk\?", [^\n]*\n/s;
const newContent = content.replace(regex, replacement);

fs.writeFileSync('src/data/lessonsData.ts', newContent);
console.log('Done!');
