/**
 * Unit tests for hackathonStore
 */
import { getAllHackathons, getHackathonBySlug, getHackathonDetail, filterHackathons, getAllTags } from '@/lib/store/hackathonStore';
import { seedAll } from '@/lib/seed';

// Mock localStorage
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

describe('hackathonStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    seedAll();
  });

  test('getAllHackathons returns seeded hackathons', () => {
    const hackathons = getAllHackathons();
    expect(hackathons).toHaveLength(3);
  });

  test('getHackathonBySlug returns correct hackathon', () => {
    const h = getHackathonBySlug('aimers-8-model-lite');
    expect(h).toBeDefined();
    expect(h?.title).toContain('Aimers');
  });

  test('getHackathonBySlug returns undefined for unknown slug', () => {
    const h = getHackathonBySlug('unknown-slug');
    expect(h).toBeUndefined();
  });

  test('getHackathonDetail returns detail with sections', () => {
    const d = getHackathonDetail('aimers-8-model-lite');
    expect(d).toBeDefined();
    expect(d?.sections.overview).toBeDefined();
    expect(d?.sections.eval).toBeDefined();
    expect(d?.sections.schedule).toBeDefined();
    expect(d?.sections.prize).toBeDefined();
    expect(d?.sections.teams).toBeDefined();
    expect(d?.sections.submit).toBeDefined();
    expect(d?.sections.leaderboard).toBeDefined();
  });

  test('filterHackathons by status', () => {
    const ended = filterHackathons('ended');
    expect(ended.length).toBeGreaterThanOrEqual(1);
    ended.forEach((h) => expect(h.status).toBe('ended'));

    const ongoing = filterHackathons('ongoing');
    expect(ongoing.length).toBeGreaterThanOrEqual(1);
    ongoing.forEach((h) => expect(h.status).toBe('ongoing'));
  });

  test('filterHackathons by tag', () => {
    const llm = filterHackathons(undefined, 'LLM');
    expect(llm.length).toBeGreaterThanOrEqual(1);
    llm.forEach((h) => expect(h.tags).toContain('LLM'));
  });

  test('filterHackathons with "all" returns all', () => {
    const all = filterHackathons('all', 'all');
    expect(all).toHaveLength(3);
  });

  test('getAllTags returns unique sorted tags', () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    // should be sorted
    for (let i = 1; i < tags.length; i++) {
      expect(tags[i] >= tags[i - 1]).toBe(true);
    }
  });
});
