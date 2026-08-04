import React, { useState, useEffect } from 'react';
import { UserProfile, VocabItem } from '../types';
import { MINECRAFT_VOCABULARY } from '../data/minecraftVocabData';
import { LESSONS_DATA } from '../data/lessonsData';
import {
  Hammer, Sparkles, Volume2, Trophy, Shield, Flame, CheckCircle, RefreshCw,
  Zap, ArrowRight, Sword, Lock, Star, ChevronRight, Play, Heart, Award
} from 'lucide-react';
import { playClickSound, playEmeraldSound, playBlockBreakSound, speakText, playLevelUpSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CraftingLabViewProps {
  profile: UserProfile;
  onAwardEmeralds: (emeralds: number, xp: number) => void;
  onMasterWord?: (word: string) => void;
}

interface CraftingRecipe {
  id: string;
  nameEn: string;
  nameZh: string;
  phonetic: string;
  mcIcon: string;
  category: string;
  requiredIngredients: { name: string; icon: string }[];
  gridPattern: (string | null)[]; // 9 slots
  sampleSentence: string;
  sampleTranslation: string;
  unlockedLevel: number;
}

const RECIPES: CraftingRecipe[] = [
  {
    id: 'recipe_crafting_table',
    nameEn: 'Crafting Table',
    nameZh: '工作台 / 合成台',
    phonetic: '/ˈkrɑːf.tɪŋ ˈteɪ.bəl/',
    mcIcon: '🪵',
    category: '基础装备',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' }
    ],
    gridPattern: ['🪵', '🪵', null, '🪵', '🪵', null, null, null, null],
    sampleSentence: 'Place four wood planks on the grid to craft a crafting table.',
    sampleTranslation: '在网格上放置四个木板即可合成工作台。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_stone_pickaxe',
    nameEn: 'Pickaxe',
    nameZh: '镐；石镐',
    phonetic: '/ˈpɪk.æks/',
    mcIcon: '⛏️',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Stick', icon: '🥢' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: ['🪨', '🪨', '🪨', null, '🥢', null, null, '🥢', null],
    sampleSentence: 'A durable stone pickaxe helps you mine iron and coal fast.',
    sampleTranslation: '耐用的石镐能帮你快速采掘铁矿和煤炭。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_diamond_sword',
    nameEn: 'Diamond Sword',
    nameZh: '钻石剑',
    phonetic: '/ˈdaɪə.mənd sɔːd/',
    mcIcon: '🗡️',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Diamond', icon: '💎' },
      { name: 'Diamond', icon: '💎' },
      { name: 'Stick', icon: '🥢' }
    ],
    gridPattern: [null, '💎', null, null, '💎', null, null, '🥢', null],
    sampleSentence: 'The diamond sword deals heavy attack damage to monsters.',
    sampleTranslation: '钻石剑能对怪物造成巨大的攻击伤害。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_furnace',
    nameEn: 'Furnace',
    nameZh: '熔炉；炼钢炉',
    phonetic: '/ˈfɜː.nɪs/',
    mcIcon: '🧰',
    category: '基础装备',
    requiredIngredients: [
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' },
      { name: 'Cobblestone', icon: '🪨' }
    ],
    gridPattern: ['🪨', '🪨', '🪨', '🪨', null, '🪨', '🪨', '🪨', '🪨'],
    sampleSentence: 'Smelt raw iron in the furnace with coal.',
    sampleTranslation: '在熔炉里使用煤炭熔炼粗铁。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_chest',
    nameEn: 'Chest',
    nameZh: '箱子；宝箱',
    phonetic: '/tʃest/',
    mcIcon: '📦',
    category: '存储器具',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' }
    ],
    gridPattern: ['🪵', '🪵', '🪵', '🪵', null, '🪵', '🪵', '🪵', '🪵'],
    sampleSentence: 'Store your emeralds and diamonds inside a wooden chest.',
    sampleTranslation: '将你的绿宝石和钻石存放在木箱子里。',
    unlockedLevel: 1
  },
  {
    id: 'recipe_bed',
    nameEn: 'Bed',
    nameZh: '床；复活点',
    phonetic: '/bed/',
    mcIcon: '🛏️',
    category: '居住生活',
    requiredIngredients: [
      { name: 'Wool', icon: '🧶' },
      { name: 'Wool', icon: '🧶' },
      { name: 'Wool', icon: '🧶' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Wood Plank', icon: '🪵' }
    ],
    gridPattern: ['🧶', '🧶', '🧶', '🪵', '🪵', '🪵', null, null, null],
    sampleSentence: 'Sleep in a red bed to skip night monsters.',
    sampleTranslation: '睡在红床上可以跳过夜间的怪物。',
    unlockedLevel: 2
  },
  {
    id: 'recipe_water_bucket',
    nameEn: 'Bucket',
    nameZh: '铁桶；水桶',
    phonetic: '/ˈbʌk.ɪt/',
    mcIcon: '🪣',
    category: '生存工具',
    requiredIngredients: [
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Iron Ingot', icon: '🪙' }
    ],
    gridPattern: ['🪙', null, '🪙', null, '🪙', null, null, null, null],
    sampleSentence: 'Fill an iron bucket with water to cool down lava.',
    sampleTranslation: '用铁桶装满水来浇灭岩浆。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_compass',
    nameEn: 'Compass',
    nameZh: '指南针',
    phonetic: '/ˈkʌm.pəs/',
    mcIcon: '🧭',
    category: '探险导航',
    requiredIngredients: [
      { name: 'Iron Ingot', icon: '🪙' },
      { name: 'Redstone', icon: '🔴' }
    ],
    gridPattern: [null, '🪙', null, '🪙', '🔴', '🪙', null, '🪙', null],
    sampleSentence: 'The compass needle always points towards your spawn point.',
    sampleTranslation: '指南针的红针总是指向你的出生复活点。',
    unlockedLevel: 3
  },
  {
    id: 'recipe_shield',
    nameEn: 'Shield',
    nameZh: '盾牌；防护罩',
    phonetic: '/ʃiːld/',
    mcIcon: '🛡️',
    category: '武器装备',
    requiredIngredients: [
      { name: 'Wood Plank', icon: '🪵' },
      { name: 'Iron Ingot', icon: '🪙' }
    ],
    gridPattern: ['🪵', '🪙', '🪵', '🪵', '🪵', '🪵', null, '🪵', null],
    sampleSentence: 'Raise your shield to block arrows fired by skeletons.',
    sampleTranslation: '举起盾牌挡下骷髅射出的箭头。',
    unlockedLevel: 4
  },
  {
    id: 'recipe_golden_apple',
    nameEn: 'Golden Apple',
    nameZh: '金苹果',
    phonetic: '/ˈɡəʊl.dən ˈæp.əl/',
    mcIcon: '🍎',
    category: '魔法食物',
    requiredIngredients: [
      { name: 'Apple', icon: '🍏' },
      { name: 'Gold Ingot', icon: '🌟' }
    ],
    gridPattern: ['🌟', '🌟', '🌟', '🌟', '🍏', '🌟', '🌟', '🌟', '🌟'],
    sampleSentence: 'Eat a golden apple to grant powerful health regeneration.',
    sampleTranslation: '吃下一颗金苹果获得强大的生命值恢复效果。',
    unlockedLevel: 5
  }
];

interface SentencePattern {
  id: string;
  title: string;
  targetSentence: string;
  translation: string;
  blocks: string[]; // Order of blocks
  distractors: string[]; // Distractor blocks
}

const SENTENCE_PATTERNS: SentencePattern[] = [
  {
    id: 's_01',
    title: '课文句型 01',
    targetSentence: 'Excuse me, is this your handbag?',
    translation: '请问，这是你的手提包吗？',
    blocks: ['Excuse me,', 'is this', 'your', 'handbag?'],
    distractors: ['my', 'that', 'pencil']
  },
  {
    id: 's_02',
    title: '课文句型 02',
    targetSentence: 'This is not my umbrella.',
    translation: '这不是我的雨伞。',
    blocks: ['This is', 'not', 'my', 'umbrella.'],
    distractors: ['her', 'your', 'hat']
  },
  {
    id: 's_03',
    title: '课文句型 03',
    targetSentence: 'Is he a miner or a builder?',
    translation: '他是一位矿工还是一位建筑师？',
    blocks: ['Is he', 'a miner', 'or', 'a builder?'],
    distractors: ['she', 'and', 'doctor']
  },
  {
    id: 's_04',
    title: 'MC句型 04',
    targetSentence: 'Look at that giant diamond block!',
    translation: '看那块巨大的钻石方块！',
    blocks: ['Look at', 'that', 'giant', 'diamond block!'],
    distractors: ['this', 'red', 'sword']
  },
  {
    id: 's_05',
    title: 'MC句型 05',
    targetSentence: 'Where is the secret chest in the cave?',
    translation: '山洞里的秘密宝箱在哪里？',
    blocks: ['Where is', 'the secret chest', 'in the cave?'],
    distractors: ['on', 'under', 'bed']
  }
];

interface Boss {
  id: string;
  name: string;
  nameZh: string;
  avatar: string;
  maxHp: number;
  currentHp: number;
  rewardEmeralds: number;
  rewardXp: number;
  difficulty: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
}

export const CraftingLabView: React.FC<CraftingLabViewProps> = ({
  profile,
  onAwardEmeralds,
  onMasterWord
}) => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'sentence' | 'boss'>('recipes');

  // Recipe Crafting State
  const [selectedRecipe, setSelectedRecipe] = useState<CraftingRecipe>(RECIPES[0]);
  const [gridSlots, setGridSlots] = useState<(string | null)[]>(Array(9).fill(null));
  const [craftedHistory, setCraftedHistory] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mc_crafted_items');
      return saved ? JSON.parse(saved) : ['recipe_crafting_table'];
    }
    return ['recipe_crafting_table'];
  });
  const [isCraftingAnimation, setIsCraftingAnimation] = useState<boolean>(false);
  const [lastCraftedRecipe, setLastCraftedRecipe] = useState<CraftingRecipe | null>(null);

  // Sentence Synthesizer State
  const [selectedSentencePattern, setSelectedSentencePattern] = useState<SentencePattern>(SENTENCE_PATTERNS[0]);
  const [placedSentenceBlocks, setPlacedSentenceBlocks] = useState<string[]>([]);
  const [availableSentencePool, setAvailableSentencePool] = useState<string[]>([]);
  const [sentenceSuccess, setSentenceSuccess] = useState<boolean>(false);

  // Boss Battle State
  const [activeBossIndex, setActiveBossIndex] = useState<number>(0);
  const [bosses, setBosses] = useState<Boss[]>([
    {
      id: 'zombie',
      name: 'Zombie',
      nameZh: '村庄夜袭 · 僵尸',
      avatar: '🧟',
      maxHp: 100,
      currentHp: 100,
      rewardEmeralds: 15,
      rewardXp: 30,
      difficulty: '初级探险',
      questions: [
        {
          question: '僵尸（Zombie）最害怕清晨的什么？',
          options: ['Sunlight (阳光)', 'Lava (岩浆)', 'Water (水)', 'Shadow (阴影)'],
          answer: 'Sunlight (阳光)',
          explanation: 'Zombies burn in the morning sunlight!'
        },
        {
          question: '“合成台”的英文短语是以下哪一个？',
          options: ['Crafting Table', 'Furnace Block', 'Chest Box', 'Redstone Wire'],
          answer: 'Crafting Table',
          explanation: 'Crafting Table 是 Minecraft 里的核心合成工具！'
        },
        {
          question: '请补全对话：“Excuse me, is this your coat?” - “Yes, ____.”',
          options: ['it is', 'it isn\'t', 'he is', 'they are'],
          answer: 'it is',
          explanation: '肯定的简短回答是：Yes, it is.'
        }
      ]
    },
    {
      id: 'creeper',
      name: 'Creeper',
      nameZh: '绿皮潜行者 · 苦力怕',
      avatar: '🟢',
      maxHp: 120,
      currentHp: 120,
      rewardEmeralds: 20,
      rewardXp: 40,
      difficulty: '中级警惕',
      questions: [
        {
          question: '苦力怕靠近玩家时会发出什么特有的嘶嘶声？',
          options: ['Ssssss! (嘶嘶)', 'Roar! (咆哮)', 'Meow! (喵喵)', 'Bzzzz! (蜂鸣)'],
          answer: 'Ssssss! (嘶嘶)',
          explanation: 'Creeper is famous for its "Ssssss!" fuse sound!'
        },
        {
          question: '“这是一块钻石”用英语怎么说？',
          options: ['This is a diamond.', 'That are a diamond.', 'This is an emerald.', 'Is this diamond.'],
          answer: 'This is a diamond.',
          explanation: 'This is + a/an + 单数名词：表示“这是一...”'
        },
        {
          question: '在我的世界中，“Inventory”的意思是？',
          options: ['物品栏 / 背包', '地图导航', '下界传送门', '附魔台'],
          answer: '物品栏 / 背包',
          explanation: 'Press "E" key to open your inventory!'
        }
      ]
    },
    {
      id: 'dragon',
      name: 'Ender Dragon',
      nameZh: '末地维度 · 末影龙',
      avatar: '🐉',
      maxHp: 200,
      currentHp: 200,
      rewardEmeralds: 50,
      rewardXp: 100,
      difficulty: '终极 BOSS',
      questions: [
        {
          question: '末影龙守护在哪个维度（Dimension）中？',
          options: ['The End (末地)', 'The Nether (下界)', 'Overworld (主世界)', 'Deep Dark (深暗之域)'],
          answer: 'The End (末地)',
          explanation: 'The Ender Dragon resides in The End realm!'
        },
        {
          question: '请翻译句子：“Where is my enchanted bow?”',
          options: ['我的附魔弓在哪里？', '这是我的普通弓吗？', '我在哪里可以制造弓箭？', '你的弓丢了吗？'],
          answer: '我的附魔弓在哪里？',
          explanation: 'Where is... 询问地点；enchanted bow 表示附魔弓。'
        },
        {
          question: '词汇辨析：下面哪个单词表示“绿宝石”？',
          options: ['Emerald', 'Diamond', 'Obsidian', 'Gold Ingot'],
          answer: 'Emerald',
          explanation: 'Emerald 即绿宝石，是村庄交易的黄金货币！'
        }
      ]
    }
  ]);
  const [currentBossQIndex, setCurrentBossQIndex] = useState<number>(0);
  const [bossQuizSelected, setBossQuizSelected] = useState<string | null>(null);
  const [bossQuizFeedback, setBossQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Initialize Available Sentence Pool when pattern changes
  useEffect(() => {
    const combined = [...selectedSentencePattern.blocks, ...selectedSentencePattern.distractors];
    // Fisher-Yates Shuffle
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    setAvailableSentencePool(combined);
    setPlacedSentenceBlocks([]);
    setSentenceSuccess(false);
  }, [selectedSentencePattern]);

  // Quick fill recipe grid
  const handleQuickFillRecipe = (recipe: CraftingRecipe) => {
    playClickSound();
    setSelectedRecipe(recipe);
    setGridSlots([...recipe.gridPattern]);
  };

  const handleClearGrid = () => {
    playClickSound();
    setGridSlots(Array(9).fill(null));
    setLastCraftedRecipe(null);
  };

  // Check if grid matches current or any recipe
  const checkGridMatch = (): CraftingRecipe | null => {
    for (const recipe of RECIPES) {
      let isMatch = true;
      for (let i = 0; i < 9; i++) {
        if (gridSlots[i] !== recipe.gridPattern[i]) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) return recipe;
    }
    return null;
  };

  const matchedRecipe = checkGridMatch();

  // Execute Crafting Action
  const handleCraft = () => {
    if (!matchedRecipe) return;

    playBlockBreakSound();
    setIsCraftingAnimation(true);

    setTimeout(() => {
      setIsCraftingAnimation(false);
      playLevelUpSound();
      playEmeraldSound();

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setLastCraftedRecipe(matchedRecipe);

      // Save to crafted history
      if (!craftedHistory.includes(matchedRecipe.id)) {
        const next = [...craftedHistory, matchedRecipe.id];
        setCraftedHistory(next);
        if (typeof window !== 'undefined') {
          localStorage.setItem('mc_crafted_items', JSON.stringify(next));
        }
      }

      // Award Emeralds and XP
      onAwardEmeralds(8, 20);
      if (onMasterWord) {
        onMasterWord(matchedRecipe.nameEn);
      }

      // Speak word name
      speakText(matchedRecipe.nameEn, { lang: 'en-US' });
    }, 600);
  };

  // Sentence Synthesizer Logic
  const handleAddSentenceBlock = (block: string, index: number) => {
    playClickSound();
    setPlacedSentenceBlocks(prev => [...prev, block]);
    setAvailableSentencePool(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveSentenceBlock = (block: string, index: number) => {
    playClickSound();
    setPlacedSentenceBlocks(prev => prev.filter((_, i) => i !== index));
    setAvailableSentencePool(prev => [...prev, block]);
  };

  const handleCheckSentence = () => {
    const constructed = placedSentenceBlocks.join(' ');
    if (constructed === selectedSentencePattern.targetSentence) {
      playLevelUpSound();
      playEmeraldSound();
      setSentenceSuccess(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      onAwardEmeralds(10, 25);
      speakText(selectedSentencePattern.targetSentence, { lang: 'en-US' });
    } else {
      playBlockBreakSound();
      alert(`差一点点哦！真正的句子是：\n"${selectedSentencePattern.targetSentence}"`);
    }
  };

  // Boss Battle Quiz Answer
  const handleAnswerBossQuiz = (option: string) => {
    if (bossQuizSelected) return; // Prevent double click

    const boss = bosses[activeBossIndex];
    const q = boss.questions[currentBossQIndex];
    setBossQuizSelected(option);

    if (option === q.answer) {
      playLevelUpSound();
      setBossQuizFeedback({ isCorrect: true, text: `💥 暴击斩击！知识威力极大！${q.explanation}` });

      // Reduce boss HP
      const damage = 40;
      setBosses(prev => {
        const updated = [...prev];
        const target = { ...updated[activeBossIndex] };
        target.currentHp = Math.max(0, target.currentHp - damage);
        updated[activeBossIndex] = target;

        if (target.currentHp === 0) {
          // Boss defeated!
          setTimeout(() => {
            playEmeraldSound();
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
            onAwardEmeralds(target.rewardEmeralds, target.rewardXp);
          }, 800);
        }

        return updated;
      });
    } else {
      playBlockBreakSound();
      setBossQuizFeedback({ isCorrect: false, text: `🛡️ 招架防御！正确答案是：${q.answer}。原因：${q.explanation}` });
    }
  };

  const handleNextBossQuestion = () => {
    playClickSound();
    setBossQuizSelected(null);
    setBossQuizFeedback(null);
    const boss = bosses[activeBossIndex];
    if (currentBossQIndex + 1 < boss.questions.length) {
      setCurrentBossQIndex(prev => prev + 1);
    } else {
      setCurrentBossQIndex(0);
    }
  };

  return (
    <div className="bg-white/95 border-2 sm:border-4 border-[#487E2C] rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] flex flex-col space-y-4 sm:space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#487E2C] to-[#2D5A1B] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border-2 border-[#355E20] shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-900 border-2 border-amber-600 rounded-xl flex items-center justify-center text-2xl shadow-inner shrink-0">
            🔨
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-black font-mono tracking-wide flex items-center space-x-2">
              <span>MC 3x3 英语合成实验室</span>
              <span className="text-[10px] bg-[#FFD700] text-black px-2 py-0.5 rounded-full uppercase font-bold">
                Crafting Lab
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
              摆放方块与词汇片段，合成本领词汇神器与魔法句型！
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono font-black bg-black/30 px-3 py-1.5 rounded-xl border border-white/20">
          <span>已解锁配方:</span>
          <span className="text-[#FFD700]">{craftedHistory.length} / {RECIPES.length}</span>
        </div>
      </div>

      {/* Nav Sub-Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => { playClickSound(); setActiveTab('recipes'); }}
          className={`flex items-center space-x-1.5 px-3.5 sm:px-5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'recipes'
              ? 'bg-[#487E2C] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Hammer className="w-4 h-4" />
          <span>3x3 物品合成台</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('sentence'); }}
          className={`flex items-center space-x-1.5 px-3.5 sm:px-5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'sentence'
              ? 'bg-[#487E2C] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3x3 语法句子工坊</span>
        </button>

        <button
          onClick={() => { playClickSound(); setActiveTab('boss'); }}
          className={`flex items-center space-x-1.5 px-3.5 sm:px-5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all ${
            activeTab === 'boss'
              ? 'bg-[#487E2C] text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Sword className="w-4 h-4" />
          <span>⚔️ 怪物英语擂台</span>
        </button>
      </div>

      {/* TAB 1: 3x3 RECIPE CRAFTING TABLE */}
      {activeTab === 'recipes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Recipe Book List */}
          <div className="lg:col-span-5 bg-amber-950/5 border-2 border-amber-800/20 rounded-2xl p-3 sm:p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-mono font-black text-sm text-amber-900 flex items-center space-x-1.5">
                <span>📖 合成秘籍 (Recipes)</span>
              </h3>
              <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                点击快速摆放
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {RECIPES.map(recipe => {
                const isCrafted = craftedHistory.includes(recipe.id);
                const isSelected = selectedRecipe.id === recipe.id;

                return (
                  <button
                    key={recipe.id}
                    onClick={() => handleQuickFillRecipe(recipe)}
                    className={`w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-100 border-amber-600 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-amber-900/10 border border-amber-800/30 rounded-lg flex items-center justify-center text-xl shrink-0">
                        {recipe.mcIcon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-black text-xs sm:text-sm text-slate-800">
                            {recipe.nameEn}
                          </span>
                          {isCrafted && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-300">
                              已拥有
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {recipe.nameZh} • <span className="font-mono">{recipe.phonetic}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: The 3x3 Minecraft Wood Crafting Grid */}
          <div className="lg:col-span-7 bg-[#8B6133] border-4 border-[#5A3C1A] rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col items-center justify-between text-white relative">
            
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🪵</span>
                <span className="font-mono font-black text-sm text-amber-100 uppercase tracking-wider">
                  Minecraft 3x3 Crafting Bench
                </span>
              </div>
              
              <button
                onClick={handleClearGrid}
                className="flex items-center space-x-1 text-xs font-mono font-bold bg-amber-900/60 hover:bg-amber-900 px-2.5 py-1 rounded-lg border border-amber-600/50 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>清空网格</span>
              </button>
            </div>

            {/* Grid & Output Area */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-2">
              
              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 gap-2 bg-[#5A3C1A] p-3 rounded-xl border-2 border-[#3D2811] shadow-inner">
                {gridSlots.map((itemIcon, idx) => (
                  <div
                    key={idx}
                    className={`w-14 h-14 sm:w-16 sm:h-16 bg-[#3D2811] border-2 border-[#8B6133] rounded-lg flex items-center justify-center text-2xl sm:text-3xl shadow-inner transition-transform ${
                      isCraftingAnimation ? 'animate-pulse scale-95' : ''
                    }`}
                  >
                    {itemIcon ? (
                      <span className="transform hover:scale-110 transition-transform cursor-pointer select-none">
                        {itemIcon}
                      </span>
                    ) : (
                      <span className="text-xs text-amber-900/40 font-mono font-bold select-none">
                        {idx + 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Crafting Arrow */}
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="text-2xl text-amber-300 animate-pulse">
                  ➔
                </div>
                <span className="text-[10px] font-mono text-amber-200">合成判定</span>
              </div>

              {/* Output Result Slot */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-[#3D2811] border-4 border-[#FFD700] rounded-xl flex items-center justify-center text-4xl sm:text-5xl shadow-[0_0_15px_rgba(255,215,0,0.3)] relative ${
                  matchedRecipe ? 'ring-4 ring-emerald-400 animate-bounce' : 'opacity-60'
                }`}>
                  {matchedRecipe ? (
                    <span>{matchedRecipe.mcIcon}</span>
                  ) : (
                    <span className="text-xs text-amber-200/50 font-mono text-center px-1">
                      未就绪
                    </span>
                  )}
                </div>

                <button
                  onClick={handleCraft}
                  disabled={!matchedRecipe || isCraftingAnimation}
                  className={`px-5 py-2.5 rounded-xl font-mono font-black text-xs sm:text-sm uppercase tracking-wide border-2 shadow-lg transition-all flex items-center space-x-2 ${
                    matchedRecipe && !isCraftingAnimation
                      ? 'bg-[#FF6321] border-amber-200 text-white hover:bg-[#E55210] active:scale-95 shadow-[0_4px_0_0_#9E3200]'
                      : 'bg-stone-600 border-stone-700 text-stone-400 cursor-not-allowed opacity-50'
                  }`}
                >
                  <Hammer className="w-4 h-4" />
                  <span>{isCraftingAnimation ? '正在锻造中...' : '开始合成 (Craft)'}</span>
                </button>
              </div>
            </div>

            {/* Last Crafted Item Card Display */}
            {lastCraftedRecipe && (
              <div className="w-full bg-amber-900/80 border-2 border-[#FFD700] rounded-xl p-3.5 mt-3 text-white flex flex-col space-y-2 animate-fade-in">
                <div className="flex items-center justify-between border-b border-amber-700 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{lastCraftedRecipe.mcIcon}</span>
                    <div>
                      <h4 className="font-mono font-black text-sm sm:text-base text-[#FFD700]">
                        {lastCraftedRecipe.nameEn}
                      </h4>
                      <div className="text-xs text-amber-200">
                        {lastCraftedRecipe.nameZh} • <span className="font-mono">{lastCraftedRecipe.phonetic}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => speakText(lastCraftedRecipe.nameEn, { lang: 'en-US' })}
                    className="p-2 bg-amber-800 hover:bg-amber-700 border border-amber-500 rounded-lg text-white"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-amber-100 bg-black/30 p-2 rounded-lg font-mono">
                  <div>💬 <span className="text-white font-bold">{lastCraftedRecipe.sampleSentence}</span></div>
                  <div className="text-amber-300 text-[11px] mt-0.5">{lastCraftedRecipe.sampleTranslation}</div>
                </div>

                <div className="flex items-center justify-end space-x-2 text-[11px] font-mono font-bold text-[#7CFC00]">
                  <span>❇️ +8 Emeralds</span>
                  <span>•</span>
                  <span>⭐ +20 XP</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 3x3 SENTENCE SYNTHESIZER */}
      {activeTab === 'sentence' && (
        <div className="flex flex-col space-y-5">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-mono font-black text-sm text-emerald-900 flex items-center space-x-2">
                <span>选择要合成的语法句型:</span>
              </h3>
              <p className="text-xs text-emerald-700 mt-0.5">
                将下方的句子方块按正确的标准语法顺序放置到合成槽中，组合成完整的魔方英语文卷！
              </p>
            </div>

            <div className="flex gap-2">
              {SENTENCE_PATTERNS.map(pat => (
                <button
                  key={pat.id}
                  onClick={() => { playClickSound(); setSelectedSentencePattern(pat); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    selectedSentencePattern.id === pat.id
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  {pat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Sentence Crafting Area */}
          <div className="bg-[#2D4723] border-4 border-[#1E3316] rounded-2xl p-5 text-white flex flex-col space-y-5 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-emerald-700/50 pb-3">
              <div>
                <span className="text-xs text-emerald-300 font-mono uppercase font-bold">目标例句翻译</span>
                <div className="text-base sm:text-lg font-black text-[#FFD700]">
                  "{selectedSentencePattern.translation}"
                </div>
              </div>

              <button
                onClick={() => speakText(selectedSentencePattern.targetSentence, { lang: 'en-US' })}
                className="flex items-center space-x-1.5 bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-lg text-xs font-mono border border-emerald-500"
              >
                <Volume2 className="w-4 h-4 text-emerald-200" />
                <span>朗读全句</span>
              </button>
            </div>

            {/* Placed Target Sentence Slots */}
            <div className="bg-black/30 border-2 border-dashed border-emerald-500/50 rounded-xl p-4 min-h-[70px] flex flex-wrap items-center gap-2">
              {placedSentenceBlocks.length === 0 ? (
                <span className="text-xs text-emerald-400/60 font-mono">
                  点击下方的方块按语法顺序填充至此...
                </span>
              ) : (
                placedSentenceBlocks.map((block, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveSentenceBlock(block, idx)}
                    className="bg-[#FF6321] text-white px-3 py-2 rounded-lg font-mono font-black text-sm border-2 border-amber-200 shadow-md hover:bg-rose-600 transition-all transform hover:scale-105"
                  >
                    {block}
                  </button>
                ))
              )}
            </div>

            {/* Available Block Pool */}
            <div>
              <span className="text-xs text-emerald-300 font-mono font-bold block mb-2">
                可选词汇/短语方块 (Click to Place):
              </span>
              <div className="flex flex-wrap gap-2.5">
                {availableSentencePool.map((block, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddSentenceBlock(block, idx)}
                    className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 border-2 border-emerald-500 px-3.5 py-2 rounded-xl font-mono font-bold text-xs sm:text-sm shadow-sm transition-all transform hover:scale-105 active:scale-95"
                  >
                    + {block}
                  </button>
                ))}
              </div>
            </div>

            {/* Check Action Button */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => { setPlacedSentenceBlocks([]); }}
                className="text-xs font-mono text-emerald-300 hover:underline"
              >
                重置排列
              </button>

              <button
                onClick={handleCheckSentence}
                disabled={placedSentenceBlocks.length === 0}
                className={`px-6 py-2.5 rounded-xl font-mono font-black text-sm uppercase tracking-wide border-2 shadow-lg transition-all flex items-center space-x-2 ${
                  placedSentenceBlocks.length > 0
                    ? 'bg-[#7CFC00] border-emerald-300 text-black hover:bg-lime-300 active:scale-95 shadow-[0_4px_0_0_#388E3C]'
                    : 'bg-stone-600 border-stone-700 text-stone-400 cursor-not-allowed opacity-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>验证句型合成</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MOB BOSS BATTLE ARENA */}
      {activeTab === 'boss' && (
        <div className="flex flex-col space-y-5">
          
          {/* Boss Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bosses.map((boss, idx) => {
              const isSelected = activeBossIndex === idx;
              return (
                <button
                  key={boss.id}
                  onClick={() => {
                    playClickSound();
                    setActiveBossIndex(idx);
                    setCurrentBossQIndex(0);
                    setBossQuizSelected(null);
                    setBossQuizFeedback(null);
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all text-left flex items-center space-x-3 ${
                    isSelected
                      ? 'bg-rose-950/10 border-rose-600 shadow-md ring-2 ring-rose-400'
                      : 'bg-white border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-rose-900/10 border border-rose-800/30 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    {boss.avatar}
                  </div>
                  <div>
                    <div className="font-mono font-black text-xs sm:text-sm text-slate-800">
                      {boss.nameZh}
                    </div>
                    <div className="text-[10px] text-rose-600 font-bold mt-0.5">
                      难度: {boss.difficulty} • HP: {boss.currentHp}/{boss.maxHp}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Boss Battle Arena Screen */}
          {(() => {
            const currentBoss = bosses[activeBossIndex];
            const currentQ = currentBoss.questions[currentBossQIndex];

            return (
              <div className="bg-[#1A1A1A] border-4 border-rose-900 rounded-2xl p-5 text-white flex flex-col space-y-5 shadow-2xl relative overflow-hidden">
                
                {/* Boss Health Header */}
                <div className="flex items-center justify-between border-b border-rose-900/60 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{currentBoss.avatar}</span>
                    <div>
                      <h3 className="font-mono font-black text-base sm:text-lg text-rose-400">
                        {currentBoss.nameZh} ({currentBoss.name})
                      </h3>
                      <div className="text-xs text-stone-400 font-mono">
                        第 {currentBossQIndex + 1} / {currentBoss.questions.length} 斩击回合
                      </div>
                    </div>
                  </div>

                  {/* HP Bar */}
                  <div className="w-36 sm:w-48">
                    <div className="flex justify-between text-[11px] font-mono font-bold mb-1">
                      <span className="text-rose-400">BOSS HP</span>
                      <span className="text-stone-300">{currentBoss.currentHp} / {currentBoss.maxHp}</span>
                    </div>
                    <div className="h-3 bg-stone-800 rounded-full overflow-hidden border border-rose-900 p-0.5">
                      <div
                        className="h-full bg-rose-600 rounded-full transition-all duration-500 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)]"
                        style={{ width: `${(currentBoss.currentHp / currentBoss.maxHp) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Boss Defeated Banner */}
                {currentBoss.currentHp <= 0 ? (
                  <div className="bg-amber-950/80 border-2 border-[#FFD700] rounded-xl p-6 text-center flex flex-col items-center space-y-3">
                    <div className="text-5xl">🏆</div>
                    <h3 className="font-mono font-black text-lg text-[#FFD700]">
                      已成功击败 {currentBoss.nameZh}！
                    </h3>
                    <p className="text-xs text-amber-200">
                      获得了末影宝箱奖励：❇️ +{currentBoss.rewardEmeralds} 绿宝石 & ⭐ +{currentBoss.rewardXp} XP！
                    </p>
                  </div>
                ) : (
                  /* Question Challenge Area */
                  <div className="flex flex-col space-y-4">
                    <div className="bg-stone-900 border border-stone-700 rounded-xl p-4 font-mono">
                      <div className="text-xs text-amber-400 font-bold mb-1">🗡️ 英语斩击关卡挑战:</div>
                      <div className="text-sm sm:text-base text-white font-bold">
                        {currentQ.question}
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentQ.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerBossQuiz(opt)}
                          disabled={!!bossQuizSelected}
                          className={`p-3 rounded-xl border-2 font-mono text-xs sm:text-sm font-bold text-left transition-all ${
                            bossQuizSelected === opt
                              ? opt === currentQ.answer
                                ? 'bg-emerald-900/80 border-emerald-400 text-emerald-200'
                                : 'bg-rose-900/80 border-rose-500 text-rose-200'
                              : 'bg-stone-800 border-stone-700 text-stone-200 hover:border-amber-400 hover:bg-stone-750'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </button>
                      ))}
                    </div>

                    {/* Feedback Banner */}
                    {bossQuizFeedback && (
                      <div className={`p-3.5 rounded-xl border font-mono text-xs font-bold flex items-center justify-between ${
                        bossQuizFeedback.isCorrect
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950 border-rose-500 text-rose-300'
                      }`}>
                        <span>{bossQuizFeedback.text}</span>

                        <button
                          onClick={handleNextBossQuestion}
                          className="px-3 py-1.5 bg-amber-500 text-black font-black rounded-lg text-xs hover:bg-amber-400 shrink-0 ml-2"
                        >
                          下一题 ➔
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};
