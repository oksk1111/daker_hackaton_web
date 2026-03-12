/**
 * Unit tests for leaderboardStore
 */
import { getAllLeaderboards, getLeaderboard, getLeaderboardEntries } from '@/lib/store/leaderboardStore';
import { seedAll } from '@/lib/seed';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('leaderboardStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    seedAll();
  });

  test('getAllLeaderboards returns seeded leaderboards', () => {
    const lbs = getAllLeaderboards();
    expect(lbs).toHaveLength(2);
  });

  test('getLeaderboard returns correct leaderboard', () => {
    const lb = getLeaderboard('aimers-8-model-lite');
    expect(lb).toBeDefined();
    expect(lb?.entries.length).toBeGreaterThanOrEqual(2);
  });

  test('getLeaderboardEntries returns sorted entries', () => {
    const entries = getLeaderboardEntries('aimers-8-model-lite');
    expect(entries.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < entries.length; i++) {
      expect(entries[i].rank).toBeGreaterThanOrEqual(entries[i - 1].rank);
    }
  });

  test('getLeaderboard returns undefined for unknown slug', () => {
    const lb = getLeaderboard('nonexistent');
    expect(lb).toBeUndefined();
  });

  test('getLeaderboardEntries returns empty for unknown slug', () => {
    const entries = getLeaderboardEntries('nonexistent');
    expect(entries).toHaveLength(0);
  });
});
