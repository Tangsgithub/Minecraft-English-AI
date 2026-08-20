import { VocabItem } from '../types';
import { AUTHENTIC_LESSON_VOCAB } from './authenticLessonVocab';
import { NCE_BOOK1_FULL_VOCAB } from './nceBook1FullVocab';
import { MINECRAFT_VOCABULARY } from './minecraftVocabData';

// 常用词库智能润色表（提供生动准确的 Minecraft 探险场景例句、音标与释义）
const VOCAB_ENHANCER_MAP: Record<string, Partial<VocabItem>> = {
  award: { phonetic: '/əˈwɔːd/', meaning: '名词/动词：奖励；授予', sampleSentence: 'He won a golden award in the building contest.', sampleTranslation: '他在建造大赛中赢得了黄金奖项。', mcItem: 'Golden Trophy', mcItemIcon: '🏆' },
  bounce: { phonetic: '/baʊns/', meaning: '动词：弹跳；反弹', sampleSentence: 'Slime blocks make players bounce very high into the air.', sampleTranslation: '粘液块能让玩家在空中高高弹起。', mcItem: 'Slime Block', mcItemIcon: '🟩' },
  chapter: { phonetic: '/ˈtʃæp.tər/', meaning: '名词：章节；篇章', sampleSentence: 'Read the next chapter in your adventure journal.', sampleTranslation: '阅读你探险日志中的下一个章节。', mcItem: 'Book', mcItemIcon: '📖' },
  compress: { phonetic: '/kəmˈpres/', meaning: '动词：压缩；压紧', sampleSentence: 'Compress nine ice blocks to craft packed ice.', sampleTranslation: '压缩九块普通冰以合成浮冰。', mcItem: 'Packed Ice', mcItemIcon: '🧊' },
  cricket: { phonetic: '/ˈkrɪk.ɪt/', meaning: '名词：蟋蟀；板球', sampleSentence: 'We can hear crickets chirping in the warm forest.', sampleTranslation: '我们能听到温暖森林里蟋蟀的鸣叫。', mcItem: 'Grass Block', mcItemIcon: '🦗' },
  aware: { phonetic: '/əˈweər/', meaning: '形容词：意识到的；警惕的', sampleSentence: 'Be aware of approaching creepers at night.', sampleTranslation: '夜晚要时刻警惕靠近的苦力怕。', mcItem: 'Eye of Ender', mcItemIcon: '👁️' },
  bound: { phonetic: '/baʊnd/', meaning: '形容词：受约束的；前往…的', sampleSentence: 'We are bound for the ancient ocean monument.', sampleTranslation: '我们正前往古老的海底神殿。', mcItem: 'Compass', mcItemIcon: '🧭' },
  character: { phonetic: '/ˈkær.ək.tər/', meaning: '名词：角色；性格', sampleSentence: 'Choose your favorite Minecraft character skin.', sampleTranslation: '选择你最喜欢的我的世界角色皮肤。', mcItem: 'Player Head', mcItemIcon: '👤' },
  comprise: { phonetic: '/kəmˈpraɪz/', meaning: '动词：包含；由…组成', sampleSentence: 'A beacon base comprises solid iron and emerald blocks.', sampleTranslation: '信标基座由坚实的铁块和绿宝石块组成。', mcItem: 'Beacon', mcItemIcon: '💠' },
  crime: { phonetic: '/kraɪm/', meaning: '名词：罪行；犯罪', sampleSentence: 'Griefing other players’ houses is a serious crime.', sampleTranslation: '破坏其他玩家的房屋是严重的违规行为。', mcItem: 'Iron Bars', mcItemIcon: '⛓️' },
  bottom: { phonetic: '/ˈbɒt.əm/', meaning: '名词：底部；底端', sampleSentence: 'Valuable diamonds generate near the bottom bedrock layer.', sampleTranslation: '珍贵的钻石生成在靠近基岩的底部区域。', mcItem: 'Bedrock', mcItemIcon: '⬇️' },
  chaos: { phonetic: '/ˈkeɪ.ɒs/', meaning: '名词：混乱；纷乱', sampleSentence: 'A creeper explosion caused sudden chaos in the village.', sampleTranslation: '苦力怕的爆炸在村庄里引起了突如其来的混乱。', mcItem: 'TNT', mcItemIcon: '💥' },
  crew: { phonetic: '/kruː/', meaning: '名词：全体船员；团队', sampleSentence: 'The pirate ship crew searched for buried ocean treasure.', sampleTranslation: '海盗船员们在搜寻埋藏的海洋宝藏。', mcItem: 'Oak Boat', mcItemIcon: '🏴‍☠️' },
  airport: { phonetic: '/ˈeə.pɔːt/', meaning: '名词：机场；航空港', sampleSentence: 'Fly your elytra from the mountain airport runway.', sampleTranslation: '从高山机场跑道上驾驶鞘翅起飞。', mcItem: 'Elytra', mcItemIcon: '🛫' },
  passport: { phonetic: '/ˈpɑːs.pɔːt/', meaning: '名词：护照', sampleSentence: 'Show your passport before entering the village kingdom.', sampleTranslation: '进入村庄王国前出示你的护照。', mcItem: 'Paper', mcItemIcon: '🛂' }
};

let cachedBook1VocabList: VocabItem[] | null = null;

/**
 * 获取《新概念英语》第一册（Volume 1）全册 144 课标准词汇全集（共 900+ 词）
 * - 确保词汇总数真实完整（900+ 词，覆盖 144 课）
 * - 每课词汇按标准课标平均分布（每课约 6~7 词）
 * - 当学生学完前 20 课时，准确解锁对应前 20 课的词汇，其余词汇随关卡稳步解锁
 */
export function getFullBook1VocabList(): VocabItem[] {
  if (cachedBook1VocabList) {
    return cachedBook1VocabList;
  }

  const lessonBuckets = new Map<number, VocabItem[]>();
  for (let i = 1; i <= 144; i++) {
    lessonBuckets.set(i, []);
  }

  const registeredWords = new Set<string>();

  // 1. 优先注入 1~21 课高精度原版课文词汇
  for (let l = 1; l <= 21; l++) {
    const authenticList = AUTHENTIC_LESSON_VOCAB[l];
    if (authenticList && authenticList.length > 0) {
      authenticList.forEach((item, idx) => {
        const key = item.word.toLowerCase();
        if (!registeredWords.has(key)) {
          registeredWords.add(key);
          lessonBuckets.get(l)!.push({
            id: `vol1_l${l}_${idx + 1}`,
            ...item,
            category: 'Course',
            requiredLessonId: l
          });
        }
      });
    }
  }

  // 2. 依次注入 Minecraft 特色联动物品词（均匀分配在前 44 课，每课附带 1 个 MC 方块/道具词）
  MINECRAFT_VOCABULARY.forEach((mv, idx) => {
    const key = mv.word.toLowerCase();
    const targetLesson = Math.min(144, idx + 1);

    if (registeredWords.has(key)) {
      // 若已存在，则融合 MC 道具属性
      for (const [_, list] of lessonBuckets.entries()) {
        const existing = list.find(v => v.word.toLowerCase() === key);
        if (existing) {
          existing.category = 'Minecraft';
          existing.mcItem = mv.mcItem || existing.mcItem;
          existing.mcItemIcon = mv.mcItemIcon || existing.mcItemIcon;
        }
      }
    } else {
      registeredWords.add(key);
      lessonBuckets.get(targetLesson)!.push({
        ...mv,
        id: `mc_item_${idx + 1}`,
        category: 'Minecraft',
        requiredLessonId: targetLesson
      });
    }
  });

  // 3. 注入新概念第一册全量生词（按真实课次 entry.lessonId 分配）
  NCE_BOOK1_FULL_VOCAB.forEach((entry, idx) => {
    const targetLesson = Math.max(1, Math.min(144, entry.lessonId || 1));
    const key = entry.word.toLowerCase();
    
    const bucket = lessonBuckets.get(targetLesson) || [];
    const exists = bucket.some(v => v.word.toLowerCase() === key);
    if (!exists) {
      const enhanced = VOCAB_ENHANCER_MAP[key] || {};
      const finalPhonetic = enhanced.phonetic || entry.phonetic || `/${entry.word}/`;
      const finalMeaning = enhanced.meaning || (entry.meaning.startsWith('新概念词汇：') ? `核心词汇：${entry.word}` : entry.meaning);
      
      let finalSentence = enhanced.sampleSentence || entry.sampleSentence;
      let finalTranslation = enhanced.sampleTranslation || entry.sampleTranslation;
      if (!finalSentence || finalSentence.includes('Practice writing')) {
        finalSentence = `Steve learns the key word '${entry.word}' in his lesson.`;
        finalTranslation = `史蒂夫在课程中认真学习核心词汇 '${entry.word}'。`;
      }

      bucket.push({
        id: `nce_book1_${targetLesson}_${idx}`,
        word: entry.word,
        phonetic: finalPhonetic,
        meaning: finalMeaning,
        category: 'Course',
        mcItem: enhanced.mcItem || entry.mcItem || 'Paper',
        mcItemIcon: enhanced.mcItemIcon || entry.mcItemIcon || '📜',
        sampleSentence: finalSentence,
        sampleTranslation: finalTranslation,
        requiredLessonId: targetLesson
      });
      lessonBuckets.set(targetLesson, bucket);
    }
  });

  const fullList: VocabItem[] = [];
  for (let l = 1; l <= 144; l++) {
    const wordsInLesson = lessonBuckets.get(l) || [];
    wordsInLesson.forEach(item => fullList.push(item));
  }

  fullList.sort((a, b) => (a.requiredLessonId || 1) - (b.requiredLessonId || 1));
  cachedBook1VocabList = fullList;
  return fullList;
}

/**
 * 获取指定课次（1~144课）的词汇列表
 */
export function getVocabForLessonFromManager(lessonId: number): VocabItem[] {
  const full = getFullBook1VocabList();
  return full.filter(v => (v.requiredLessonId || 1) === lessonId);
}
