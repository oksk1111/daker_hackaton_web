// ──────────────────────────────────────────
// Global TypeScript type definitions
// ──────────────────────────────────────────

/* ── Hackathon (목록용) ── */
export interface HackathonPeriod {
  timezone: string;
  submissionDeadlineAt: string;
  endAt: string;
}

export interface HackathonLinks {
  detail: string;
  rules: string;
  faq: string;
}

export interface Hackathon {
  slug: string;
  title: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  tags: string[];
  thumbnailUrl: string;
  period: HackathonPeriod;
  links: HackathonLinks;
}

/* ── Hackathon Detail (상세용) ── */
export interface TeamPolicy {
  allowSolo: boolean;
  maxTeamSize: number;
}

export interface OverviewSection {
  summary: string;
  teamPolicy: TeamPolicy;
}

export interface InfoSection {
  notice: string[];
  links: { rules: string; faq: string };
}

export interface EvalSection {
  metricName: string;
  description: string;
  limits?: { maxRuntimeSec?: number; maxSubmissionsPerDay?: number };
  scoreSource?: string;
  scoreDisplay?: {
    label: string;
    breakdown: { key: string; label: string; weightPercent: number }[];
  };
}

export interface Milestone {
  name: string;
  at: string;
}

export interface ScheduleSection {
  timezone: string;
  milestones: Milestone[];
}

export interface PrizeItem {
  place: string;
  amountKRW: number;
}

export interface PrizeSection {
  items: PrizeItem[];
}

export interface TeamsLinkSection {
  campEnabled: boolean;
  listUrl: string;
}

export interface SubmissionItem {
  key: string;
  title: string;
  format: string;
}

export interface SubmitSection {
  allowedArtifactTypes: string[];
  submissionUrl: string;
  guide: string[];
  submissionItems?: SubmissionItem[];
}

export interface LeaderboardMeta {
  publicLeaderboardUrl: string;
  note: string;
}

export interface HackathonSections {
  overview: OverviewSection;
  info: InfoSection;
  eval: EvalSection;
  schedule: ScheduleSection;
  prize: PrizeSection;
  teams: TeamsLinkSection;
  submit: SubmitSection;
  leaderboard: LeaderboardMeta;
}

export interface HackathonDetail {
  slug: string;
  title: string;
  sections: HackathonSections;
}

/* ── Team (팀) ── */
export interface Team {
  teamCode: string;
  hackathonSlug: string;
  name: string;
  isOpen: boolean;
  memberCount: number;
  lookingFor: string[];
  intro: string;
  contact: { type: string; url: string };
  createdAt: string;
}

/* ── Leaderboard ── */
export interface LeaderboardArtifacts {
  webUrl?: string;
  pdfUrl?: string;
  planTitle?: string;
}

export interface LeaderboardEntry {
  rank: number;
  teamName: string;
  score: number;
  submittedAt: string;
  scoreBreakdown?: Record<string, number>;
  artifacts?: LeaderboardArtifacts;
}

export interface Leaderboard {
  hackathonSlug: string;
  updatedAt: string;
  entries: LeaderboardEntry[];
}

/* ── Submission (제출) ── */
export interface Submission {
  id: string;
  hackathonSlug: string;
  teamName: string;
  notes?: string;
  fileType: string;
  fileName: string;
  submittedAt: string;
}

/* ── Ranking (글로벌 랭킹) ── */
export interface RankingEntry {
  rank: number;
  nickname: string;
  points: number;
}
