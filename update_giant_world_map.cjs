const fs = require('fs');
let code = fs.readFileSync('src/components/GiantWorldMap.tsx', 'utf8');

// Add import
code = code.replace(
  /import \{ BIOME_CHAPTERS, BiomeChapter, getBiomeChapterByUnit \} from '\.\.\/data\/storyData';/,
  `import { BIOME_CHAPTERS, BiomeChapter, getBiomeChapterByUnit } from '../data/storyData';\nimport { LessonStudyModal } from './LessonStudyModal';`
);

// Replace modal
const startString = '{/* LESSON DETAIL MODAL */}';
const startIndex = code.indexOf(startString);
const endString = '{/* NPC INTERACTION DIALOGUE MODAL */}';
const endIndex = code.indexOf(endString);

if (startIndex !== -1 && endIndex !== -1) {
  const modalReplacement = `{/* LESSON DETAIL MODAL */}
      {activeLesson && (
        <LessonStudyModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onStartPractice={(lesson) => {
            setActiveLesson(null);
            onSelectLessonForChat(lesson);
          }}
        />
      )}

      `;
  code = code.substring(0, startIndex) + modalReplacement + code.substring(endIndex);
  fs.writeFileSync('src/components/GiantWorldMap.tsx', code);
  console.log("Replaced successfully in GiantWorldMap.tsx");
} else {
  console.error("Could not find boundaries in GiantWorldMap.tsx");
}
