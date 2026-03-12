import type { Leaderboard, LeaderboardEntry } from '../types';
import { getFromStorage } from '../utils';

const STORAGE_KEY = 'leaderboards';

export function getAllLeaderboards(): Leaderboard[] {
  return getFromStorage<Leaderboard[]>(STORAGE_KEY, []);
}

export function getLeaderboard(hackathonSlug: string): Leaderboard | undefined {
  return getAllLeaderboards().find((lb) => lb.hackathonSlug === hackathonSlug);
}

export function getLeaderboardEntries(hackathonSlug: string): LeaderboardEntry[] {
  const lb = getLeaderboard(hackathonSlug);
  return lb ? lb.entries.sort((a, b) => a.rank - b.rank) : [];
}
