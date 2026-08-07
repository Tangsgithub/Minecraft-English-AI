const fs = require('fs');
let code = fs.readFileSync('src/data/lessonsData.ts', 'utf8');

// add import for AUTHENTIC_LESSON_DIALOGUES
if (!code.includes('AUTHENTIC_LESSON_DIALOGUES')) {
  code = code.replace(
    /import \{ getAuthenticVocabForLesson \} from '\.\/authenticLessonVocab';/,
    `import { getAuthenticVocabForLesson } from './authenticLessonVocab';\nimport { AUTHENTIC_LESSON_DIALOGUES } from './authenticLessonDialogues';`
  );
}

// Modify generateSentencesForLesson to take lessonId and volumeId
code = code.replace(
  /function generateSentencesForLesson\(title: string, titleZh: string, vocab: any\[\]\) \{[\s\S]*?\n\}/,
  `function generateSentencesForLesson(lessonId: number, title: string, titleZh: string, vocab: any[], volumeId: string) {
  if (volumeId === 'vol1' && AUTHENTIC_LESSON_DIALOGUES[lessonId]) {
    return AUTHENTIC_LESSON_DIALOGUES[lessonId].sentences;
  }
  return [
    { en: \`\${title}\`, zh: \`\${titleZh}\` },
    { en: \`How do we practice \${title}?\`, zh: \`我们如何练习《\${titleZh}》？\` },
    { en: \`I can use \${vocab[0]?.word || 'words'} in my daily English.\`, zh: \`我可以在日常英语中使用 \${vocab[0]?.word || '词汇'}。\` },
    { en: \`That is great! Keep going!\`, zh: \`太棒了！继续保持！\` }
  ];
}`
);

// update the call to generateSentencesForLesson
code = code.replace(
  /const genSentences = generateSentencesForLesson\(cleanTitle, cleanTitleZh, genVocab\);/,
  `const genSentences = generateSentencesForLesson(lessonId, cleanTitle, cleanTitleZh, genVocab, volumeId);`
);

// update dialogueScript initialization
code = code.replace(
  /dialogueScript: \[[\s\S]*?avatar: '👦'\s*\}\s*\],/,
  `dialogueScript: (volumeId === 'vol1' && AUTHENTIC_LESSON_DIALOGUES[lessonId])
      ? AUTHENTIC_LESSON_DIALOGUES[lessonId].dialogue
      : [
          {
            speaker: 'Alex',
            text: \`Welcome to Lesson \${lessonId}: "\${cleanTitle}"! \${genSentences[0]?.en || ''}\`,
            translation: \`欢迎来到第 \${lessonId} 课《\${cleanTitleZh}》！\${genSentences[0]?.zh || ''}\`,
            avatar: '👩'
          },
          {
            speaker: 'Steve',
            text: genSentences[1]?.en || \`I am excited to learn and build in Minecraft today!\`,
            translation: genSentences[1]?.zh || \`今天能在我的世界里边学英语边建造，我太兴奋了！\`,
            avatar: '👦'
          }
        ],`
);

fs.writeFileSync('src/data/lessonsData.ts', code);
