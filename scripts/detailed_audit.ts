import { NCE_BOOK1_FULL_LESSONS } from '../src/data/nceBook1FullCurriculum';
import { NCE_BOOK1_TITLES } from '../src/data/lessonsData';
import { AUTHENTIC_LESSON_DIALOGUES } from '../src/data/authenticLessonDialogues';

console.log('=== 1. Checking Title Mismatches ===');
for (let i = 1; i <= 144; i++) {
  const full = NCE_BOOK1_FULL_LESSONS[i];
  const titleEntry = NCE_BOOK1_TITLES[i];
  if (full && titleEntry) {
    if (full.title !== titleEntry.title) {
      console.log(`L${i}: full="${full.title}" (${full.titleZh}) vs titlesData="${titleEntry.title}" (${titleEntry.titleZh})`);
    }
  }
}

console.log('\n=== 2. Checking Lessons with 0 Words in NCE_BOOK1_FULL_LESSONS ===');
const zeroWords: number[] = [];
for (let i = 1; i <= 144; i++) {
  const full = NCE_BOOK1_FULL_LESSONS[i];
  if (!full || !full.words || full.words.length === 0) {
    zeroWords.push(i);
  }
}
console.log('Zero words count:', zeroWords.length, 'Lessons:', zeroWords);

console.log('\n=== 3. Checking Even Lessons in AUTHENTIC_LESSON_DIALOGUES that copy Odd Lessons ===');
let dupCount = 0;
for (let i = 2; i <= 144; i += 2) {
  const even = AUTHENTIC_LESSON_DIALOGUES[i];
  const odd = AUTHENTIC_LESSON_DIALOGUES[i - 1];
  if (even && odd && even.sentences?.[0]?.en === odd.sentences?.[0]?.en) {
    dupCount++;
  }
}
console.log('Duplicated even lessons in AUTHENTIC_LESSON_DIALOGUES:', dupCount);
