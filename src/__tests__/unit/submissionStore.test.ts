/**
 * Unit tests for submissionStore
 */
import { getAllSubmissions, getSubmissionsByHackathon, createSubmission } from '@/lib/store/submissionStore';
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

describe('submissionStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    seedAll();
  });

  test('getAllSubmissions returns empty initially', () => {
    const subs = getAllSubmissions();
    expect(subs).toHaveLength(0);
  });

  test('createSubmission adds a submission', () => {
    const sub = createSubmission({
      hackathonSlug: 'aimers-8-model-lite',
      teamName: 'Team Alpha',
      notes: 'Test submission',
      fileType: 'zip',
      fileName: 'solution.zip',
    });

    expect(sub.id).toBeTruthy();
    expect(sub.hackathonSlug).toBe('aimers-8-model-lite');
    expect(getAllSubmissions()).toHaveLength(1);
  });

  test('getSubmissionsByHackathon filters correctly', () => {
    createSubmission({
      hackathonSlug: 'aimers-8-model-lite',
      teamName: 'Team Alpha',
      fileType: 'zip',
      fileName: 'solution.zip',
    });
    createSubmission({
      hackathonSlug: 'daker-handover-2026-03',
      teamName: '404found',
      fileType: 'url',
      fileName: 'https://example.com',
    });

    const aimers = getSubmissionsByHackathon('aimers-8-model-lite');
    expect(aimers).toHaveLength(1);
    expect(aimers[0].teamName).toBe('Team Alpha');
  });
});
