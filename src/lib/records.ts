import { Difficulty, PersonalRecord } from '../types';

const STORAGE_KEY = 'sudoku_records';

export function getRecords(): PersonalRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PersonalRecord[];
  } catch {
    return [];
  }
}

export function getBestTime(difficulty: Difficulty): number | null {
  const records = getRecords();
  const record = records.find(r => r.difficulty === difficulty);
  return record ? record.bestTime : null;
}

export function saveRecord(difficulty: Difficulty, time: number): boolean {
  try {
    const records = getRecords();
    const existing = records.find(r => r.difficulty === difficulty);

    if (existing) {
      if (time >= existing.bestTime) return false;
      existing.bestTime = time;
      existing.date = new Date().toISOString();
    } else {
      records.push({
        difficulty,
        bestTime: time,
        date: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch {
    return false;
  }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
