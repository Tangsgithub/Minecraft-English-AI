const fs = require('fs');
let code = fs.readFileSync('src/components/LessonMap.tsx', 'utf8');

code = code.replace(
  /import \{ GiantWorldMap \} from '\.\/GiantWorldMap';/,
  `import { GiantWorldMap } from './GiantWorldMap';\nimport { LessonStudyModal } from './LessonStudyModal';`
);

const startString = '{/* Lesson Detailed Study Modal */}';
const startIndex = code.indexOf(startString);
const endString = '{oralTarget && (';
const endIndex = code.indexOf(endString);

if (startIndex !== -1 && endIndex !== -1) {
  const modalReplacement = `{/* Lesson Detailed Study Modal */}
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
  fs.writeFileSync('src/components/LessonMap.tsx', code);
  console.log("Replaced successfully in LessonMap.tsx");
} else {
  console.error("Could not find boundaries in LessonMap.tsx");
}
