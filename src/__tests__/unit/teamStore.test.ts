/**
 * Unit tests for teamStore
 */
import { getAllTeams, getTeamsByHackathon, getOpenTeams, createTeam, closeTeamRecruitment } from '@/lib/store/teamStore';
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

describe('teamStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    seedAll();
  });

  test('getAllTeams returns seeded teams', () => {
    const teams = getAllTeams();
    expect(teams).toHaveLength(4);
  });

  test('getTeamsByHackathon filters correctly', () => {
    const teams = getTeamsByHackathon('daker-handover-2026-03');
    expect(teams).toHaveLength(2);
    teams.forEach((t) => expect(t.hackathonSlug).toBe('daker-handover-2026-03'));
  });

  test('getOpenTeams returns only open teams', () => {
    const open = getOpenTeams();
    open.forEach((t) => expect(t.isOpen).toBe(true));
    expect(open.length).toBeGreaterThanOrEqual(3);
  });

  test('createTeam adds a new team', () => {
    const before = getAllTeams().length;
    const newTeam = createTeam({
      hackathonSlug: 'aimers-8-model-lite',
      name: 'Test Team',
      intro: 'A test team',
      isOpen: true,
      lookingFor: ['Frontend'],
      contactUrl: 'https://example.com',
    });

    expect(newTeam.name).toBe('Test Team');
    expect(newTeam.teamCode).toBeTruthy();
    expect(getAllTeams().length).toBe(before + 1);
  });

  test('closeTeamRecruitment sets isOpen to false', () => {
    const teams = getAllTeams();
    const openTeam = teams.find((t) => t.isOpen);
    expect(openTeam).toBeDefined();

    closeTeamRecruitment(openTeam!.teamCode);
    const updated = getAllTeams().find((t) => t.teamCode === openTeam!.teamCode);
    expect(updated?.isOpen).toBe(false);
  });
});
