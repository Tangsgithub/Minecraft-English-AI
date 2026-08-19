import { RadioStory, RADIO_STORIES } from '../data/radioStoriesData';

const STORAGE_KEY = 'mc_english_custom_radio_stories';

export interface ParseStoryAiResult {
  title: string;
  titleZh: string;
  category: 'mc_adventure' | 'classic_fables';
  categoryName: string;
  narrator: 'Alex' | 'Steve';
  durationApprox: string;
  summary: string;
  discTheme: {
    name: string;
    color: string;
    border: string;
    icon: string;
  };
  paragraphs: Array<{
    id: string;
    english: string;
    chinese: string;
    speaker: 'Alex' | 'Steve';
  }>;
  vocabularyLoot: Array<{
    word: string;
    phonetic: string;
    meaning: string;
  }>;
}

// Fetch all custom stories from Cloud DB with LocalStorage cache fallback
export async function fetchCustomStories(): Promise<RadioStory[]> {
  let localList: RadioStory[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      localList = JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to load local custom stories:", e);
  }

  try {
    const resp = await fetch('/api/radio/stories');
    if (resp.ok) {
      const data = await resp.json();
      if (data.success && Array.isArray(data.stories)) {
        // Sync local cache
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.stories));
        return data.stories;
      }
    }
  } catch (err) {
    console.warn("Cloud radio stories fetch failed, using local cache:", err);
  }

  return localList;
}

// Save a new or updated custom story to Cloud DB and LocalStorage
export async function saveCustomStory(story: RadioStory, userAccount?: string): Promise<{ success: boolean; message: string; story?: RadioStory }> {
  try {
    // 1. Update local cache immediately
    const currentList = await fetchCustomStories();
    const existingIdx = currentList.findIndex(s => s.id === story.id);
    let updatedList: RadioStory[];
    if (existingIdx >= 0) {
      updatedList = [...currentList];
      updatedList[existingIdx] = story;
    } else {
      updatedList = [story, ...currentList];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    // 2. Sync to Cloud DB
    const resp = await fetch('/api/radio/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ story, creatorAccount: userAccount || 'guest' })
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data.success) {
        return { success: true, message: '故事已成功保存并同步到云端电台！', story: data.story || story };
      }
    }

    return { success: true, message: '故事已保存在本地电台！', story };
  } catch (err: any) {
    console.error("Save custom story error:", err);
    return { success: true, message: '已保存在本地，电台可直接读取。', story };
  }
}

// Delete custom story
export async function deleteCustomStory(storyId: string): Promise<{ success: boolean; message: string }> {
  try {
    const currentList = await fetchCustomStories();
    const updated = currentList.filter(s => s.id !== storyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    await fetch(`/api/radio/stories/${storyId}`, { method: 'DELETE' });
    return { success: true, message: '已从故事电台中删除' };
  } catch (err: any) {
    return { success: true, message: '已从本地故事电台中删除' };
  }
}

// Smart AI text parser
export async function parseStoryWithAI(rawText: string, narrator: 'Alex' | 'Steve' = 'Alex', category: 'mc_adventure' | 'classic_fables' = 'mc_adventure'): Promise<{ success: boolean; story?: ParseStoryAiResult; error?: string }> {
  try {
    const resp = await fetch('/api/radio/stories/ai-parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rawText, narrator, category })
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data.success && data.story) {
        return { success: true, story: data.story };
      } else {
        return { success: false, error: data.error || 'AI 解析故事失败，请检查输入' };
      }
    }

    return { success: false, error: '网络请求失败，请稍后重试' };
  } catch (err: any) {
    console.error("AI parse story network error:", err);
    return { success: false, error: '解析故事服务异常，请重试' };
  }
}
