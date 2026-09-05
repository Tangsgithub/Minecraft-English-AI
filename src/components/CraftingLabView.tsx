import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, VocabItem, Lesson } from '../types';
import { MINECRAFT_VOCABULARY } from '../data/minecraftVocabData';
import { LESSONS_DATA } from '../data/lessonsData';
import {
  EXTRA_CRAFTING_RECIPES,
  CraftingRecipe,
  NCE_WORD_PARTS_MAP,
  NCE_WORD_CRAFTING_RECIPES,
  MC_EQUIPMENT_RECIPES
} from '../data/craftingRecipesData';
import {
  Hammer, Sparkles, Volume2, Trophy, Shield, Flame, CheckCircle, RefreshCw,
  Zap, ArrowRight, Sword, Lock, Unlock, Star, ChevronRight, Play, Heart, Award,
  AlertCircle, Crown, MapPin, BookOpen, Layers, Target, Compass, Sparkle,
  Check, Info, HelpCircle, X, Search, Lightbulb, GraduationCap, Keyboard, Type, RotateCcw
} from 'lucide-react';
import { playClickSound, playEmeraldSound, playBlockBreakSound, speakText, playLevelUpSound } from '../utils/audio';
import { unlockMobileAudio } from '../services/edgeTtsService';
import { hasLessonAccess, isLessonPaywallLocked } from '../utils/volumeProgress';
import confetti from 'canvas-confetti';

interface CraftingLabViewProps {
  profile: UserProfile;
  onAwardEmeralds: (emeralds: number, xp?: number, reason?: string) => void;
  onMasterWord?: (word: string) => void;
  onOpenVipModal?: () => void;
  onNavigateToLesson?: (lessonId: number) => void;
  onNavigateToVocab?: () => void;
  onUpdateProfile?: (updatedProfile: UserProfile) => void;
}

// 物品材料调色板库定义
interface PaletteItem {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  category: string;
  type: 'nce_word' | 'mc_material';
}

// 原版 MC 材料调色板
const MC_PALETTE_MATERIALS: PaletteItem[] = [
  // 基础木石
  { id: 'log', name: '橡木原木', nameEn: 'Oak Log', icon: '🪵', category: 'wood_stone', type: 'mc_material' },
  { id: 'plank', name: '橡木木板', nameEn: 'Oak Plank', icon: '🪵', category: 'wood_stone', type: 'mc_material' },
  { id: 'stick', name: '木棍', nameEn: 'Stick', icon: '🥢', category: 'wood_stone', type: 'mc_material' },
  { id: 'cobblestone', name: '圆石', nameEn: 'Cobblestone', icon: '🪨', category: 'wood_stone', type: 'mc_material' },
  { id: 'sand', name: '沙子', nameEn: 'Sand', icon: '⏳', category: 'wood_stone', type: 'mc_material' },
  { id: 'glass', name: '玻璃', nameEn: 'Glass', icon: '🔲', category: 'wood_stone', type: 'mc_material' },
  
  // 矿物金属
  { id: 'coal', name: '煤炭', nameEn: 'Coal', icon: '⬛', category: 'minerals', type: 'mc_material' },
  { id: 'iron_ingot', name: '铁锭', nameEn: 'Iron Ingot', icon: '🪙', category: 'minerals', type: 'mc_material' },
  { id: 'gold_ingot', name: '金锭', nameEn: 'Gold Ingot', icon: '🌟', category: 'minerals', type: 'mc_material' },
  { id: 'diamond', name: '钻石', nameEn: 'Diamond', icon: '💎', category: 'minerals', type: 'mc_material' },
  { id: 'redstone', name: '红石粉', nameEn: 'Redstone', icon: '🔴', category: 'minerals', type: 'mc_material' },
  { id: 'obsidian', name: '黑曜石', nameEn: 'Obsidian', icon: '⬛', category: 'minerals', type: 'mc_material' },
  
  // 怪物与稀有掉落
  { id: 'string', name: '蜘蛛丝', nameEn: 'String', icon: '🧵', category: 'mobs', type: 'mc_material' },
  { id: 'feather', name: '羽毛', nameEn: 'Feather', icon: '🪶', category: 'mobs', type: 'mc_material' },
  { id: 'gunpowder', name: '火药', nameEn: 'Gunpowder', icon: '💥', category: 'mobs', type: 'mc_material' },
  { id: 'slimeball', name: '粘液球', nameEn: 'Slimeball', icon: '🟢', category: 'mobs', type: 'mc_material' },
  { id: 'blaze_rod', name: '烈焰棒', nameEn: 'Blaze Rod', icon: '🔥', category: 'mobs', type: 'mc_material' },
  { id: 'nether_star', name: '下界之星', nameEn: 'Nether Star', icon: '⭐', category: 'mobs', type: 'mc_material' },

  // 农牧与生活食材
  { id: 'wool', name: '羊毛', nameEn: 'Wool', icon: '🧶', category: 'food_farm', type: 'mc_material' },
  { id: 'wheat', name: '小麦', nameEn: 'Wheat', icon: '🌾', category: 'food_farm', type: 'mc_material' },
  { id: 'sugar', name: '白糖', nameEn: 'Sugar', icon: '🍬', category: 'food_farm', type: 'mc_material' },
  { id: 'egg', name: '鸡蛋', nameEn: 'Egg', icon: '🥚', category: 'food_farm', type: 'mc_material' },
  { id: 'milk_bucket', name: '牛奶桶', nameEn: 'Milk Bucket', icon: '🥛', category: 'food_farm', type: 'mc_material' },
  { id: 'apple', name: '苹果', nameEn: 'Apple', icon: '🍎', category: 'food_farm', type: 'mc_material' },
  { id: 'book', name: '书本', nameEn: 'Book', icon: '📖', category: 'food_farm', type: 'mc_material' },
];

// 新概念英语构词部件材料调色板
const NCE_PALETTE_MATERIALS: PaletteItem[] = Object.entries(NCE_WORD_PARTS_MAP).map(([word, info]) => ({
  id: `nce_part_${word}`,
  name: info.zh,
  nameEn: word,
  icon: info.icon,
  category: info.category,
  type: 'nce_word'
}));

const RECIPES: CraftingRecipe[] = EXTRA_CRAFTING_RECIPES;

interface SentencePattern {
  id: string;
  lessonId: number;
  title: string;
  targetSentence: string;
  translation: string;
  blocks: { text: string; role: 'subject' | 'verb' | 'object' | 'modifier' }[];
  distractors: { text: string; role: 'subject' | 'verb' | 'object' | 'modifier' }[];
  grammarBlueprint: string;
  explanation: string;
}

// 智能生成符合课程进度的语法重组句型库
function getDynamicSentencePatterns(unlockedLessonIds: number[], completedLessonIds: number[]): SentencePattern[] {
  const patterns: SentencePattern[] = [];
  const combinedIds = Array.from(new Set([...(unlockedLessonIds || [1]), ...(completedLessonIds || [1])])).sort((a, b) => a - b);
  const lessonsToUse = LESSONS_DATA.filter(l => combinedIds.includes(l.id));
  const effectiveLessons = lessonsToUse.length > 0 ? lessonsToUse : LESSONS_DATA.slice(0, 5);

  effectiveLessons.forEach((lesson) => {
    if (lesson.targetSentences && lesson.targetSentences.length > 0) {
      const sentence = lesson.targetSentences[0];
      const translation = lesson.targetSentenceTranslations ? lesson.targetSentenceTranslations[0] : '课文核心重点句型';

      // 提取语法积木
      const words = sentence.trim().split(/\s+/);
      const blocks: { text: string; role: 'subject' | 'verb' | 'object' | 'modifier' }[] = [];

      if (words.length <= 3) {
        words.forEach((w, idx) => {
          blocks.push({
            text: w,
            role: idx === 0 ? 'subject' : idx === 1 ? 'verb' : 'object'
          });
        });
      } else if (words.length === 4) {
        blocks.push({ text: words[0], role: 'subject' });
        blocks.push({ text: words[1], role: 'verb' });
        blocks.push({ text: words.slice(2).join(' '), role: 'object' });
      } else {
        const p1 = words.slice(0, Math.ceil(words.length / 3)).join(' ');
        const p2 = words.slice(Math.ceil(words.length / 3), Math.ceil((words.length * 2) / 3)).join(' ');
        const p3 = words.slice(Math.ceil((words.length * 2) / 3)).join(' ');
        blocks.push({ text: p1, role: 'subject' });
        blocks.push({ text: p2, role: 'verb' });
        blocks.push({ text: p3, role: 'modifier' });
      }

      const distractors: { text: string; role: 'subject' | 'verb' | 'object' | 'modifier' }[] = [
        { text: 'is not', role: 'verb' },
        { text: 'in the cave', role: 'modifier' }
      ];

      patterns.push({
        id: `sent_lesson_${lesson.id}`,
        lessonId: lesson.id,
        title: `第 ${lesson.id} 课 · ${lesson.title}`,
        targetSentence: sentence,
        translation: translation,
        blocks: blocks,
        distractors: distractors,
        grammarBlueprint: `[ 主谓宾标准句式 / ${lesson.grammarNote || '核心句型'} ]`,
        explanation: lesson.sceneDescription || `本句出自第 ${lesson.id} 课，注意主谓一致与语序排列。`
      });
    }
  });

  return patterns;
}

// 5大阶梯式怪物擂台设计
interface MobBoss {
  id: string;
  name: string;
  title: string;
  icon: string;
  requiredLessonId: number;
  maxHp: number;
  currentHp: number;
  rewardEmeralds: number;
  rewardXp: number;
  theme: string;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    grammarNote: string;
  }[];
}

const INITIAL_BOSSES: MobBoss[] = [
  {
    id: 'boss_zombie',
    name: '夜袭先锋 · 僵尸 (Zombie)',
    title: '入门阶梯：基础发音与主谓代词',
    icon: '🧟',
    requiredLessonId: 1,
    maxHp: 3,
    currentHp: 3,
    rewardEmeralds: 15,
    rewardXp: 40,
    theme: 'green',
    questions: [
      {
        question: '“Excuse me!” 在遇到同伴或向史蒂夫打招呼时，通常表达什么意思？',
        options: ['抱歉 / 打扰一下', '再见', '谢谢你', '不客气'],
        correctIndex: 0,
        explanation: '“Excuse me!” 是最礼貌的搭话与引起对方注意的句式。',
        grammarNote: '口语高频交际用语，适用于引起注意或表示歉意。'
      },
      {
        question: '句型 “Is this your handbag?” 中，be动词为什么用 “is” 而不用 “are”？',
        options: ['因为主语 handbag 是单数名词', '因为这是过去时', '因为省略了主语', '没有原因，随意使用'],
        correctIndex: 0,
        explanation: '主语 handbag 是单数第三人称，因此对应的 be 动词是 is。',
        grammarNote: '一般疑问句中的主谓一致原则：单数名词搭配 is，复数搭配 are。'
      },
      {
        question: '我的世界中将 4 块木板合成什么基础方块？',
        options: ['Crafting Table (工作台)', 'Furnace (熔炉)', 'Chest (木箱)', 'Bed (床)'],
        correctIndex: 0,
        explanation: 'Four wood planks craft a crafting table!',
        grammarNote: 'craft 为动词，意为“手工制作/合成”。'
      }
    ]
  },
  {
    id: 'boss_skeleton',
    name: '精准神射手 · 骷髅 (Skeleton)',
    title: '初级阶梯：疑问句、指示代词与道具工具',
    icon: '🏹',
    requiredLessonId: 5,
    maxHp: 4,
    currentHp: 4,
    rewardEmeralds: 25,
    rewardXp: 60,
    theme: 'slate',
    questions: [
      {
        question: '回答 “Is that your pickaxe?” 的否定简略回答是？',
        options: ['No, it isn’t.', 'No, it not.', 'No, that isn’t.', 'No, I am not.'],
        correctIndex: 0,
        explanation: '问句以 Is that... 开头，答句代词统一用 it 代替指示代词 that。',
        grammarNote: '指示代词 that/this 在简短回答中必须用人称代词 it 回答。'
      },
      {
        question: '在合成表里，制作一把铁镐 (Iron Pickaxe) 需要哪些材料？',
        options: ['3 Iron Ingots + 2 Sticks', '2 Iron Ingots + 3 Sticks', '3 Cobblestones + 2 Sticks', '1 Diamond + 2 Sticks'],
        correctIndex: 0,
        explanation: '铁镐合成格式：顶部 3 块铁锭，中间坚排 2 根木棍。',
        grammarNote: '复合名词：Pickaxe (Pick 尖镐 + Axe 斧子)。'
      },
      {
        question: '“Where is my torch?” 句中的 “Where” 是什么词性？',
        options: ['特殊疑问代词/副词 (询问地点)', '连词', '冠词', '动词'],
        correctIndex: 0,
        explanation: 'Where 引导特殊疑问句，用于对地点进行提问。',
        grammarNote: '特殊疑问句结构：特殊疑问词 + be动词/助动词 + 主语？'
      },
      {
        question: '单数名词 sword 的复数形式是？',
        options: ['swords', 'swordes', 'swordies', 'sword'],
        correctIndex: 0,
        explanation: '普通名词直接加 -s 构成复数：sword -> swords。',
        grammarNote: '名词复数变化规则：大多数普通可数名词直接加 s。'
      }
    ]
  },
  {
    id: 'boss_creeper',
    name: '潜行爆破手 · 苦力怕 (Creeper)',
    title: '中级阶梯：方位介词、所有格与矿物词汇',
    icon: '🟢',
    requiredLessonId: 11,
    maxHp: 4,
    currentHp: 4,
    rewardEmeralds: 35,
    rewardXp: 80,
    theme: 'emerald',
    questions: [
      {
        question: '“The diamond is inside the chest.” 句中介词 “inside” 表示什么？',
        options: ['在...里面', '在...上面', '在...下方', '在...旁边'],
        correctIndex: 0,
        explanation: 'inside 表示“在某物的内部/里面”，与 outside 相对。',
        grammarNote: '方位介词：inside (在内部), on (在表面), under (在下方)。'
      },
      {
        question: '名词所有格：“Alex 的铁剑” 用英文表达是？',
        options: ['Alex’s iron sword', 'Alex iron sword', 'The iron sword of Alex’s', 'Alexs iron sword'],
        correctIndex: 0,
        explanation: '单数有生命的名词所有格在词尾加 ’s。',
        grammarNote: '名词所有格：名词 + ’s 表示“...的”。'
      },
      {
        question: '点燃 TNT 炸药需要用到什么工具？',
        options: ['Flint and Steel (打火石)', 'Fishing Rod (钓鱼竿)', 'Compass (指南针)', 'Shears (剪刀)'],
        correctIndex: 0,
        explanation: 'Flint and Steel 用于点火引爆 TNT。',
        grammarNote: 'flint (燧石) + steel (铁锭/钢)，并列结构。'
      },
      {
        question: '“These are your emeralds.” 如果变成单数句，应该是？',
        options: ['This is your emerald.', 'That is your emeralds.', 'This are your emerald.', 'It is your emeralds.'],
        correctIndex: 0,
        explanation: 'These 变 This，are 变 is，emeralds 变单数 emerald。',
        grammarNote: '单复数句子转换时，代词、be动词、名词必须保持数的一致性。'
      }
    ]
  },
  {
    id: 'boss_enderman',
    name: '虚空瞬移者 · 末影人 (Enderman)',
    title: '高级阶梯：情态动词、过去时与生存词汇',
    icon: '🟣',
    requiredLessonId: 21,
    maxHp: 5,
    currentHp: 5,
    rewardEmeralds: 50,
    rewardXp: 120,
    theme: 'purple',
    questions: [
      {
        question: '“You must not look directly into an Enderman’s eyes.” 句中 must not 表示？',
        options: ['严禁 / 绝不可以', '不必', '可能不', '不喜欢'],
        correctIndex: 0,
        explanation: 'must not (或 mustn’t) 表示强烈的禁止，直视末影人会激怒它。',
        grammarNote: '情态动词：must (必须), must not (严禁/千万不可), needn’t (不必)。'
      },
      {
        question: '“Yesterday, Steve _____ (find) five diamonds underground.” 括号内动词应填？',
        options: ['found', 'finded', 'finds', 'finding'],
        correctIndex: 0,
        explanation: 'Yesterday 标志过去时，find 的不规则过去式是 found。',
        grammarNote: '一般过去时不规则动词：find -> found -> found。'
      },
      {
        question: '合成粘性活塞 (Sticky Piston) 需要什么材料与普通活塞合成？',
        options: ['Slimeball (粘液球)', 'Gunpowder (火药)', 'Redstone (红石粉)', 'Blaze Rod (烈焰棒)'],
        correctIndex: 0,
        explanation: 'Slimeball + Piston = Sticky Piston。',
        grammarNote: '形容词后缀 -y：slime (粘液) -> sticky (粘性的)。'
      },
      {
        question: '“He can teleport across long distances.” 句中 “can” 是什么词？',
        options: ['情态动词 (表示能力)', '实义动词', '助动词 do', '介词'],
        correctIndex: 0,
        explanation: 'can 是情态动词，后接动词原形 teleport。',
        grammarNote: '情态动词后面必须紧跟动词原形 (Base form)。'
      },
      {
        question: '“If it rains, the Enderman will take damage.” 这是一个什么句型？',
        options: ['条件状语从句 (主将从现)', '时间状语从句', '宾语从句', '定语从句'],
        correctIndex: 0,
        explanation: 'If 引导真实条件句，主句用一般将来时 will，从句用一般现在时 rains。',
        grammarNote: '条件从句经典考点：主将从现 (Main Clause: will + do, If Clause: simple present)。'
      }
    ]
  },
  {
    id: 'boss_ender_dragon',
    name: '末地维度主宰 · 末影龙 (Ender Dragon)',
    title: '终极史诗考验：综合从句、MC全真语法与VIP终极大擂台',
    icon: '🐉',
    requiredLessonId: 31,
    maxHp: 5,
    currentHp: 5,
    rewardEmeralds: 100,
    rewardXp: 300,
    theme: 'amber',
    questions: [
      {
        question: '“Destroy the End Crystals which heal the Dragon!” 句中 “which” 引导什么从句？',
        options: ['定语从句 (修饰 End Crystals)', '名词性从句', '状语从句', '感叹句'],
        correctIndex: 0,
        explanation: 'which 指代先行词 End Crystals，在定语从句中作主语。',
        grammarNote: '关系代词 which 用于修饰物，引导定语从句。'
      },
      {
        question: '信标 (Beacon) 的合成配方中，正中心放置的关键材料是？',
        options: ['Nether Star (下界之星)', 'Diamond (钻石)', 'Obsidian (黑曜石)', 'Heart of the Sea (海洋之心)'],
        correctIndex: 0,
        explanation: '信标的核心合成材料是击败凋灵掉落的 Nether Star！',
        grammarNote: 'Nether (下界的) + Star (星星) ➔ 专有合成素材。'
      },
      {
        question: '“Although the Dragon was powerful, Steve defeated it bravely.” 句中 although 表示？',
        options: ['尽管 / 虽然 (引导让步状语从句)', '因为', '如果', '除非'],
        correctIndex: 0,
        explanation: 'although 引导让步状语从句，注意不能与 but 连用。',
        grammarNote: '让步状语从句：although / though 与 but 互斥，不可同时出现。'
      },
      {
        question: '“The enchanted diamond sword is _____ (strong) than the iron sword.” 括号内填？',
        options: ['stronger', 'more strong', 'strongest', 'most strong'],
        correctIndex: 0,
        explanation: 'than 标志比较级，单音节形容词 strong 直接加 -er -> stronger。',
        grammarNote: '形容词比较级变化规则：单音节词通常直接加 -er。'
      },
      {
        question: '完成击杀末影龙后，玩家跳入传送门看到的终末之诗 (End Poem) 讲述了什么核心理念？',
        options: ['爱、成长、勇气与对世界的深刻理解', '如何挖掘更多钻石', '红石电路的教程', '怪物的掉落概率'],
        correctIndex: 0,
        explanation: 'End Poem 充满哲学与诗意，强调 “You are the player, waking up from a dream.”',
        grammarNote: 'Minecraft 人文与哲学背景，鼓励勇于探索与拥抱现实生活。'
      }
    ]
  }
];

export const CraftingLabView: React.FC<CraftingLabViewProps> = ({
  profile,
  onAwardEmeralds,
  onMasterWord,
  onOpenVipModal,
  onNavigateToLesson,
  onNavigateToVocab,
  onUpdateProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'bench' | 'sentences' | 'boss'>('bench');

  // 词汇库与配方库同步统计
  const masteredNceRecipesCount = useMemo(() => {
    const set = new Set((profile.masteredWords || []).map(w => w.toLowerCase()));
    return NCE_WORD_CRAFTING_RECIPES.filter(r => set.has(r.nameEn.toLowerCase())).length;
  }, [profile.masteredWords]);

  const craftedNceRecipesCount = useMemo(() => {
    const set = new Set(profile.unlockedCraftingIds || []);
    return NCE_WORD_CRAFTING_RECIPES.filter(r => set.has(r.id)).length;
  }, [profile.unlockedCraftingIds]);

  // ========== 1. 合成台 (Bench) 状态 ==========
  // 模式：'nce_words' (新概念生词构词合成) | 'mc_gear' (MC 原版装备合成)
  const [benchMode, setBenchMode] = useState<'nce_words' | 'mc_gear'>('nce_words');
  const [recipeTypeFilter, setRecipeTypeFilter] = useState<'nce_words' | 'mc_gear' | 'all'>('nce_words');
  const [gridSlots, setGridSlots] = useState<(string | null)[]>(Array(9).fill(null));
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(0);
  const [paletteCategory, setPaletteCategory] = useState<string>('all');
  const [recipeCategoryFilter, setRecipeCategoryFilter] = useState<string>('all');
  const [recipeSearch, setRecipeSearch] = useState<string>('');
  const [matchedRecipe, setMatchedRecipe] = useState<CraftingRecipe | null>(null);
  const [craftSuccessEffect, setCraftSuccessEffect] = useState<boolean>(false);
  const [selectedInspectRecipe, setSelectedInspectRecipe] = useState<CraftingRecipe | null>(NCE_WORD_CRAFTING_RECIPES[0] || RECIPES[0]);
  
  // 新手向导与配方手册速查弹窗
  const [showGuideBanner, setShowGuideBanner] = useState<boolean>(true);
  const [showHandbookModal, setShowHandbookModal] = useState<boolean>(false);
  const [handbookSearch, setHandbookSearch] = useState<string>('');
  const [handbookTab, setHandbookTab] = useState<'nce_words' | 'mc_gear' | 'all'>('nce_words');

  // ========== 2. 句子工坊 (Sentence Synthesizer) 状态 ==========
  const dynamicSentencePatterns = React.useMemo(() => {
    return getDynamicSentencePatterns(profile.unlockedLessons || [1], profile.completedLessons || [1]);
  }, [profile.unlockedLessons, profile.completedLessons]);

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [userSentenceSlots, setUserSentenceSlots] = useState<{ text: string; role: string }[]>([]);
  const [sentenceCandidatePool, setSentenceCandidatePool] = useState<{ id: string; text: string; role: string; used: boolean }[]>([]);
  const [sentenceCheckedState, setSentenceCheckedState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // 单词键入拼写模式状态 (Spelling & Typing Practice)
  const [sentencePracticeMode, setSentencePracticeMode] = useState<'blocks' | 'typing'>('blocks');
  const [typingModeType, setTypingModeType] = useState<'slots' | 'full'>('slots'); // 'slots': 逐词填空拼写, 'full': 整句键盘默写
  const [typedWordInputs, setTypedWordInputs] = useState<string[]>([]);
  const [activeTypingWordIndex, setActiveTypingWordIndex] = useState<number>(0);
  const [fullTypedSentence, setFullTypedSentence] = useState<string>('');
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({});
  const [typingCheckedState, setTypingCheckedState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const currentSentencePattern = dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length];
  const targetWords = useMemo(() => {
    if (!currentSentencePattern) return [];
    return currentSentencePattern.targetSentence
      .replace(/[^a-zA-Z0-9\s'-]/g, '')
      .split(/\s+/)
      .filter(Boolean);
  }, [currentSentencePattern]);

  // 初始化当前句子工坊题目
  useEffect(() => {
    if (dynamicSentencePatterns.length > 0) {
      const currentPattern = dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length];
      if (currentPattern) {
        setUserSentenceSlots([]);
        setSentenceCheckedState('idle');
        const rawPool = [
          ...currentPattern.blocks.map((b, idx) => ({ id: `blk_${idx}`, text: b.text, role: b.role, used: false })),
          ...currentPattern.distractors.map((d, idx) => ({ id: `dis_${idx}`, text: d.text, role: d.role, used: false }))
        ];
        // 随机打乱
        setSentenceCandidatePool(rawPool.sort(() => Math.random() - 0.5));

        // 单词键盘拼写初始化
        const words = currentPattern.targetSentence
          .replace(/[^a-zA-Z0-9\s'-]/g, '')
          .split(/\s+/)
          .filter(Boolean);
        setTypedWordInputs(new Array(words.length).fill(''));
        setActiveTypingWordIndex(0);
        setFullTypedSentence('');
        setRevealedHints({});
        setTypingCheckedState('idle');
      }
    }
  }, [currentSentenceIndex, dynamicSentencePatterns]);

  // ========== 3. 怪物擂台 (Mob Arena) 状态 ==========
  const [bossList, setBossList] = useState<MobBoss[]>(INITIAL_BOSSES);
  const [activeBossIndex, setActiveBossIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [battleFeedback, setBattleFeedback] = useState<{ isCorrect: boolean; show: boolean; msg: string } | null>(null);
  const [isBossDefeated, setIsBossDefeated] = useState<boolean>(false);
  const [attackAnimation, setAttackAnimation] = useState<boolean>(false);
  const [shuffledOptions, setShuffledOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);

  // 实时检测 3x3 物品网格是否匹配任何配方
  useEffect(() => {
    let match: CraftingRecipe | null = null;
    for (const r of RECIPES) {
      // 1. 严格全网格 3x3 匹配
      const isExactMatch = r.gridPattern.every((item, idx) => {
        if (item === null) return gridSlots[idx] === null;
        return gridSlots[idx] === item;
      });
      if (isExactMatch) {
        match = r;
        break;
      }

      // 2. 针对 2 部件新概念复合词的横向相邻灵活匹配 (允许放置在任意一行的相邻两格)
      if (r.recipeType === 'nce_word') {
        const reqParts = r.gridPattern.filter(Boolean);
        const gridPlaced = gridSlots.map((val, idx) => ({ val, idx })).filter(item => item.val !== null);
        if (reqParts.length === 2 && gridPlaced.length === 2) {
          const [p1, p2] = reqParts;
          const isOrdered = gridPlaced[0].val === p1 && gridPlaced[1].val === p2;
          const adjacentPairs = [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8]];
          const isAdjacent = adjacentPairs.some(([a, b]) => gridPlaced[0].idx === a && gridPlaced[1].idx === b);
          if (isOrdered && isAdjacent) {
            match = r;
            break;
          }
        }
      }
    }
    setMatchedRecipe(match);
    if (match) {
      setSelectedInspectRecipe(match);
    }
  }, [gridSlots]);

  // 检查配方是否由于关卡或VIP解锁
  const isRecipeUnlocked = (recipe: CraftingRecipe): boolean => {
    const reqLesson = recipe.requiredLessonId || 1;
    return hasLessonAccess(profile, 'vol1', reqLesson);
  };

  const isRecipePaywall = (recipe: CraftingRecipe): boolean => {
    const reqLesson = recipe.requiredLessonId || 1;
    return isLessonPaywallLocked(profile, 'vol1', reqLesson);
  };

  // 点击调色板物品，放入当前选中的网格槽（或首个空槽）
  const handleSelectPaletteItem = (item: PaletteItem) => {
    playClickSound();
    unlockMobileAudio();

    let targetIdx = selectedSlotIndex;
    if (targetIdx === null || gridSlots[targetIdx] !== null) {
      // 找第一个空位
      const firstEmpty = gridSlots.findIndex(s => s === null);
      targetIdx = firstEmpty !== -1 ? firstEmpty : 0;
    }

    const newGrid = [...gridSlots];
    // 新概念生词使用词根单词 (如 'hand', 'bag')，MC材料使用图标
    newGrid[targetIdx] = item.type === 'nce_word' ? item.nameEn : item.icon;
    setGridSlots(newGrid);

    // 自动移到下一个槽位
    setSelectedSlotIndex((targetIdx + 1) % 9);
  };

  // 点击网格槽
  const handleGridSlotClick = (index: number) => {
    unlockMobileAudio();
    if (gridSlots[index] !== null) {
      // 如果有物品，点击移除
      playBlockBreakSound();
      const newGrid = [...gridSlots];
      newGrid[index] = null;
      setGridSlots(newGrid);
    } else {
      playClickSound();
    }
    setSelectedSlotIndex(index);
  };

  // 清空网格
  const handleClearGrid = () => {
    playBlockBreakSound();
    setGridSlots(Array(9).fill(null));
    setSelectedSlotIndex(0);
  };

  // 一键装填已知配方
  const handleQuickFillRecipe = (recipe: CraftingRecipe) => {
    playClickSound();
    unlockMobileAudio();
    setGridSlots([...recipe.gridPattern]);
    setSelectedInspectRecipe(recipe);
    // 自动同步当前材料板模式
    if (recipe.recipeType === 'nce_word') {
      setBenchMode('nce_words');
    } else {
      setBenchMode('mc_gear');
    }
  };

  // 执行合成操作
  const handleCraftItem = () => {
    if (!matchedRecipe) return;

    unlockMobileAudio();
    const isUnlocked = isRecipeUnlocked(matchedRecipe);
    if (!isUnlocked) {
      if (isRecipePaywall(matchedRecipe) && onOpenVipModal) {
        onOpenVipModal();
      }
      return;
    }

    // 触发特效
    playEmeraldSound();
    playLevelUpSound();
    setCraftSuccessEffect(true);
    setTimeout(() => setCraftSuccessEffect(false), 2500);

    // 朗读英文
    speakText(matchedRecipe.nameEn, { lang: 'en-US' });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // 奖励绿宝石与经验
    onAwardEmeralds(8, 20);

    // 若为新概念词汇且有掌握回调，自动收录进已掌握单词
    if (onMasterWord && matchedRecipe.recipeType === 'nce_word') {
      onMasterWord(matchedRecipe.nameEn);
    }

    // 自动记录解锁历史与个人档案
    const newCraftedIds = Array.from(new Set([...(profile.unlockedCraftingIds || []), matchedRecipe.id]));
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        unlockedCraftingIds: newCraftedIds,
        emeralds: profile.emeralds + 8,
        xp: profile.xp + 20
      });
    }
  };

  // 词汇朗读
  const handlePlayVoice = (text: string) => {
    unlockMobileAudio();
    speakText(text, { lang: 'en-US' });
  };

  // 过滤后的调色板物品 (根据 benchMode 自动切换生词部件与MC材料)
  const currentPaletteList = benchMode === 'nce_words' ? NCE_PALETTE_MATERIALS : MC_PALETTE_MATERIALS;

  const filteredPalette = currentPaletteList.filter(m => {
    if (paletteCategory === 'all') return true;
    return m.category === paletteCategory;
  });

  // 过滤后的配方本 (支持新概念单词与MC装备分类筛选)
  const filteredRecipes = RECIPES.filter(r => {
    if (recipeTypeFilter === 'nce_words' && r.recipeType !== 'nce_word') return false;
    if (recipeTypeFilter === 'mc_gear' && r.recipeType === 'nce_word') return false;

    const matchCategory = recipeCategoryFilter === 'all' || r.category === recipeCategoryFilter;
    const matchQuery = recipeSearch.trim() === '' ||
      r.nameEn.toLowerCase().includes(recipeSearch.toLowerCase()) ||
      r.nameZh.includes(recipeSearch);
    return matchCategory && matchQuery;
  });

  // 配方手册弹窗内的配方筛选
  const filteredHandbookRecipes = RECIPES.filter(r => {
    if (handbookTab === 'nce_words' && r.recipeType !== 'nce_word') return false;
    if (handbookTab === 'mc_gear' && r.recipeType === 'nce_word') return false;

    const q = handbookSearch.trim().toLowerCase();
    if (!q) return true;
    const matchName = r.nameEn.toLowerCase().includes(q) || r.nameZh.includes(q);
    const matchLesson = `第${r.requiredLessonId || 1}课`.includes(q) || `l${r.requiredLessonId || 1}` === q;
    const matchIngredients = r.requiredIngredients.some(i => i.name.toLowerCase().includes(q));
    return matchName || matchLesson || matchIngredients;
  });

  // ========== 句子工坊交互 ==========
  const handleAddSentenceBlock = (candidate: { id: string; text: string; role: string; used: boolean }) => {
    if (candidate.used) return;
    playClickSound();
    unlockMobileAudio();
    setUserSentenceSlots([...userSentenceSlots, { text: candidate.text, role: candidate.role }]);
    setSentenceCandidatePool(prev => prev.map(c => c.id === candidate.id ? { ...c, used: true } : c));
    setSentenceCheckedState('idle');
  };

  const handleRemoveSentenceSlot = (index: number) => {
    playBlockBreakSound();
    const removed = userSentenceSlots[index];
    const newSlots = userSentenceSlots.filter((_, i) => i !== index);
    setUserSentenceSlots(newSlots);

    // 归还到候选池
    setSentenceCandidatePool(prev => {
      let restored = false;
      return prev.map(c => {
        if (!restored && c.used && c.text === removed.text) {
          restored = true;
          return { ...c, used: false };
        }
        return c;
      });
    });
    setSentenceCheckedState('idle');
  };

  const handleCheckSentence = () => {
    const currentPattern = dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length];
    if (!currentPattern) return;

    unlockMobileAudio();
    const constructed = userSentenceSlots.map(s => s.text).join(' ').trim().toLowerCase();
    const targetClean = currentPattern.targetSentence.trim().toLowerCase().replace(/[.?!,]/g, '');
    const constructedClean = constructed.replace(/[.?!,]/g, '');

    if (constructedClean === targetClean) {
      setSentenceCheckedState('correct');
      playEmeraldSound();
      playLevelUpSound();
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      onAwardEmeralds(10, 25);
      speakText(currentPattern.targetSentence, { lang: 'en-US' });
    } else {
      setSentenceCheckedState('wrong');
      playBlockBreakSound();
    }
  };

  const handleNextSentence = () => {
    playClickSound();
    setCurrentSentenceIndex((prev) => (prev + 1) % dynamicSentencePatterns.length);
  };

  // ========== 键盘拼写模式交互 (Spelling & Typing Handlers) ==========
  const handleTypedWordChange = (index: number, value: string) => {
    unlockMobileAudio();
    const cleanVal = value.replace(/[^a-zA-Z0-9'-]/g, '');
    const newInputs = [...typedWordInputs];
    newInputs[index] = cleanVal;
    setTypedWordInputs(newInputs);
    setTypingCheckedState('idle');

    // 智能步进：如果当前词拼写正确且不是最后一个词，自动跳到下一个输入槽
    const targetWord = targetWords[index] || '';
    if (cleanVal.toLowerCase() === targetWord.toLowerCase() && index < targetWords.length - 1) {
      playClickSound();
      setActiveTypingWordIndex(index + 1);
    }
  };

  const handleWordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (index < targetWords.length - 1) {
        playClickSound();
        setActiveTypingWordIndex(index + 1);
      } else {
        handleCheckTyping();
      }
    } else if (e.key === 'Backspace' && (typedWordInputs[index] === '' || !typedWordInputs[index]) && index > 0) {
      setActiveTypingWordIndex(index - 1);
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    playClickSound();
    unlockMobileAudio();

    if (typingModeType === 'slots') {
      const curInput = typedWordInputs[activeTypingWordIndex] || '';
      if (key === 'BACKSPACE') {
        if (curInput.length > 0) {
          handleTypedWordChange(activeTypingWordIndex, curInput.slice(0, -1));
        } else if (activeTypingWordIndex > 0) {
          setActiveTypingWordIndex(activeTypingWordIndex - 1);
        }
      } else if (key === 'SPACE' || key === 'NEXT') {
        if (activeTypingWordIndex < targetWords.length - 1) {
          setActiveTypingWordIndex(activeTypingWordIndex + 1);
        } else {
          handleCheckTyping();
        }
      } else if (key === 'CLEAR') {
        const newInputs = [...typedWordInputs];
        newInputs[activeTypingWordIndex] = '';
        setTypedWordInputs(newInputs);
      } else {
        // 普通字母
        handleTypedWordChange(activeTypingWordIndex, curInput + key.toLowerCase());
      }
    } else {
      // 整句输入模式
      if (key === 'BACKSPACE') {
        setFullTypedSentence(prev => prev.slice(0, -1));
      } else if (key === 'SPACE') {
        setFullTypedSentence(prev => prev + ' ');
      } else if (key === 'CLEAR') {
        setFullTypedSentence('');
      } else {
        setFullTypedSentence(prev => prev + key);
      }
      setTypingCheckedState('idle');
    }
  };

  const handleRevealWordHint = (index: number) => {
    playClickSound();
    unlockMobileAudio();
    setRevealedHints(prev => ({ ...prev, [index]: true }));
    const word = targetWords[index];
    if (word) {
      speakText(word, { lang: 'en-US' });
    }
  };

  const handleCheckTyping = () => {
    if (!currentSentencePattern) return;
    unlockMobileAudio();

    let isAllCorrect = false;
    if (typingModeType === 'slots') {
      const userWords = typedWordInputs.map(w => (w || '').trim().toLowerCase());
      const targetCleanWords = targetWords.map(w => w.trim().toLowerCase());
      isAllCorrect = userWords.length === targetCleanWords.length &&
        userWords.every((w, i) => w === targetCleanWords[i]);
    } else {
      const cleanUser = fullTypedSentence.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanTarget = currentSentencePattern.targetSentence.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      isAllCorrect = cleanUser === cleanTarget;
    }

    if (isAllCorrect) {
      setTypingCheckedState('correct');
      playEmeraldSound();
      playLevelUpSound();
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      onAwardEmeralds(15, 35, '3x3句子工坊键盘拼写通关');
      speakText(currentSentencePattern.targetSentence, { lang: 'en-US' });
    } else {
      setTypingCheckedState('wrong');
      playBlockBreakSound();
    }
  };

  const handleResetTyping = () => {
    playBlockBreakSound();
    setTypedWordInputs(new Array(targetWords.length).fill(''));
    setActiveTypingWordIndex(0);
    setFullTypedSentence('');
    setRevealedHints({});
    setTypingCheckedState('idle');
  };

  // ========== 怪物擂台交互 ==========
  const currentBoss = bossList[activeBossIndex];
  const currentQuestion = currentBoss?.questions[currentQuestionIndex];

  // 动态乱序选项，防止答案固定为 A
  useEffect(() => {
    if (currentQuestion && currentQuestion.options) {
      const originalOptions = currentQuestion.options.map((opt, idx) => ({
        text: opt,
        isCorrect: idx === currentQuestion.correctIndex
      }));
      // 随机乱序 (Fisher-Yates)
      const shuffled = [...originalOptions].sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
      setSelectedOption(null);
      setBattleFeedback(null);
    }
  }, [activeBossIndex, currentQuestionIndex, bossList]);

  const handleAnswerBossQuestion = (optionIndex: number) => {
    if (selectedOption !== null || !currentQuestion || isBossDefeated || !shuffledOptions[optionIndex]) return;

    unlockMobileAudio();
    setSelectedOption(optionIndex);
    const chosenOption = shuffledOptions[optionIndex];
    const isCorrect = chosenOption.isCorrect;

    const correctIndexInShuffled = shuffledOptions.findIndex(o => o.isCorrect);
    const correctLetter = correctIndexInShuffled >= 0 ? String.fromCharCode(65 + correctIndexInShuffled) : 'A';

    if (isCorrect) {
      playEmeraldSound();
      setAttackAnimation(true);
      setTimeout(() => setAttackAnimation(false), 800);

      // 扣血
      const newHp = Math.max(0, currentBoss.currentHp - 1);
      const updatedBossList = [...bossList];
      updatedBossList[activeBossIndex] = { ...currentBoss, currentHp: newHp };
      setBossList(updatedBossList);

      setBattleFeedback({
        isCorrect: true,
        show: true,
        msg: `💥 暴击命中！斩落 1 点生命值！${currentQuestion.explanation}`
      });

      if (newHp === 0) {
        setIsBossDefeated(true);
        playLevelUpSound();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        onAwardEmeralds(currentBoss.rewardEmeralds, currentBoss.rewardXp, `击败擂台怪物: ${currentBoss.name}`);
      }
    } else {
      playBlockBreakSound();
      setBattleFeedback({
        isCorrect: false,
        show: true,
        msg: `🛡️ 格挡！怪物发起了反击！正确答案是选项 ${correctLetter} (${currentQuestion.options[currentQuestion.correctIndex]})。${currentQuestion.explanation}`
      });
    }
  };

  const handleNextBossQuestion = () => {
    playClickSound();
    setSelectedOption(null);
    setBattleFeedback(null);
    if (currentBoss && currentQuestionIndex < currentBoss.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleResetBossBattle = (bossIdx: number) => {
    playClickSound();
    const updated = [...bossList];
    updated[bossIdx] = { ...updated[bossIdx], currentHp: updated[bossIdx].maxHp };
    setBossList(updated);
    setActiveBossIndex(bossIdx);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setBattleFeedback(null);
    setIsBossDefeated(false);
  };

  return (
    <div id="crafting_lab_container" className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 顶部导航面板 */}
      <div id="crafting_lab_header" className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-md text-2xl">
                🛠️
              </span>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2 font-mono">
                  MINECRAFT 合成实验室
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-sans font-medium">
                    深度认知工坊
                  </span>
                </h1>
                <p className="text-sm text-slate-300 mt-0.5">
                  严密契合课程体系 · 构词拆解 · 3x3 语法句子重组 · 5阶擂台实战
                </p>
              </div>
            </div>
          </div>

          {/* 选项卡切换 */}
          <div id="crafting_subtabs" className="flex items-center bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 gap-1.5 self-start md:self-auto">
            <button
              id="tab_bench_btn"
              onClick={() => { playClickSound(); setActiveSubTab('bench'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeSubTab === 'bench'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Hammer className="w-4 h-4" />
              3x3 物品合成台
            </button>
            <button
              id="tab_sentences_btn"
              onClick={() => { playClickSound(); setActiveSubTab('sentences'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeSubTab === 'sentences'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              3x3 语法句子工坊
            </button>
            <button
              id="tab_boss_btn"
              onClick={() => { playClickSound(); setActiveSubTab('boss'); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeSubTab === 'boss'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sword className="w-4 h-4" />
              ⚔️ 怪物英语擂台
            </button>
          </div>
        </div>
      </div>

      {/* ======================= 子板块 1: 3x3 物品合成台 ======================= */}
      {activeSubTab === 'bench' && (
        <div id="subtab_bench_content" className="space-y-6">
          {/* 模式选择与配方速查快捷栏 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 font-mono px-2 py-1 bg-slate-950 rounded-lg border border-slate-800">
                合成模式:
              </span>
              <button
                id="mode_nce_words_btn"
                onClick={() => {
                  playClickSound();
                  setBenchMode('nce_words');
                  setRecipeTypeFilter('nce_words');
                  setPaletteCategory('all');
                  if (selectedInspectRecipe?.recipeType !== 'nce_word') {
                    setSelectedInspectRecipe(NCE_WORD_CRAFTING_RECIPES[0] || null);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  benchMode === 'nce_words'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/40 scale-105'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                📘 新概念单词构词合成 ({NCE_WORD_CRAFTING_RECIPES.length})
              </button>
              <button
                id="mode_mc_gear_btn"
                onClick={() => {
                  playClickSound();
                  setBenchMode('mc_gear');
                  setRecipeTypeFilter('mc_gear');
                  setPaletteCategory('all');
                  if (selectedInspectRecipe?.recipeType === 'nce_word') {
                    setSelectedInspectRecipe(MC_EQUIPMENT_RECIPES[0] || null);
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  benchMode === 'mc_gear'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-900/40 scale-105'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Sword className="w-3.5 h-3.5" />
                ⚔️ MC 原版装备合成 ({MC_EQUIPMENT_RECIPES.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="open_handbook_btn"
                onClick={() => {
                  playClickSound();
                  setShowHandbookModal(true);
                }}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                📖 确定的合成配方速查手册 ({RECIPES.length})
              </button>
            </div>
          </div>

          {/* 🔄 词汇库与配方库联动状态条 */}
          <div className="p-3 bg-slate-900/80 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">配方宝典与词汇库实时打通：</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    词汇库已掌握 {masteredNceRecipesCount}/40 词
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-amber-400 font-mono font-bold">
                    工作台已合成 {craftedNceRecipesCount}/40 词
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  配方宝典收录新概念全册支持「3×3 复合构词拆解」的核心生词，合成成功自动同步点亮词汇库掌握勋章！
                </p>
              </div>
            </div>
            {onNavigateToVocab && (
              <button
                onClick={() => {
                  playClickSound();
                  onNavigateToVocab();
                }}
                className="shrink-0 px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>查阅全量词汇库 (900+词)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 💡 3步新手合成向导 (帮助用户彻底搞懂怎么合成) */}
          {showGuideBanner && (
            <div className="p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-emerald-950/40 border border-amber-500/30 rounded-2xl relative shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>💡 3 步教你怎么合成？（每个单词均有 100% 确定的合成配方公式！）</span>
                </div>
                <button
                  onClick={() => setShowGuideBanner(false)}
                  className="text-slate-500 hover:text-slate-300 text-xs p-1"
                  title="暂时隐藏"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-bold text-slate-200">第一步：选择目标生词或装备</p>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      在右侧【配方宝典库】中点击你想合成的单词（如 <span className="text-amber-300 font-mono">handbag</span> 手提包）。
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-bold text-slate-200">第二步：参照【虚影】放入材料</p>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      工作台内会显示<span className="text-emerald-300 font-bold">虚影辅助线</span>，从下方点击材料填入，或直接点【⚡ 一键装填】！
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-bold text-slate-200">第三步：产物点亮，立即合成！</p>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      材料齐全后产物格即刻点亮，点击【立即合成并收录】，纯正音标朗读并获得 <span className="text-emerald-400 font-bold">+8 绿宝石</span>！
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 左侧：3x3 网格与操作台 */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-base font-mono">
                    <Layers className="w-5 h-5" />
                    <span>3×3 原版合成网格 (Crafting Grid)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedInspectRecipe && (
                      <button
                        id="grid_quick_fill_btn"
                        onClick={() => handleQuickFillRecipe(selectedInspectRecipe)}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-amber-500/30"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        一键装填当前配方
                      </button>
                    )}
                    <button
                      id="clear_bench_btn"
                      onClick={handleClearGrid}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      清空网格
                    </button>
                  </div>
                </div>

                {/* 3x3 与合成输出区 */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6 bg-slate-950/60 rounded-xl border border-slate-800/80 p-4">
                  {/* 3x3 网格 */}
                  <div className="grid grid-cols-3 gap-2.5 p-3 bg-stone-900 rounded-xl border-4 border-stone-700 shadow-inner">
                    {gridSlots.map((slot, index) => {
                      const ghostItem = selectedInspectRecipe?.gridPattern[index];
                      const isSlotActive = selectedSlotIndex === index;

                      return (
                        <button
                          key={`slot_${index}`}
                          id={`grid_slot_${index}`}
                          onClick={() => handleGridSlotClick(index)}
                          className={`w-18 h-18 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center transition-all relative select-none ${
                            isSlotActive
                              ? 'bg-stone-800 ring-2 ring-amber-400 shadow-lg scale-105 z-10'
                              : slot
                              ? 'bg-stone-800 hover:bg-stone-700'
                              : 'bg-stone-950/80 hover:bg-stone-900 border border-stone-800'
                          }`}
                        >
                          {slot ? (
                            NCE_WORD_PARTS_MAP[slot] ? (
                              <div className="flex flex-col items-center justify-center p-1 leading-none select-none text-center">
                                <span className="text-xl sm:text-2xl mb-1">{NCE_WORD_PARTS_MAP[slot].icon}</span>
                                <span className="text-xs sm:text-sm font-black font-mono text-amber-300 tracking-tight">{slot}</span>
                                <span className="text-[10px] text-slate-300 font-sans mt-0.5">{NCE_WORD_PARTS_MAP[slot].zh}</span>
                              </div>
                            ) : (
                              <span className="text-3xl transform hover:scale-110 transition-transform">{slot}</span>
                            )
                          ) : ghostItem ? (
                            /* 虚影引导线 (告诉用户该槽位应该填入什么材料) */
                            <div className="flex flex-col items-center justify-center p-1 text-center opacity-70 hover:opacity-100 transition-opacity">
                              {NCE_WORD_PARTS_MAP[ghostItem] ? (
                                <>
                                  <span className="text-xs font-mono font-bold border border-dashed border-amber-500/60 px-1 py-0.5 rounded text-amber-300 bg-amber-950/40">
                                    {ghostItem}
                                  </span>
                                  <span className="text-[9px] text-amber-400/90 mt-0.5 font-sans">
                                    {NCE_WORD_PARTS_MAP[ghostItem].zh}
                                  </span>
                                </>
                              ) : (
                                <span className="text-2xl opacity-40 filter grayscale">{ghostItem}</span>
                              )}
                              <span className="text-[8px] text-slate-500 mt-0.5 font-mono">虚影引导</span>
                            </div>
                          ) : (
                            <span className="text-stone-700 text-xs font-mono select-none">{index + 1}</span>
                          )}

                          {isSlotActive && (
                            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-stone-900" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* 箭头指示 */}
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <ArrowRight className="w-8 h-8 hidden sm:block text-amber-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold mt-1 text-slate-400">CRAFT</span>
                  </div>

                  {/* 合成输出口 */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      id="craft_output_slot"
                      className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-4 transition-all relative ${
                        matchedRecipe
                          ? 'bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border-amber-400 shadow-lg shadow-amber-500/20 scale-105 animate-bounce-subtle'
                          : 'bg-slate-950 border-slate-800 text-slate-600'
                      }`}
                    >
                      {matchedRecipe ? (
                        <div className="flex flex-col items-center text-center px-1">
                          <span className="text-3xl">{matchedRecipe.mcIcon}</span>
                          <span className="text-[11px] font-black text-amber-300 mt-1 max-w-[84px] truncate">
                            {matchedRecipe.nameEn}
                          </span>
                          <span className="text-[9px] text-slate-300 max-w-[84px] truncate">
                            {matchedRecipe.nameZh}
                          </span>
                        </div>
                      ) : (
                        <div className="text-center text-slate-600 text-xs font-mono">
                          <span>EMPTY</span>
                        </div>
                      )}
                    </div>

                    <button
                      id="execute_craft_btn"
                      disabled={!matchedRecipe}
                      onClick={handleCraftItem}
                      className={`w-full px-5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                        matchedRecipe
                          ? 'bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white cursor-pointer hover:scale-105 active:scale-95 shadow-emerald-900/40'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <Hammer className="w-4 h-4" />
                      {matchedRecipe ? '立即合成并收录 (+8 💎)' : '等待摆齐配方材料'}
                    </button>
                  </div>
                </div>

                {/* 当前配方确定公式提示栏 */}
                {selectedInspectRecipe && (
                  <div className="mt-4 p-3 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-amber-400 flex items-center gap-1 font-mono">
                        <Check className="w-3.5 h-3.5" />
                        当前目标配方公式:
                      </span>
                      <div className="flex items-center gap-1 font-mono">
                        {selectedInspectRecipe.requiredIngredients.map((ing, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2 py-0.5 bg-slate-900 text-slate-200 rounded border border-slate-700">
                              {ing.icon} {ing.name}
                            </span>
                            {idx < selectedInspectRecipe.requiredIngredients.length - 1 && (
                              <span className="text-slate-500 font-bold">+</span>
                            )}
                          </React.Fragment>
                        ))}
                        <span className="text-amber-400 font-bold">➔</span>
                        <span className="px-2 py-0.5 bg-amber-950/40 text-amber-300 font-bold rounded border border-amber-500/40">
                          {selectedInspectRecipe.mcIcon} {selectedInspectRecipe.nameEn} ({selectedInspectRecipe.nameZh})
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleQuickFillRecipe(selectedInspectRecipe)}
                      className="text-amber-400 hover:text-amber-300 font-bold text-xs flex items-center gap-1 self-end sm:self-auto underline decoration-dotted"
                    >
                      <Zap className="w-3 h-3" />
                      填入网格
                    </button>
                  </div>
                )}

                {/* 成功合成特效 */}
                {craftSuccessEffect && matchedRecipe && (
                  <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>✨ 合成成功！获得 {matchedRecipe.nameEn} · {matchedRecipe.nameZh}！(+8 绿宝石, +20 经验)</span>
                    </div>
                    <button
                      onClick={() => handlePlayVoice(matchedRecipe.nameEn)}
                      className="p-1 hover:bg-emerald-500/30 rounded-lg text-emerald-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* 下方：材料选择调色板 */}
              <div id="materials_palette_section" className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                    <Sparkle className="w-4 h-4 text-amber-400" />
                    <span>
                      材料调色板 ({benchMode === 'nce_words' ? '新概念英语构词部件库' : 'Minecraft 原版材料库'})
                    </span>
                  </div>
                  {/* 分类过滤器 */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs flex-wrap">
                    {benchMode === 'nce_words' ? (
                      <>
                        <button
                          onClick={() => setPaletteCategory('all')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'all' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          全部部件 ({NCE_PALETTE_MATERIALS.length})
                        </button>
                        <button
                          onClick={() => setPaletteCategory('items')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'items' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          日常服饰
                        </button>
                        <button
                          onClick={() => setPaletteCategory('places')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'places' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          场所建筑
                        </button>
                        <button
                          onClick={() => setPaletteCategory('people')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'people' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          身份人物
                        </button>
                        <button
                          onClick={() => setPaletteCategory('health')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'health' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          健康饮食
                        </button>
                        <button
                          onClick={() => setPaletteCategory('time')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'time' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          时间方位
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setPaletteCategory('all')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'all' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          全部材料
                        </button>
                        <button
                          onClick={() => setPaletteCategory('wood_stone')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'wood_stone' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          木石
                        </button>
                        <button
                          onClick={() => setPaletteCategory('minerals')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'minerals' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          矿物
                        </button>
                        <button
                          onClick={() => setPaletteCategory('mobs')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'mobs' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          掉落物
                        </button>
                        <button
                          onClick={() => setPaletteCategory('food_farm')}
                          className={`px-2.5 py-1 rounded-md transition-colors ${
                            paletteCategory === 'food_farm' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          食材
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                  {filteredPalette.map((mat) => (
                    <button
                      key={mat.id}
                      id={`palette_item_${mat.id}`}
                      onClick={() => handleSelectPaletteItem(mat)}
                      className="p-2.5 bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/50 rounded-xl flex flex-col items-center gap-1 transition-all group active:scale-95 text-center"
                      title={`${mat.nameEn} (${mat.name})`}
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform">{mat.icon}</span>
                      <span className="text-[11px] font-bold text-slate-200 max-w-[70px] truncate font-mono">{mat.nameEn}</span>
                      <span className="text-[10px] text-slate-400 max-w-[70px] truncate">{mat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧：深度认知词卡与配方图鉴 */}
            <div className="lg:col-span-5 space-y-6">
              {/* 深度词汇与构词法解析卡片 */}
              {selectedInspectRecipe && (
                <div id="recipe_inspect_card" className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-amber-500/30 shadow-xl relative overflow-hidden">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                        {selectedInspectRecipe.mcIcon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold text-white font-mono">{selectedInspectRecipe.nameEn}</h2>
                          <button
                            id="play_inspect_voice_btn"
                            onClick={() => handlePlayVoice(selectedInspectRecipe.nameEn)}
                            className="p-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-lg transition-colors"
                            title="听发音"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-amber-400 font-mono mt-0.5">{selectedInspectRecipe.phonetic}</p>
                        <p className="text-xs text-slate-300 mt-0.5">{selectedInspectRecipe.nameZh}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 font-bold font-mono">
                        {selectedInspectRecipe.recipeType === 'nce_word'
                          ? `新概念第 ${selectedInspectRecipe.requiredLessonId || 1} 课核心词`
                          : `MC原版装备 · L${selectedInspectRecipe.requiredLessonId || 1}`}
                      </span>
                      {selectedInspectRecipe.recipeType === 'nce_word' && onMasterWord && (
                        <div className="flex items-center gap-1.5 mt-2">
                          {(() => {
                            const isMasteredInVocab = (profile.masteredWords || []).some(
                              w => w.toLowerCase() === selectedInspectRecipe.nameEn.toLowerCase()
                            );
                            return (
                              <>
                                <button
                                  onClick={() => {
                                    playClickSound();
                                    onMasterWord(selectedInspectRecipe.nameEn);
                                  }}
                                  className={`text-[11px] px-2.5 py-1 rounded-lg flex items-center gap-1 border transition-all ${
                                    isMasteredInVocab
                                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900/60'
                                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold border-amber-400 shadow'
                                  }`}
                                  title="标记已掌握并同步收录至核心词汇宝库"
                                >
                                  <Star className={`w-3 h-3 ${isMasteredInVocab ? 'text-emerald-400 fill-emerald-400' : 'text-stone-950'}`} />
                                  {isMasteredInVocab ? '词库已掌握 ✔️' : '收录至词汇库'}
                                </button>
                                {onNavigateToVocab && (
                                  <button
                                    onClick={() => {
                                      playClickSound();
                                      onNavigateToVocab();
                                    }}
                                    className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
                                    title="前往核心词汇宝库查看全量单词与练习口语"
                                  >
                                    <BookOpen className="w-3 h-3 text-cyan-400" />
                                    <span>去词库</span>
                                  </button>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 确定的合成公式展示 */}
                  <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 mb-3">
                    <span className="text-[11px] text-amber-400 font-bold block mb-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      确定的合成配方公式:
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap font-mono text-xs">
                      {selectedInspectRecipe.requiredIngredients.map((ing, idx) => (
                        <React.Fragment key={idx}>
                          <span className="px-2 py-0.5 bg-slate-900 border border-slate-700 text-slate-200 rounded flex items-center gap-1">
                            <span>{ing.icon}</span>
                            <span>{ing.name}</span>
                          </span>
                          {idx < selectedInspectRecipe.requiredIngredients.length - 1 && (
                            <span className="text-slate-500 font-bold">+</span>
                          )}
                        </React.Fragment>
                      ))}
                      <span className="text-amber-400 font-bold">➔</span>
                      <span className="px-2 py-0.5 bg-amber-950/40 border border-amber-500/40 text-amber-300 font-bold rounded">
                        {selectedInspectRecipe.mcIcon} {selectedInspectRecipe.nameEn} ({selectedInspectRecipe.nameZh})
                      </span>
                    </div>
                  </div>

                  {/* 构词法与语法解析 */}
                  <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                    {selectedInspectRecipe.wordBreakdown && (
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                        <span className="font-bold text-amber-400 block mb-1 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          构词法拆解与词根记忆
                        </span>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {selectedInspectRecipe.wordBreakdown}
                        </p>
                      </div>
                    )}

                    {selectedInspectRecipe.grammarTip && (
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                        <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1">
                          <Info className="w-3.5 h-3.5" />
                          语法搭配与实用句型
                        </span>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {selectedInspectRecipe.grammarTip}
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-amber-300">游戏实战例句</span>
                        <button
                          onClick={() => handlePlayVoice(selectedInspectRecipe.sampleSentence)}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 text-[10px]"
                        >
                          <Volume2 className="w-3 h-3" />
                          朗读例句
                        </button>
                      </div>
                      <p className="text-slate-200 font-mono italic">{selectedInspectRecipe.sampleSentence}</p>
                      <p className="text-slate-400 mt-1">{selectedInspectRecipe.sampleTranslation}</p>
                    </div>
                  </div>

                  {/* 一键装填到 3x3 */}
                  <button
                    id="quick_fill_bench_btn"
                    onClick={() => handleQuickFillRecipe(selectedInspectRecipe)}
                    className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4" />
                    ⚡ 一键将本配方材料填入 3×3 工作台
                  </button>
                </div>
              )}

              {/* 配方图鉴库 */}
              <div id="recipe_book_section" className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>配方宝典库 ({filteredRecipes.length})</span>
                  </div>
                  <input
                    type="text"
                    placeholder="搜索配方/单词..."
                    value={recipeSearch}
                    onChange={(e) => setRecipeSearch(e.target.value)}
                    className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 w-32 sm:w-40"
                  />
                </div>

                {/* 筛选标签 */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setRecipeTypeFilter('nce_words')}
                    className={`flex-1 py-1 rounded-md transition-colors font-bold ${
                      recipeTypeFilter === 'nce_words' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    📘 新概念生词 ({NCE_WORD_CRAFTING_RECIPES.length})
                  </button>
                  <button
                    onClick={() => setRecipeTypeFilter('mc_gear')}
                    className={`flex-1 py-1 rounded-md transition-colors font-bold ${
                      recipeTypeFilter === 'mc_gear' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    ⚔️ MC装备 ({MC_EQUIPMENT_RECIPES.length})
                  </button>
                  <button
                    onClick={() => setRecipeTypeFilter('all')}
                    className={`px-3 py-1 rounded-md transition-colors font-bold ${
                      recipeTypeFilter === 'all' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    全部
                  </button>
                </div>

                {recipeTypeFilter === 'nce_words' && (
                  <div className="flex items-center justify-between text-[11px] bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      词库同步: 已掌握 <strong className="text-emerald-300 font-mono font-bold">{masteredNceRecipesCount}</strong> / 40
                    </span>
                    {onNavigateToVocab && (
                      <button
                        onClick={() => {
                          playClickSound();
                          onNavigateToVocab();
                        }}
                        className="text-amber-400 hover:text-amber-300 flex items-center gap-0.5 font-bold transition-colors"
                      >
                        <span>全量词库 (900+)</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {filteredRecipes.map((recipe) => {
                    const unlocked = isRecipeUnlocked(recipe);
                    const paywalled = isRecipePaywall(recipe);
                    const isCrafted = (profile.unlockedCraftingIds || []).includes(recipe.id);
                    const isNce = recipe.recipeType === 'nce_word';
                    const isMasteredInVocab = isNce && (profile.masteredWords || []).some(
                      w => w.toLowerCase() === recipe.nameEn.toLowerCase()
                    );

                    return (
                      <div
                        key={recipe.id}
                        onClick={() => {
                          playClickSound();
                          setSelectedInspectRecipe(recipe);
                          if (isNce && benchMode !== 'nce_words') {
                            setBenchMode('nce_words');
                          } else if (!isNce && benchMode !== 'mc_gear') {
                            setBenchMode('mc_gear');
                          }
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          selectedInspectRecipe?.id === recipe.id
                            ? 'bg-amber-950/40 border-amber-500/60 shadow-md'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{recipe.mcIcon}</span>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-sm text-white font-mono">{recipe.nameEn}</span>
                              {isCrafted && (
                                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                                  已合成
                                </span>
                              )}
                              {isNce && (
                                <span
                                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                                    isMasteredInVocab
                                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                                  }`}
                                  title={isMasteredInVocab ? '已在词汇宝库标记为已掌握' : '尚未在词汇宝库掌握'}
                                >
                                  {isMasteredInVocab ? '🌟 词库已掌握' : '📖 待掌握'}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <p className="text-xs text-slate-400">{recipe.nameZh}</p>
                              <span className="text-[10px] text-slate-500 font-mono">
                                ({recipe.requiredIngredients.map(i => i.name.split(' ')[0]).join('+')})
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {isNce ? (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                              L{recipe.requiredLessonId || 1}
                            </span>
                          ) : unlocked ? (
                            <span className="text-xs text-slate-400 font-mono font-medium">MC</span>
                          ) : paywalled ? (
                            <span className="text-xs text-amber-400 flex items-center gap-1 font-mono">
                              <Crown className="w-3 h-3" /> VIP
                            </span>
                          ) : (
                            <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                              <Lock className="w-3 h-3" /> L{recipe.requiredLessonId}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= 子板块 2: 3x3 语法句子工坊 ======================= */}
      {activeSubTab === 'sentences' && (
        <div id="subtab_sentences_content" className="space-y-6">
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            {/* 顶部标题与模式切换 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-mono font-bold">
                    {dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length]?.title || '第 1 课'}
                  </span>
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <span>3×3 语法拼装机 · 句子工坊</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      句法 & 拼写训练
                    </span>
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  支持积木语序组装与键盘拼写双模式，全方位锻炼语感与单词拼写能力！
                </p>
              </div>

              {/* 模式选择 Pill Bar 与换题 */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      playClickSound();
                      setSentencePracticeMode('blocks');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                      sentencePracticeMode === 'blocks'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🧩 积木拼装</span>
                  </button>
                  <button
                    onClick={() => {
                      playClickSound();
                      setSentencePracticeMode('typing');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                      sentencePracticeMode === 'typing'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-black'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Keyboard className="w-3.5 h-3.5" />
                    <span>⌨️ 键盘拼写</span>
                    <span className="text-[9px] bg-amber-400/30 px-1 rounded">拼写</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-mono">
                    {((currentSentenceIndex % dynamicSentencePatterns.length) + 1)} / {dynamicSentencePatterns.length}
                  </span>
                  <button
                    id="sentence_next_btn"
                    onClick={handleNextSentence}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700 transition-colors"
                  >
                    换一题
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 句式蓝图与目标中文 */}
            {dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length] && (
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">
                    目标句型中文含义
                  </span>
                  <p className="text-base font-bold text-white mt-1">
                    “{dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length].translation}”
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    {dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length].grammarBlueprint}
                  </p>
                </div>

                <button
                  onClick={() => handlePlayVoice(dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length].targetSentence)}
                  className="self-start sm:self-auto px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  听例句发音
                </button>
              </div>
            )}

            {/* ---------------- 模式 A: 积木拼装模式 (Block Crafting) ---------------- */}
            {sentencePracticeMode === 'blocks' && (
              <div className="space-y-6">
                {/* 用户句子装配槽区 */}
                <div className="p-6 bg-stone-900/90 rounded-2xl border-2 border-dashed border-stone-700 min-h-[120px] flex flex-wrap items-center justify-center gap-3 relative">
                  {userSentenceSlots.length === 0 ? (
                    <div className="text-center text-stone-500 text-sm font-medium">
                      点击下方词块按正确语序放入这里...
                    </div>
                  ) : (
                    userSentenceSlots.map((slot, idx) => (
                      <button
                        key={`slot_${idx}`}
                        onClick={() => handleRemoveSentenceSlot(idx)}
                        className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold font-mono text-sm shadow-md hover:bg-amber-800 transition-all flex items-center gap-2 group active:scale-95"
                        title="点击取回"
                      >
                        <span>{slot.text}</span>
                        <span className="text-xs text-amber-200/60 group-hover:text-amber-100">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* 校验反馈与解析 */}
                {sentenceCheckedState === 'correct' && (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">🎉 完美合成！语序与句法完全正确！(+10 💎, +25 XP)</p>
                        <p className="text-xs text-emerald-400/80 mt-0.5">
                          {dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length]?.explanation}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNextSentence}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shrink-0 shadow-md transition-colors"
                    >
                      挑战下一句
                    </button>
                  </div>
                )}

                {sentenceCheckedState === 'wrong' && (
                  <div className="p-4 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 flex items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <p className="text-xs font-medium">
                        语序有误，请注意主谓宾结构与连系动词位置，再试一次吧！
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        playBlockBreakSound();
                        setUserSentenceSlots([]);
                        setSentenceCandidatePool(prev => prev.map(c => ({ ...c, used: false })));
                        setSentenceCheckedState('idle');
                      }}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
                    >
                      重置清空
                    </button>
                  </div>
                )}

                {/* 词块候选池 */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 block">可用语法积木池：</span>
                  <div className="flex flex-wrap gap-3">
                    {sentenceCandidatePool.map((candidate) => (
                      <button
                        key={candidate.id}
                        disabled={candidate.used}
                        onClick={() => handleAddSentenceBlock(candidate)}
                        className={`px-4 py-2.5 rounded-xl font-bold font-mono text-sm transition-all shadow-sm ${
                          candidate.used
                            ? 'bg-slate-950 text-slate-600 border border-slate-900 cursor-not-allowed opacity-40'
                            : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-emerald-500/60 active:scale-95'
                        }`}
                      >
                        {candidate.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 底部按钮 */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      playBlockBreakSound();
                      setUserSentenceSlots([]);
                      setSentenceCandidatePool(prev => prev.map(c => ({ ...c, used: false })));
                      setSentenceCheckedState('idle');
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    清空重来
                  </button>
                  <button
                    disabled={userSentenceSlots.length === 0}
                    onClick={handleCheckSentence}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                      userSentenceSlots.length > 0
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40 cursor-pointer active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    校验句子合成
                  </button>
                </div>
              </div>
            )}

            {/* ---------------- 模式 B: 单词键盘拼写模式 (Spelling & Typing Mode) ---------------- */}
            {sentencePracticeMode === 'typing' && (
              <div className="space-y-6">
                {/* 拼写子模式选择 */}
                <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-bold">拼写方式：</span>
                    <button
                      onClick={() => {
                        playClickSound();
                        setTypingModeType('slots');
                      }}
                      className={`px-3 py-1 rounded-lg font-bold border transition-all ${
                        typingModeType === 'slots'
                          ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      🅰️ 逐词填空拼写 (推荐小朋友)
                    </button>
                    <button
                      onClick={() => {
                        playClickSound();
                        setTypingModeType('full');
                      }}
                      className={`px-3 py-1 rounded-lg font-bold border transition-all ${
                        typingModeType === 'full'
                          ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      🅱️ 整句键盘默写
                    </button>
                  </div>

                  <span className="text-[11px] text-amber-300 hidden sm:inline-block">
                    💡 提示：按空格键或回车可自动跳转下一词
                  </span>
                </div>

                {/* 逐词填空槽渲染 */}
                {typingModeType === 'slots' && (
                  <div className="space-y-4">
                    <div className="p-5 bg-stone-900/90 rounded-2xl border-2 border-dashed border-amber-600/40 min-h-[140px] flex flex-wrap items-center justify-center gap-3">
                      {targetWords.map((targetWord, idx) => {
                        const currentInput = typedWordInputs[idx] || '';
                        const isMatch = currentInput.toLowerCase() === targetWord.toLowerCase();
                        const isRevealed = revealedHints[idx];
                        const isActive = activeTypingWordIndex === idx;

                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveTypingWordIndex(idx)}
                            className={`p-2.5 rounded-xl border-2 transition-all flex flex-col items-center gap-1.5 cursor-pointer relative ${
                              isMatch
                                ? 'bg-emerald-950/60 border-emerald-500/80 ring-1 ring-emerald-400'
                                : isActive
                                ? 'bg-amber-950/50 border-amber-400 shadow-lg ring-2 ring-amber-400/60 scale-105'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {/* 序号与状态 */}
                            <div className="flex items-center justify-between w-full gap-2 text-[10px] font-mono text-slate-400">
                              <span className="font-bold">#{idx + 1}</span>
                              {isMatch ? (
                                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                                  <Check className="w-3 h-3" />
                                </span>
                              ) : (
                                <span className="text-slate-500">{targetWord.length} 字母</span>
                              )}
                            </div>

                            {/* 交互输入框 */}
                            <input
                              type="text"
                              value={currentInput}
                              onChange={(e) => handleTypedWordChange(idx, e.target.value)}
                              onKeyDown={(e) => handleWordKeyDown(e, idx)}
                              onFocus={() => setActiveTypingWordIndex(idx)}
                              placeholder={`${targetWord[0]}${'_'.repeat(Math.max(1, targetWord.length - 1))}`}
                              className={`w-28 sm:w-32 py-1.5 px-2 rounded-lg font-mono font-black text-center text-sm border transition-all outline-none ${
                                isMatch
                                  ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500'
                                  : isActive
                                  ? 'bg-slate-900 text-white border-amber-400'
                                  : 'bg-slate-900/80 text-slate-300 border-slate-700'
                              }`}
                            />

                            {/* 提示与发音辅助 */}
                            <div className="flex items-center gap-1 mt-0.5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRevealWordHint(idx);
                                }}
                                className="px-1.5 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] rounded font-mono font-bold flex items-center gap-0.5 transition-colors"
                                title="点击提示该词并朗读"
                              >
                                <Lightbulb className="w-2.5 h-2.5" />
                                <span>{isRevealed ? targetWord : '提示'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakText(targetWord, { lang: 'en-US' });
                                }}
                                className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] transition-colors"
                                title="听单个单词发音"
                              >
                                <Volume2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 整句默写框 */}
                {typingModeType === 'full' && (
                  <div className="space-y-3">
                    <div className="p-4 bg-stone-900/90 rounded-2xl border-2 border-stone-700 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>⌨️ 请在下方键入完整的英文句子：</span>
                        <button
                          onClick={() => handlePlayVoice(dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length].targetSentence)}
                          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>示范朗读</span>
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={fullTypedSentence}
                        onChange={(e) => {
                          setFullTypedSentence(e.target.value);
                          setTypingCheckedState('idle');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCheckTyping();
                          }
                        }}
                        placeholder="在此处敲击键盘拼写出完整的句子..."
                        className="w-full p-3 bg-slate-950 rounded-xl border border-slate-700 text-white font-mono text-base font-bold outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* 虚拟触控小键盘 (方便 iPad/平板触屏与低龄小朋友快速点按) */}
                <div className="p-3 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <span className="flex items-center gap-1 text-amber-300 font-bold">
                      <Keyboard className="w-3.5 h-3.5" />
                      <span>触控字母小键盘 (支持电脑物理键盘直接打字)：</span>
                    </span>
                    <span>当前输入词: #{activeTypingWordIndex + 1} ({targetWords[activeTypingWordIndex] || ''})</span>
                  </div>

                  {/* 第一排 Q-P */}
                  <div className="flex justify-center gap-1 sm:gap-1.5 flex-wrap">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => handleVirtualKeyPress(k)}
                        className="w-7 h-9 sm:w-9 sm:h-10 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-mono font-black text-sm rounded-lg border border-slate-700 active:scale-95 transition-all shadow-xs"
                      >
                        {k}
                      </button>
                    ))}
                  </div>

                  {/* 第二排 A-L */}
                  <div className="flex justify-center gap-1 sm:gap-1.5 flex-wrap">
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(k => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => handleVirtualKeyPress(k)}
                        className="w-7 h-9 sm:w-9 sm:h-10 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-mono font-black text-sm rounded-lg border border-slate-700 active:scale-95 transition-all shadow-xs"
                      >
                        {k}
                      </button>
                    ))}
                  </div>

                  {/* 第三排 Z-M & 辅助功能 */}
                  <div className="flex justify-center gap-1 sm:gap-1.5 flex-wrap">
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M', "'"].map(k => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => handleVirtualKeyPress(k)}
                        className="w-7 h-9 sm:w-9 sm:h-10 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white font-mono font-black text-sm rounded-lg border border-slate-700 active:scale-95 transition-all shadow-xs"
                      >
                        {k}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleVirtualKeyPress('BACKSPACE')}
                      className="px-2.5 h-9 sm:h-10 bg-rose-900/70 hover:bg-rose-800 text-rose-200 font-mono font-bold text-xs rounded-lg border border-rose-700 active:scale-95 transition-all flex items-center gap-1"
                      title="删除一个字母"
                    >
                      <span>⌫ 退格</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVirtualKeyPress('NEXT')}
                      className="px-2.5 h-9 sm:h-10 bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 font-mono font-bold text-xs rounded-lg border border-emerald-700 active:scale-95 transition-all"
                      title="空格或跳到下一个单词"
                    >
                      <span>␣ 下一词</span>
                    </button>
                  </div>
                </div>

                {/* 拼写校验反馈 */}
                {typingCheckedState === 'correct' && (
                  <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <p className="text-sm font-bold">🏆 拼写大师！所有单词与语序完全正确！(+15 💎, +35 XP)</p>
                        <p className="text-xs text-emerald-400/80 mt-0.5">
                          {dynamicSentencePatterns[currentSentenceIndex % dynamicSentencePatterns.length]?.explanation}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNextSentence}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shrink-0 shadow-md transition-colors"
                    >
                      挑战下一句
                    </button>
                  </div>
                )}

                {typingCheckedState === 'wrong' && (
                  <div className="p-4 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 flex items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <p className="text-xs font-medium">
                        拼写有少许误差，请检查高亮红框或点击「💡 提示」查看正确拼写！
                      </p>
                    </div>
                    <button
                      onClick={handleResetTyping}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
                    >
                      重置重来
                    </button>
                  </div>
                )}

                {/* 底部按钮 */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={handleResetTyping}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors"
                  >
                    清空重填
                  </button>
                  <button
                    onClick={handleCheckTyping}
                    className="px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-lg shadow-orange-900/30 cursor-pointer active:scale-95 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    提交拼写校验
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================= 子板块 3: 怪物英语擂台 (Mob Arena) ======================= */}
      {activeSubTab === 'boss' && (
        <div id="subtab_boss_content" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 左侧：擂台怪物列表 */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                怪物擂台通关阶梯
              </h3>
              <p className="text-xs text-slate-400">
                答对题目发动暴击斩击，清空怪物生命值即可赢取丰厚绿宝石与稀有宝藏！
              </p>
            </div>

            <div className="space-y-2.5">
              {bossList.map((boss, idx) => {
                const isSelected = activeBossIndex === idx;
                const isLocked = !hasLessonAccess(profile, 'vol1', boss.requiredLessonId);
                const isPaywalled = isLessonPaywallLocked(profile, 'vol1', boss.requiredLessonId);

                return (
                  <div
                    key={boss.id}
                    onClick={() => {
                      if (isLocked) {
                        if (isPaywalled && onOpenVipModal) {
                          onOpenVipModal();
                        }
                        return;
                      }
                      playClickSound();
                      setActiveBossIndex(idx);
                      setCurrentQuestionIndex(0);
                      setSelectedOption(null);
                      setBattleFeedback(null);
                      setIsBossDefeated(boss.currentHp === 0);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60'
                    } ${isLocked ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{boss.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm text-white">{boss.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{boss.title}</p>
                        </div>
                      </div>

                      {isLocked ? (
                        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                          <Lock className="w-3.5 h-3.5" /> L{boss.requiredLessonId}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-400 text-xs font-mono font-bold">
                          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                          <span>{boss.currentHp}/{boss.maxHp}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 右侧：战斗擂台与答题区 */}
          <div className="lg:col-span-8 space-y-6">
            {currentBoss && (
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
                {/* 擂台对决状态栏 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className={`text-5xl transition-transform ${attackAnimation ? 'scale-125 animate-bounce' : ''}`}>
                      {currentBoss.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white font-mono flex items-center gap-2">
                        {currentBoss.name}
                        {isBossDefeated && (
                          <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full">
                            已击败
                          </span>
                        )}
                      </h3>
                      {/* HP 血条 */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-40 sm:w-56 h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-red-600 rounded-full transition-all duration-500"
                            style={{ width: `${(currentBoss.currentHp / currentBoss.maxHp) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-rose-400">
                          {currentBoss.currentHp} / {currentBoss.maxHp} HP
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">通关赏金</span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        +{currentBoss.rewardEmeralds} 💎 / +{currentBoss.rewardXp} XP
                      </span>
                    </div>
                    {isBossDefeated && (
                      <button
                        onClick={() => handleResetBossBattle(activeBossIndex)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors border border-slate-700"
                      >
                        重新挑战
                      </button>
                    )}
                  </div>
                </div>

                {/* 战斗题目展示 */}
                {!isBossDefeated && currentQuestion ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-purple-400 font-mono">
                          回合 {currentQuestionIndex + 1} / {currentBoss.questions.length}
                        </span>
                        <span className="text-xs text-slate-400">选择正确答案发起斩击</span>
                      </div>
                      <p className="text-base font-bold text-white leading-relaxed">
                        {currentQuestion.question}
                      </p>
                    </div>

                    {/* 选项 */}
                    <div className="grid grid-cols-1 gap-2.5">
                      {(shuffledOptions.length > 0 ? shuffledOptions : currentQuestion.options.map(opt => ({ text: opt, isCorrect: false }))).map((optObj, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        const isCorrectOpt = optObj.isCorrect;
                        let optStyle = 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-200';

                        if (selectedOption !== null) {
                          if (isCorrectOpt) {
                            optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isChosen) {
                            optStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                          } else {
                            optStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={selectedOption !== null}
                            onClick={() => handleAnswerBossQuestion(optIdx)}
                            className={`p-3.5 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between ${optStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs font-bold">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{optObj.text}</span>
                            </div>
                            {selectedOption !== null && isCorrectOpt && (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* 战斗反馈 */}
                    {battleFeedback && (
                      <div
                        className={`p-4 rounded-xl border flex items-start justify-between gap-3 animate-fade-in ${
                          battleFeedback.isCorrect
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                            : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="text-xs font-bold">{battleFeedback.msg}</p>
                          {currentQuestion.grammarNote && (
                            <p className="text-[11px] opacity-80 mt-1">
                              💡 考点聚焦：{currentQuestion.grammarNote}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={handleNextBossQuestion}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shrink-0 border border-slate-700 transition-colors"
                        >
                          下一回合
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 通关胜利界面 */
                  <div className="p-8 bg-gradient-to-b from-amber-500/10 to-slate-950 rounded-2xl border border-amber-500/30 text-center space-y-4 animate-fade-in">
                    <span className="text-6xl animate-bounce inline-block">👑</span>
                    <h3 className="text-2xl font-black text-amber-300 font-mono">
                      VICTORY! 擂台通关大捷！
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      恭喜你成功击败了 {currentBoss.name}！不仅掌握了关键语法考点，还赢取了丰厚绿宝石与经验奖励！
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <button
                        onClick={() => handleResetBossBattle(activeBossIndex)}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        重新对决
                      </button>
                      {activeBossIndex < bossList.length - 1 && (
                        <button
                          onClick={() => {
                            playClickSound();
                            setActiveBossIndex(prev => prev + 1);
                            setCurrentQuestionIndex(0);
                            setSelectedOption(null);
                            setBattleFeedback(null);
                            setIsBossDefeated(false);
                          }}
                          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                        >
                          进军下一阶擂台 ➔
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {/* ======================= 确定的合成配方速查大辞典弹窗 ======================= */}
      {showHandbookModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            {/* 弹窗头部 */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>确定的合成配方速查大辞典</span>
                    <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-mono font-bold">
                      共 {RECIPES.length} 款确定配方
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    涵盖《新概念英语》全册核心生词构词配方与 Minecraft 原版生存装备图鉴，点击任意配方直接填入工作台！
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHandbookModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 过滤器与搜索 */}
            <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHandbookTab('nce_words')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    handbookTab === 'nce_words'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  📘 新概念生词 ({NCE_WORD_CRAFTING_RECIPES.length})
                </button>
                <button
                  onClick={() => setHandbookTab('mc_gear')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    handbookTab === 'mc_gear'
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Sword className="w-3.5 h-3.5" />
                  ⚔️ MC装备 ({MC_EQUIPMENT_RECIPES.length})
                </button>
                <button
                  onClick={() => setHandbookTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    handbookTab === 'all'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  🌟 全部 ({RECIPES.length})
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索单词 / 中文 / 材料 / 课文..."
                  value={handbookSearch}
                  onChange={(e) => setHandbookSearch(e.target.value)}
                  className="w-full sm:w-64 pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <BookOpen className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* 词库同步说明条 */}
            <div className="mx-4 mt-3 px-3 py-2 bg-slate-950/80 rounded-xl border border-emerald-500/30 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>词库同步状态：</strong>当前 40 个生词中已在词汇库掌握 <strong className="text-emerald-400 font-mono">{masteredNceRecipesCount}</strong> 个。全书 900+ 词汇已完整收录于「核心词汇宝库」。
                </span>
              </div>
              {onNavigateToVocab && (
                <button
                  onClick={() => {
                    setShowHandbookModal(false);
                    onNavigateToVocab();
                  }}
                  className="shrink-0 text-emerald-400 hover:text-emerald-300 text-[11px] font-bold flex items-center gap-0.5"
                >
                  <span>去词库学习</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* 配方列表 */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar">
              {filteredHandbookRecipes.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-sm">
                  未检索到匹配的合成配方
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredHandbookRecipes.map((r) => {
                    const isNce = r.recipeType === 'nce_word';
                    const isMasteredInVocab = isNce && (profile.masteredWords || []).some(
                      w => w.toLowerCase() === r.nameEn.toLowerCase()
                    );

                    return (
                      <div
                        key={`handbook_${r.id}`}
                        className="p-3.5 bg-slate-950/70 border border-slate-800/90 hover:border-amber-500/40 rounded-xl flex flex-col justify-between gap-2.5 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-2 bg-slate-900 rounded-lg border border-slate-800">
                              {r.mcIcon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white font-mono">{r.nameEn}</span>
                                <span className="text-xs text-amber-400 font-mono">{r.phonetic}</span>
                              </div>
                              <p className="text-xs text-slate-300 mt-0.5">{r.nameZh}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-wrap justify-end">
                            {isNce && (
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                                  isMasteredInVocab
                                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                                }`}
                              >
                                {isMasteredInVocab ? '🌟 词库已掌握' : '📖 待掌握'}
                              </span>
                            )}
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                                isNce
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              }`}
                            >
                              {isNce ? `第 ${r.requiredLessonId || 1} 课` : 'MC 原版'}
                            </span>
                          </div>
                        </div>

                        {/* 确定的配方公式 */}
                        <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-between gap-2 text-xs font-mono">
                          <div className="flex items-center gap-1 flex-wrap text-[11px]">
                            <span className="text-slate-500 text-[10px] font-sans">配方:</span>
                            {r.requiredIngredients.map((ing, idx) => (
                              <React.Fragment key={idx}>
                                <span className="px-1.5 py-0.5 bg-slate-950 text-slate-200 rounded border border-slate-800">
                                  {ing.icon} {ing.name}
                                </span>
                                {idx < r.requiredIngredients.length - 1 && (
                                  <span className="text-slate-500 font-bold">+</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          <button
                            onClick={() => {
                              handleQuickFillRecipe(r);
                              setShowHandbookModal(false);
                              setActiveSubTab('bench');
                            }}
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] rounded-md shrink-0 flex items-center gap-1 transition-colors shadow"
                          >
                            <Zap className="w-3 h-3" />
                            填入合成
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 弹窗底部 */}
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>💡 提示：点击任意配方的【填入合成】，系统将自动把所需词根与材料摆放到 3×3 工作台！</span>
              <button
                onClick={() => setShowHandbookModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
              >
                关闭手册
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CraftingLabView;
