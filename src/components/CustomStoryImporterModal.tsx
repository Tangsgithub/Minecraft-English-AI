import React, { useState } from 'react';
import { 
  X, Sparkles, BookOpen, Plus, Trash2, Volume2, CheckCircle2, Save, 
  Layers, Disc, HelpCircle, Loader2, Play, Music, ArrowRight, Wand2
} from 'lucide-react';
import { RadioStory, StoryParagraph, StoryVocab } from '../data/radioStoriesData';
import { parseStoryWithAI, saveCustomStory, deleteCustomStory } from '../services/customStoriesService';
import { speakText, stopSpeech, playClickSound, playEmeraldSound } from '../utils/audio';

interface CustomStoryImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStorySaved: (newStory: RadioStory) => void;
  customStories: RadioStory[];
  onStoryDeleted: (storyId: string) => void;
  userAccount?: string;
}

const DISC_THEMES = [
  { name: 'Otherside (星空之境)', color: 'from-cyan-600 via-blue-700 to-indigo-950', border: 'border-cyan-400', icon: '🐺' },
  { name: 'Pigstep (下界烈焰)', color: 'from-amber-600 via-yellow-700 to-amber-950', border: 'border-yellow-400', icon: '🍎' },
  { name: 'Mall (紫晶回响)', color: 'from-purple-600 via-indigo-800 to-slate-950', border: 'border-purple-400', icon: '🐷' },
  { name: 'Cat (绿宝石之乐)', color: 'from-emerald-600 via-teal-700 to-slate-900', border: 'border-emerald-400', icon: '🐢' },
  { name: 'Chirp (红石之歌)', color: 'from-rose-600 via-red-700 to-neutral-900', border: 'border-rose-400', icon: '🪵' },
  { name: 'Mellohi (粉晶之梦)', color: 'from-fuchsia-600 via-pink-700 to-slate-950', border: 'border-fuchsia-400', icon: '🌹' },
  { name: 'Netherite (下界合金传奇)', color: 'from-purple-950 via-slate-900 to-black', border: 'border-purple-500', icon: '🏰' }
];

export const CustomStoryImporterModal: React.FC<CustomStoryImporterModalProps> = ({
  isOpen,
  onClose,
  onStorySaved,
  customStories,
  onStoryDeleted,
  userAccount
}) => {
  if (!isOpen) return null;

  // Active tab: 'create' vs 'manage'
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  // Input states for creation
  const [rawText, setRawText] = useState<string>('');
  const [narrator, setNarrator] = useState<'Alex' | 'Steve'>('Alex');
  const [category, setCategory] = useState<'mc_adventure' | 'classic_fables'>('mc_adventure');
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [parseError, setParseError] = useState<string | null>(null);

  // Form states after parsing or for manual editing
  const [storyTitle, setStoryTitle] = useState<string>('');
  const [storyTitleZh, setStoryTitleZh] = useState<string>('');
  const [storySummary, setStorySummary] = useState<string>('');
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number>(0);
  const [paragraphs, setParagraphs] = useState<StoryParagraph[]>([]);
  const [vocabularyLoot, setVocabularyLoot] = useState<StoryVocab[]>([]);
  const [playingParagraphId, setPlayingParagraphId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Handle AI parsing of raw text
  const handleAiParse = async () => {
    if (!rawText.trim()) {
      setParseError('请先粘贴一段英文故事文本或输入故事创意主题！');
      return;
    }
    playClickSound();
    setIsParsing(true);
    setParseError(null);

    const res = await parseStoryWithAI(rawText, narrator, category);
    setIsParsing(false);

    if (res.success && res.story) {
      setStoryTitle(res.story.title);
      setStoryTitleZh(res.story.titleZh);
      setStorySummary(res.story.summary);
      setParagraphs(res.story.paragraphs);
      setVocabularyLoot(res.story.vocabularyLoot || []);
      setNarrator(res.story.narrator);
      setCategory(res.story.category);
      playEmeraldSound();
    } else {
      setParseError(res.error || '解析失败，请检查网络或稍后重试');
    }
  };

  // Preview TTS audio for paragraph
  const handlePreviewAudio = (pId: string, englishText: string) => {
    playClickSound();
    if (playingParagraphId === pId) {
      stopSpeech();
      setPlayingParagraphId(null);
    } else {
      stopSpeech();
      setPlayingParagraphId(pId);
      speakText(englishText, () => {
        setPlayingParagraphId(null);
      }, { speaker: narrator });
    }
  };

  // Add paragraph manually
  const handleAddParagraph = () => {
    playClickSound();
    const newP: StoryParagraph = {
      id: `p_${Date.now()}`,
      english: '',
      chinese: '',
      speaker: narrator
    };
    setParagraphs([...paragraphs, newP]);
  };

  // Remove paragraph
  const handleRemoveParagraph = (idx: number) => {
    playClickSound();
    const updated = [...paragraphs];
    updated.splice(idx, 1);
    setParagraphs(updated);
  };

  // Save full story
  const handleSaveStory = async () => {
    if (!storyTitleZh.trim() || paragraphs.length === 0) {
      setParseError('请确保故事有标题且至少包含一个段落！');
      return;
    }

    const theme = DISC_THEMES[selectedThemeIndex] || DISC_THEMES[0];
    const totalWords = paragraphs.map(p => p.english).join(' ').split(/\s+/).filter(Boolean).length;
    const estMinutes = Math.max(1, Math.ceil(totalWords / 110));

    const finalStory: RadioStory = {
      id: `custom_story_${Date.now()}`,
      title: storyTitle || storyTitleZh,
      titleZh: storyTitleZh,
      category,
      categoryName: category === 'mc_adventure' ? '🌲 自定义探险篇' : '🏰 自定义故事篇',
      narrator,
      durationApprox: `${estMinutes} 分钟`,
      discTheme: theme,
      summary: storySummary || `${storyTitleZh}，包含 ${paragraphs.length} 个精彩段落。`,
      vocabularyLoot,
      paragraphs
    };

    setIsSaving(true);
    const saveRes = await saveCustomStory(finalStory, userAccount);
    setIsSaving(false);

    if (saveRes.success) {
      playEmeraldSound();
      onStorySaved(finalStory);
      onClose();
    } else {
      setParseError('保存故事时遇到问题，请重试');
    }
  };

  const handleModalClose = () => {
    stopSpeech();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 pt-safe pb-safe overflow-y-auto">
      <div className="bg-[#18181b] border-2 sm:border-4 border-amber-500 rounded-2xl sm:rounded-3xl w-full max-w-2xl text-slate-100 shadow-[0_0_50px_rgba(245,158,11,0.3)] overflow-hidden my-auto max-h-[92dvh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950 via-yellow-950 to-slate-950 p-3.5 sm:p-5 border-b-2 border-amber-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-amber-500 to-yellow-400 border-2 border-black rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl shadow-md text-slate-950 font-black shrink-0">
              ✨
            </div>
            <div>
              <h2 className="text-sm sm:text-lg font-black font-mono text-white flex items-center space-x-1.5 sm:space-x-2">
                <span>自定义英语故事创作者</span>
                <span className="text-[9px] sm:text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full font-bold">Cloud Studio</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-amber-200/90 font-mono">
                粘贴文本一键 AI 智能分段 • 自动双语翻译 • 存入云端电台即时开播
              </p>
            </div>
          </div>

          <button
            onClick={handleModalClose}
            className="text-slate-300 hover:text-white text-xs font-mono font-bold bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-xl border border-white/20 transition-colors"
          >
            ✕ 关闭
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950 border-b border-slate-800 p-1.5 flex items-center justify-between text-xs font-mono font-bold">
          <button
            onClick={() => { playClickSound(); setActiveTab('create'); }}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'create'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI 一键导入 / 创作故事</span>
          </button>

          <button
            onClick={() => { playClickSound(); setActiveTab('manage'); }}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activeTab === 'manage'
                ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>我的自定义故事库 ({customStories.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 space-y-4 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* TAB 1: CREATE STORY */}
          {activeTab === 'create' && (
            <div className="space-y-4">
              
              {/* Step 1: Input Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                  <span className="flex items-center space-x-1.5 text-amber-300">
                    <span>1. 粘贴故事原文或故事灵感：</span>
                  </span>
                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="text-slate-400">讲述人:</span>
                    <button
                      onClick={() => setNarrator(narrator === 'Alex' ? 'Steve' : 'Alex')}
                      className="px-2 py-0.5 rounded bg-slate-800 text-white font-bold border border-slate-700 hover:bg-slate-700"
                    >
                      {narrator === 'Alex' ? '👩‍🦰 Alex (美音女声)' : '👨 Steve (美音男声)'}
                    </button>
                  </div>
                </div>

                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="在此直接粘贴一段英文故事、中英文对照段落，或者输入提示（例如：'请写一个史蒂夫在蘑菇岛遇见红色哞菇的睡前英语故事')..."
                  className="w-full h-28 bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 resize-none"
                />

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">
                    💡 提示：系统将智能拆分为听力段落，并自动补齐双语对照与生词音标。
                  </span>

                  <button
                    onClick={handleAiParse}
                    disabled={isParsing || !rawText.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-mono font-black text-xs rounded-xl shadow-md flex items-center space-x-1.5 disabled:opacity-50 transition-all active:scale-95 shrink-0"
                  >
                    {isParsing ? (
                      <span className="flex items-center space-x-1.5">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>AI 智能分段中...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>✨ 开始智能解析</span>
                      </span>
                    )}
                  </button>
                </div>

                {parseError && (
                  <p className="text-xs text-rose-400 font-mono bg-rose-950/40 p-2 rounded-lg border border-rose-500/30">
                    ⚠️ {parseError}
                  </p>
                )}
              </div>

              {/* Step 2: Story Configuration & Editing Form */}
              {paragraphs.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3.5 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center space-x-1">
                      <span>2. 故事属性与段落核对 ({paragraphs.length} 个段落)</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      解析成功 ✓
                    </span>
                  </div>

                  {/* Title and Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">中文故事标题：</label>
                      <input
                        type="text"
                        value={storyTitleZh}
                        onChange={(e) => setStoryTitleZh(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-bold block mb-1">英文故事标题：</label>
                      <input
                        type="text"
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white font-bold focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Disc Theme Selector */}
                  <div>
                    <label className="text-slate-400 font-bold text-xs font-mono block mb-1.5">
                      选择黑胶唱片皮肤与主题：
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {DISC_THEMES.map((theme, tIdx) => (
                        <button
                          key={theme.name}
                          onClick={() => setSelectedThemeIndex(tIdx)}
                          className={`p-2 rounded-xl border text-left font-mono text-[11px] flex items-center space-x-1.5 transition-all ${
                            selectedThemeIndex === tIdx
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="text-lg">{theme.icon}</span>
                          <span className="truncate">{theme.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Editable Paragraphs List */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
                      <span>段落流式列表（可试听发音）：</span>
                      <button
                        onClick={handleAddParagraph}
                        className="text-[11px] bg-slate-800 hover:bg-slate-700 text-blue-300 px-2 py-1 rounded-lg border border-slate-700 flex items-center space-x-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>新增段落</span>
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {paragraphs.map((p, pIdx) => (
                        <div key={p.id || pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 space-y-1.5 text-xs font-mono">
                          <div className="flex items-center justify-between">
                            <span className="text-amber-400 font-bold text-[10px]">段落 {pIdx + 1}</span>
                            <div className="flex items-center space-x-1.5">
                              <button
                                onClick={() => handlePreviewAudio(p.id, p.english)}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center space-x-1 ${
                                  playingParagraphId === p.id
                                    ? 'bg-amber-400 text-slate-950 border-amber-300 animate-pulse'
                                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                }`}
                              >
                                <Volume2 className="w-3 h-3" />
                                <span>{playingParagraphId === p.id ? '播放中...' : '试听'}</span>
                              </button>
                              <button
                                onClick={() => handleRemoveParagraph(pIdx)}
                                className="text-slate-500 hover:text-rose-400 p-1"
                                title="删除该段"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <textarea
                            value={p.english}
                            onChange={(e) => {
                              const updated = [...paragraphs];
                              updated[pIdx].english = e.target.value;
                              setParagraphs(updated);
                            }}
                            placeholder="English paragraph..."
                            className="w-full h-12 bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 text-xs text-white font-mono resize-none focus:outline-none focus:border-amber-400"
                          />

                          <input
                            type="text"
                            value={p.chinese}
                            onChange={(e) => {
                              const updated = [...paragraphs];
                              updated[pIdx].chinese = e.target.value;
                              setParagraphs(updated);
                            }}
                            placeholder="中文段落翻译..."
                            className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-1.5 text-xs text-slate-300 font-sans focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vocabulary Loot Box Section */}
                  {vocabularyLoot.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-xs font-mono font-bold text-amber-300 block mb-1.5">
                        💎 提取的核心生词卡片 ({vocabularyLoot.length} 个)：
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {vocabularyLoot.map((vocab, vIdx) => (
                          <div key={vIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-2 font-mono text-xs flex items-center justify-between">
                            <div>
                              <p className="font-bold text-white text-xs">{vocab.word} <span className="text-[10px] text-slate-400 font-normal">{vocab.phonetic}</span></p>
                              <p className="text-[10px] text-amber-300 mt-0.5">{vocab.meaning}</p>
                            </div>
                            <button
                              onClick={() => speakText(vocab.word, () => {}, { speaker: narrator })}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Save Button Bar */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-2">
                    <button
                      onClick={handleSaveStory}
                      disabled={isSaving}
                      className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-black text-xs sm:text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-all"
                    >
                      {isSaving ? (
                        <span className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>正在同步到云端电台...</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-2">
                          <Save className="w-4 h-4" />
                          <span>💾 保存并发布到电台故事库</span>
                        </span>
                      )}
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 2: MANAGE CUSTOM STORIES */}
          {activeTab === 'manage' && (
            <div className="space-y-3">
              {customStories.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
                  <span className="text-4xl block">📻</span>
                  <h4 className="font-mono font-bold text-white text-sm">暂无自定义故事</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    点击上方「AI 一键导入 / 创作故事」，即可将任意英文故事存入电台！
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {customStories.map((story) => (
                    <div
                      key={story.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <span className="text-3xl">{story.discTheme.icon}</span>
                        <div className="truncate">
                          <h4 className="font-bold text-xs sm:text-sm text-white font-mono truncate">{story.titleZh}</h4>
                          <p className="text-[11px] text-slate-400 font-mono truncate">{story.title}</p>
                          <p className="text-[10px] text-amber-300 font-mono mt-0.5">
                            ⏱️ {story.durationApprox} • {story.paragraphs.length} 个段落 • {story.narrator === 'Alex' ? '👩‍🦰 Alex' : '👨 Steve'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => {
                            playClickSound();
                            onStorySaved(story);
                            onClose();
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs rounded-xl shadow-xs flex items-center space-x-1"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>在电台播放</span>
                        </button>

                        <button
                          onClick={async () => {
                            playClickSound();
                            await deleteCustomStory(story.id);
                            onStoryDeleted(story.id);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 rounded-xl border border-slate-700 transition-colors"
                          title="删除此故事"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
