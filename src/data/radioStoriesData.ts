export * from './storyTypes';
import { RadioStory } from './storyTypes';
import { MC_ADVENTURE_STORIES } from './stories/mcAdventureStories';
import { CLASSIC_FABLE_STORIES } from './stories/classicFableStories';

export { MC_ADVENTURE_STORIES } from './stories/mcAdventureStories';
export { CLASSIC_FABLE_STORIES } from './stories/classicFableStories';

export const RADIO_STORIES: RadioStory[] = [
  ...MC_ADVENTURE_STORIES,
  ...CLASSIC_FABLE_STORIES,
];
