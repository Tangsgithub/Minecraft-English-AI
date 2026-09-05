export interface StoryParagraph {
  id: string;
  english: string;
  chinese: string;
  speaker: 'Alex' | 'Steve';
}

export interface StoryVocab {
  word: string;
  phonetic: string;
  meaning: string;
}

export interface RadioStory {
  id: string;
  title: string;
  titleZh: string;
  category: 'mc_adventure' | 'classic_fables';
  categoryName: string;
  narrator: 'Alex' | 'Steve';
  durationApprox: string;
  discTheme: {
    name: string;
    color: string;
    border: string;
    icon: string;
  };
  summary: string;
  vocabularyLoot: StoryVocab[];
  paragraphs: StoryParagraph[];
}
