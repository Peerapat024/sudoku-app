import { WordleState } from '../types';

const WORDS = [
  'APPLE', 'BEACH', 'BRAIN', 'BREAD', 'BRUSH', 'CHAIR', 'CHEST', 'CHORD', 'CLICK', 'CLOCK',
  'CLOUD', 'DANCE', 'DIARY', 'DRINK', 'EARTH', 'FEAST', 'FIELD', 'FLAME', 'FLOWER', 'FRUIT',
  'GLASS', 'GRAPE', 'GREEN', 'GUESS', 'HEART', 'HOUSE', 'JUICE', 'LIGHT', 'LEMON', 'MONEY',
  'MUSIC', 'NIGHT', 'OCEAN', 'PARTY', 'PIANO', 'PILOT', 'PLANE', 'PHONE', 'PIZZA', 'PLANT',
  'RADIO', 'RIVER', 'ROBOT', 'SHIRT', 'SHOES', 'SMILE', 'SNAKE', 'SPACE', 'SPOON', 'STORM',
  'TABLE', 'TIGER', 'TOAST', 'TOUCH', 'TRAIN', 'TRUCK', 'VOICE', 'WATER', 'WATCH', 'WHALE',
  'WORLD', 'WRITE', 'YOUTH', 'ZEBRA', 'PIVOT', 'STARE', 'REACT', 'STORM'
];

export function getRandomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function isValidWord(word: string): boolean {
  // Simple check for now, can expand with a full dictionary
  return word.length === 5;
}

export function getLetterStatus(guess: string, solution: string): ('correct' | 'present' | 'absent')[] {
  const result: ('correct' | 'present' | 'absent')[] = Array(5).fill('absent');
  const solutionChars = solution.split('');
  const guessChars = guess.split('');

  // First pass: find correct positions
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = 'correct';
      solutionChars[i] = ''; // Mark as used
      guessChars[i] = '_';   // Mark as used
    }
  }

  // Second pass: find present but wrong positions
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] !== '_') {
      const idx = solutionChars.indexOf(guessChars[i]);
      if (idx !== -1) {
        result[i] = 'present';
        solutionChars[idx] = ''; // Mark as used
      }
    }
  }

  return result;
}
