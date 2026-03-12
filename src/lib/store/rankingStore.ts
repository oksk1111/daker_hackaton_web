import type { RankingEntry } from '../types';
import { getFromStorage } from '../utils';

const STORAGE_KEY = 'rankings';

export function getAllRankings(): RankingEntry[] {
  return getFromStorage<RankingEntry[]>(STORAGE_KEY, []);
}

export function getRankingsSorted(): RankingEntry[] {
  return getAllRankings().sort((a, b) => a.rank - b.rank);
}
