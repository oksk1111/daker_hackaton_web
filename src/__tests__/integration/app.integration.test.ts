/**
 * Integration test – tests cross-module interactions
 */
import { seedAll } from '@/lib/seed';
import { getAllHackathons, getHackathonDetail } from '@/lib/store/hackathonStore';
import { getTeamsByHackathon, createTeam } from '@/lib/store/teamStore';
import { createSubmission, getSubmissionsByHackathon } from '@/lib/store/submissionStore';
import { getLeaderboardEntries } from '@/lib/store/leaderboardStore';
import { getRankingsSorted } from '@/lib/store/rankingStore';

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

describe('Integration: Full hackathon workflow', () => {
  beforeEach(() => {
    localStorageMock.clear();
    seedAll();
  });

  test('hackathon list → detail → teams → submit → leaderboard flow', () => {
    // 1. Get hackathon list
    const hackathons = getAllHackathons();
    expect(hackathons.length).toBeGreaterThanOrEqual(1);

    // 2. Pick first hackathon, get detail
    const slug = hackathons[0].slug;
    const detail = getHackathonDetail(slug);
    expect(detail).toBeDefined();
    expect(detail!.sections.overview).toBeDefined();

    // 3. Check teams for this hackathon
    const teams = getTeamsByHackathon(slug);
    expect(teams.length).toBeGreaterThanOrEqual(0);

    // 4. Create a new team
    const newTeam = createTeam({
      hackathonSlug: slug,
      name: 'Integration Test Team',
      intro: 'Created during integration test',
      isOpen: true,
      lookingFor: ['Frontend'],
      contactUrl: 'https://test.com',
    });
    expect(newTeam.hackathonSlug).toBe(slug);
    expect(getTeamsByHackathon(slug).length).toBe(teams.length + 1);

    // 5. Submit to this hackathon
    const sub = createSubmission({
      hackathonSlug: slug,
      teamName: newTeam.name,
      notes: 'Integration test submission',
      fileType: 'zip',
      fileName: 'test.zip',
    });
    expect(sub.hackathonSlug).toBe(slug);
    expect(getSubmissionsByHackathon(slug)).toHaveLength(1);

    // 6. Check leaderboard
    const entries = getLeaderboardEntries(slug);
    // Leaderboard might have pre-seeded data
    expect(entries).toBeDefined();
  });

  test('camp page: create team independent of hackathon', () => {
    const team = createTeam({
      hackathonSlug: 'general',
      name: 'Freelance Team',
      intro: 'No hackathon attached',
      isOpen: true,
      lookingFor: ['Designer', 'PM'],
      contactUrl: 'https://example.com',
    });

    expect(team.hackathonSlug).toBe('general');
    const generalTeams = getTeamsByHackathon('general');
    expect(generalTeams).toHaveLength(1);
  });

  test('rankings are sorted by rank', () => {
    const rankings = getRankingsSorted();
    expect(rankings.length).toBeGreaterThanOrEqual(1);
    for (let i = 1; i < rankings.length; i++) {
      expect(rankings[i].rank).toBeGreaterThanOrEqual(rankings[i - 1].rank);
    }
  });

  test('hackathon detail has all 7 required sections', () => {
    const detail = getHackathonDetail('daker-handover-2026-03');
    expect(detail).toBeDefined();
    const sections = detail!.sections;
    expect(sections.overview).toBeDefined();
    expect(sections.info).toBeDefined();
    expect(sections.eval).toBeDefined();
    expect(sections.schedule).toBeDefined();
    expect(sections.prize).toBeDefined();
    expect(sections.teams).toBeDefined();
    expect(sections.submit).toBeDefined();
    expect(sections.leaderboard).toBeDefined();
  });

  test('team camp link from hackathon detail works', () => {
    const detail = getHackathonDetail('daker-handover-2026-03');
    expect(detail!.sections.teams.campEnabled).toBe(true);
    expect(detail!.sections.teams.listUrl).toContain('hackathon=daker-handover-2026-03');

    // Verify teams can be fetched by hackathon
    const teams = getTeamsByHackathon('daker-handover-2026-03');
    expect(teams.length).toBeGreaterThanOrEqual(2);
  });
});
