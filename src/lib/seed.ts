import type {
  Hackathon,
  HackathonDetail,
  Team,
  Leaderboard,
  Submission,
  RankingEntry,
} from './types';
import { setToStorage, getFromStorage } from './utils';

// ── 시드 데이터 ──

const SEED_HACKATHONS: Hackathon[] = [
  {
    slug: 'aimers-8-model-lite',
    title: 'Aimers 8기 : 모델 경량화 온라인 해커톤',
    status: 'ended',
    tags: ['LLM', 'Compression', 'vLLM'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
    period: {
      timezone: 'Asia/Seoul',
      submissionDeadlineAt: '2026-02-25T10:00:00+09:00',
      endAt: '2026-02-26T10:00:00+09:00',
    },
    links: {
      detail: '/hackathons/aimers-8-model-lite',
      rules: '#',
      faq: '#',
    },
  },
  {
    slug: 'monthly-vibe-coding-2026-02',
    title: '월간 해커톤 : 바이브 코딩 개선 AI 아이디어 공모전 (2026.02)',
    status: 'ongoing',
    tags: ['Idea', 'GenAI', 'Workflow'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
    period: {
      timezone: 'Asia/Seoul',
      submissionDeadlineAt: '2026-03-03T10:00:00+09:00',
      endAt: '2026-03-09T10:00:00+09:00',
    },
    links: {
      detail: '/hackathons/monthly-vibe-coding-2026-02',
      rules: '#',
      faq: '#',
    },
  },
  {
    slug: 'daker-handover-2026-03',
    title: '긴급 인수인계 해커톤: 명세서만 보고 구현하라',
    status: 'upcoming',
    tags: ['VibeCoding', 'Web', 'Vercel', 'Handover'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    period: {
      timezone: 'Asia/Seoul',
      submissionDeadlineAt: '2026-03-30T10:00:00+09:00',
      endAt: '2026-04-27T10:00:00+09:00',
    },
    links: {
      detail: '/hackathons/daker-handover-2026-03',
      rules: '#',
      faq: '#',
    },
  },
];

const SEED_HACKATHON_DETAILS: HackathonDetail[] = [
  {
    slug: 'aimers-8-model-lite',
    title: 'Aimers 8기 : 모델 경량화 온라인 해커톤',
    sections: {
      overview: {
        summary: '제한된 평가 환경에서 모델의 성능과 추론 속도를 함께 최적화합니다.',
        teamPolicy: { allowSolo: true, maxTeamSize: 5 },
      },
      info: {
        notice: [
          '제출 마감 이후 추가 제출은 불가합니다.',
          '평가 환경은 고정이며, 제출물은 별도 설치 없이 실행 가능해야 합니다.',
        ],
        links: { rules: '#', faq: '#' },
      },
      eval: {
        metricName: 'FinalScore',
        description: '성능과 속도를 종합한 점수(세부 산식은 규정 참고).',
        limits: { maxRuntimeSec: 1200, maxSubmissionsPerDay: 5 },
      },
      schedule: {
        timezone: 'Asia/Seoul',
        milestones: [
          { name: '리더보드 제출 마감', at: '2026-02-25T10:00:00+09:00' },
          { name: '대회 종료', at: '2026-02-26T10:00:00+09:00' },
        ],
      },
      prize: {
        items: [
          { place: '1st', amountKRW: 3000000 },
          { place: '2nd', amountKRW: 1500000 },
          { place: '3rd', amountKRW: 800000 },
        ],
      },
      teams: { campEnabled: true, listUrl: '/camp?hackathon=aimers-8-model-lite' },
      submit: {
        allowedArtifactTypes: ['zip'],
        submissionUrl: '/hackathons/aimers-8-model-lite#submit',
        guide: [
          '제출물은 규정에 맞는 단일 zip 파일로 업로드합니다.',
          '업로드 후 \'제출\' 버튼을 눌러야 리더보드에 반영됩니다.',
        ],
      },
      leaderboard: {
        publicLeaderboardUrl: '/hackathons/aimers-8-model-lite#leaderboard',
        note: 'Public 리더보드는 제출 마감 시점 기준으로 고정될 수 있습니다(규정 참고).',
      },
    },
  },
  {
    slug: 'monthly-vibe-coding-2026-02',
    title: '월간 해커톤 : 바이브 코딩 개선 AI 아이디어 공모전 (2026.02)',
    sections: {
      overview: {
        summary: 'AI 바이브 코딩 워크플로우 개선 아이디어를 제안합니다.',
        teamPolicy: { allowSolo: true, maxTeamSize: 3 },
      },
      info: {
        notice: ['아이디어 공모전으로 코드 제출은 필수가 아닙니다.'],
        links: { rules: '#', faq: '#' },
      },
      eval: {
        metricName: 'IdeaScore',
        description: '아이디어의 창의성, 실현 가능성, 임팩트를 종합 평가합니다.',
      },
      schedule: {
        timezone: 'Asia/Seoul',
        milestones: [
          { name: '제출 마감', at: '2026-03-03T10:00:00+09:00' },
          { name: '결과 발표', at: '2026-03-09T10:00:00+09:00' },
        ],
      },
      prize: {
        items: [
          { place: '1st', amountKRW: 1000000 },
          { place: '2nd', amountKRW: 500000 },
        ],
      },
      teams: { campEnabled: true, listUrl: '/camp?hackathon=monthly-vibe-coding-2026-02' },
      submit: {
        allowedArtifactTypes: ['pdf', 'text'],
        submissionUrl: '/hackathons/monthly-vibe-coding-2026-02#submit',
        guide: ['아이디어를 PDF 또는 텍스트로 제출합니다.'],
      },
      leaderboard: {
        publicLeaderboardUrl: '/hackathons/monthly-vibe-coding-2026-02#leaderboard',
        note: '아이디어 해커톤의 점수는 심사위원 평가 결과로 표시됩니다.',
      },
    },
  },
  {
    slug: 'daker-handover-2026-03',
    title: '긴급 인수인계 해커톤: 명세서만 보고 구현하라',
    sections: {
      overview: {
        summary: '기능 명세서만 남기고 사라진 개발자의 문서를 기반으로 바이브 코딩을 통해 웹서비스를 구현·배포하는 해커톤입니다.',
        teamPolicy: { allowSolo: true, maxTeamSize: 5 },
      },
      info: {
        notice: [
          '예시 자료 외 데이터는 제공되지 않습니다.',
          '더미 데이터/로컬 저장소(localStorage 등)를 활용해 구현하세요.',
          '배포 URL은 외부에서 접속 가능해야하며 심사 기간동안 접근 가능해야합니다.',
          '외부 API/외부 DB를 쓰는 경우에도 심사자가 별도 키 없이 확인 가능해야 합니다.',
        ],
        links: { rules: '#', faq: '#' },
      },
      eval: {
        metricName: 'FinalScore',
        description: '참가팀/심사위원 투표 점수를 가중치로 합산한 최종 점수',
        scoreSource: 'vote',
        scoreDisplay: {
          label: '투표 점수',
          breakdown: [
            { key: 'participant', label: '참가자', weightPercent: 30 },
            { key: 'judge', label: '심사위원', weightPercent: 70 },
          ],
        },
      },
      schedule: {
        timezone: 'Asia/Seoul',
        milestones: [
          { name: '접수/기획서 제출 기간', at: '2026-03-04T10:00:00+09:00' },
          { name: '접수/기획서 제출 마감', at: '2026-03-30T10:00:00+09:00' },
          { name: '최종 웹링크 제출 마감', at: '2026-04-06T10:00:00+09:00' },
          { name: '최종 솔루션 PDF 제출 마감', at: '2026-04-13T10:00:00+09:00' },
          { name: '1차 투표평가 시작', at: '2026-04-13T12:00:00+09:00' },
          { name: '1차 투표평가 마감', at: '2026-04-17T10:00:00+09:00' },
          { name: '2차 내부평가 종료', at: '2026-04-24T23:59:00+09:00' },
          { name: '최종 결과 발표', at: '2026-04-27T10:00:00+09:00' },
        ],
      },
      prize: {
        items: [
          { place: '1st', amountKRW: 5000000 },
          { place: '2nd', amountKRW: 3000000 },
          { place: '3rd', amountKRW: 1000000 },
        ],
      },
      teams: { campEnabled: true, listUrl: '/camp?hackathon=daker-handover-2026-03' },
      submit: {
        allowedArtifactTypes: ['text', 'url', 'pdf'],
        submissionUrl: '/hackathons/daker-handover-2026-03#submit',
        guide: [
          '기획서 → 웹링크 → PDF를 단계별로 제출합니다.',
          '배포 URL은 외부에서 접속 가능해야 하며 심사 기간 동안 접근 가능해야 합니다.',
          'PPT는 PDF로 변환하여 제출합니다.',
        ],
        submissionItems: [
          { key: 'plan', title: '기획서(1차 제출)', format: 'text_or_url' },
          { key: 'web', title: '최종 웹링크 제출', format: 'url' },
          { key: 'pdf', title: '최종 솔루션 PDF 제출', format: 'pdf_url' },
        ],
      },
      leaderboard: {
        publicLeaderboardUrl: '/hackathons/daker-handover-2026-03#leaderboard',
        note: '아이디어 해커톤의 점수(score)는 투표 결과를 기반으로 표시됩니다.',
      },
    },
  },
];

const SEED_TEAMS: Team[] = [
  {
    teamCode: 'T-ALPHA',
    hackathonSlug: 'aimers-8-model-lite',
    name: 'Team Alpha',
    isOpen: true,
    memberCount: 3,
    lookingFor: ['Backend', 'ML Engineer'],
    intro: '추론 최적화/경량화 실험을 함께 진행할 팀원을 찾습니다.',
    contact: { type: 'link', url: 'https://open.kakao.com/o/example1' },
    createdAt: '2026-02-20T11:00:00+09:00',
  },
  {
    teamCode: 'T-BETA',
    hackathonSlug: 'monthly-vibe-coding-2026-02',
    name: 'PromptRunners',
    isOpen: true,
    memberCount: 1,
    lookingFor: ['Frontend', 'Designer'],
    intro: '프롬프트 품질 점수화 + 개선 가이드 UX를 기획합니다.',
    contact: { type: 'link', url: 'https://forms.gle/example2' },
    createdAt: '2026-02-18T18:30:00+09:00',
  },
  {
    teamCode: 'T-HANDOVER-01',
    hackathonSlug: 'daker-handover-2026-03',
    name: '404found',
    isOpen: true,
    memberCount: 3,
    lookingFor: ['Frontend', 'Designer'],
    intro: '명세서 기반으로 기본 기능을 빠르게 완성하고 UX 확장을 노립니다.',
    contact: { type: 'link', url: 'https://open.kakao.com/o/example3' },
    createdAt: '2026-03-04T11:00:00+09:00',
  },
  {
    teamCode: 'T-HANDOVER-02',
    hackathonSlug: 'daker-handover-2026-03',
    name: 'LGTM',
    isOpen: false,
    memberCount: 5,
    lookingFor: [],
    intro: '기획서-구현-문서화를 깔끔하게 맞추는 방향으로 진행합니다.',
    contact: { type: 'link', url: 'https://forms.gle/example4' },
    createdAt: '2026-03-05T09:20:00+09:00',
  },
];

const SEED_LEADERBOARDS: Leaderboard[] = [
  {
    hackathonSlug: 'aimers-8-model-lite',
    updatedAt: '2026-02-26T10:00:00+09:00',
    entries: [
      { rank: 1, teamName: 'Team Alpha', score: 0.7421, submittedAt: '2026-02-24T21:05:00+09:00' },
      { rank: 2, teamName: 'Team Gamma', score: 0.7013, submittedAt: '2026-02-25T09:40:00+09:00' },
    ],
  },
  {
    hackathonSlug: 'daker-handover-2026-03',
    updatedAt: '2026-04-17T10:00:00+09:00',
    entries: [
      {
        rank: 1,
        teamName: '404found',
        score: 87.5,
        submittedAt: '2026-04-13T09:58:00+09:00',
        scoreBreakdown: { participant: 82, judge: 90 },
        artifacts: { webUrl: 'https://404found.vercel.app', pdfUrl: '#', planTitle: '404found 기획서' },
      },
      {
        rank: 2,
        teamName: 'LGTM',
        score: 84.2,
        submittedAt: '2026-04-13T09:40:00+09:00',
        scoreBreakdown: { participant: 79, judge: 88 },
        artifacts: { webUrl: 'https://lgtm-hack.vercel.app', pdfUrl: '#', planTitle: 'LGTM 기획서' },
      },
    ],
  },
];

const SEED_RANKINGS: RankingEntry[] = [
  { rank: 1, nickname: 'alpha_dev', points: 1520 },
  { rank: 2, nickname: '404found_lead', points: 1380 },
  { rank: 3, nickname: 'lgtm_master', points: 1250 },
  { rank: 4, nickname: 'prompt_runner', points: 980 },
  { rank: 5, nickname: 'gamma_ai', points: 870 },
  { rank: 6, nickname: 'vibe_coder', points: 760 },
  { rank: 7, nickname: 'ml_ninja', points: 650 },
  { rank: 8, nickname: 'hack_queen', points: 540 },
  { rank: 9, nickname: 'data_smith', points: 430 },
  { rank: 10, nickname: 'code_wave', points: 320 },
];

// ── 시딩 함수 ──

export function seedAll(): void {
  if (!getFromStorage<Hackathon[] | null>('hackathons', null)) {
    setToStorage('hackathons', SEED_HACKATHONS);
  }
  if (!getFromStorage<HackathonDetail[] | null>('hackathonDetails', null)) {
    setToStorage('hackathonDetails', SEED_HACKATHON_DETAILS);
  }
  if (!getFromStorage<Team[] | null>('teams', null)) {
    setToStorage('teams', SEED_TEAMS);
  }
  if (!getFromStorage<Leaderboard[] | null>('leaderboards', null)) {
    setToStorage('leaderboards', SEED_LEADERBOARDS);
  }
  if (!getFromStorage<Submission[] | null>('submissions', null)) {
    setToStorage('submissions', [] as Submission[]);
  }
  if (!getFromStorage<RankingEntry[] | null>('rankings', null)) {
    setToStorage('rankings', SEED_RANKINGS);
  }
}
