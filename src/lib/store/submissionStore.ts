import type { Submission } from '../types';
import { getFromStorage, setToStorage } from '../utils';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

const STORAGE_KEY = 'submissions';

export function getAllSubmissions(): Submission[] {
  return getFromStorage<Submission[]>(STORAGE_KEY, []);
}

export function getSubmissionsByHackathon(hackathonSlug: string): Submission[] {
  return getAllSubmissions().filter((s) => s.hackathonSlug === hackathonSlug);
}

export function createSubmission(data: {
  hackathonSlug: string;
  teamName: string;
  notes?: string;
  fileType: string;
  fileName: string;
}): Submission {
  const submissions = getAllSubmissions();
  const newSubmission: Submission = {
    id: generateId(),
    hackathonSlug: data.hackathonSlug,
    teamName: data.teamName,
    notes: data.notes,
    fileType: data.fileType,
    fileName: data.fileName,
    submittedAt: new Date().toISOString(),
  };
  submissions.push(newSubmission);
  setToStorage(STORAGE_KEY, submissions);
  return newSubmission;
}
