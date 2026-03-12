import type { Team } from '../types';
import { getFromStorage, setToStorage } from '../utils';

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

const STORAGE_KEY = 'teams';

export function getAllTeams(): Team[] {
  return getFromStorage<Team[]>(STORAGE_KEY, []);
}

export function getTeamsByHackathon(hackathonSlug: string): Team[] {
  return getAllTeams().filter((t) => t.hackathonSlug === hackathonSlug);
}

export function getOpenTeams(): Team[] {
  return getAllTeams().filter((t) => t.isOpen);
}

export function createTeam(data: {
  hackathonSlug: string;
  name: string;
  intro: string;
  isOpen: boolean;
  lookingFor: string[];
  contactUrl: string;
}): Team {
  const teams = getAllTeams();
  const newTeam: Team = {
    teamCode: `T-${generateId().slice(0, 8).toUpperCase()}`,
    hackathonSlug: data.hackathonSlug,
    name: data.name,
    isOpen: data.isOpen,
    memberCount: 1,
    lookingFor: data.lookingFor,
    intro: data.intro,
    contact: { type: 'link', url: data.contactUrl },
    createdAt: new Date().toISOString(),
  };
  teams.push(newTeam);
  setToStorage(STORAGE_KEY, teams);
  return newTeam;
}

export function closeTeamRecruitment(teamCode: string): void {
  const teams = getAllTeams();
  const idx = teams.findIndex((t) => t.teamCode === teamCode);
  if (idx !== -1) {
    teams[idx].isOpen = false;
    setToStorage(STORAGE_KEY, teams);
  }
}
