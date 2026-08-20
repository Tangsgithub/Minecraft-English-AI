// NCE Book 1 Full Curriculum (Lessons 1-144, 100% Authentic Corpus)
import { NCE_BOOK1_UNIT1_DATA, LessonCorpusItem } from './nceBook1Unit1Data';
import { NCE_BOOK1_UNIT2_DATA } from './nceBook1Unit2Data';
import { NCE_BOOK1_UNIT3_DATA } from './nceBook1Unit3Data';
import { NCE_BOOK1_UNIT4_DATA } from './nceBook1Unit4Data';
import { NCE_BOOK1_UNIT5_DATA } from './nceBook1Unit5Data';
import { NCE_BOOK1_UNIT6_DATA } from './nceBook1Unit6Data';

export type { LessonCorpusItem };

export const NCE_BOOK1_FULL_LESSONS: Record<number, LessonCorpusItem> = {
  ...NCE_BOOK1_UNIT1_DATA,
  ...NCE_BOOK1_UNIT2_DATA,
  ...NCE_BOOK1_UNIT3_DATA,
  ...NCE_BOOK1_UNIT4_DATA,
  ...NCE_BOOK1_UNIT5_DATA,
  ...NCE_BOOK1_UNIT6_DATA,
};

export function getNceBook1Lesson(id: number): LessonCorpusItem | undefined {
  return NCE_BOOK1_FULL_LESSONS[id];
}
