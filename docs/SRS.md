# SRS (Software Requirements Specification)

## 1. 프로젝트 개요
- **프로젝트명**: Daker Hackathon Web
- **목적**: 해커톤 플랫폼 웹 애플리케이션 – 해커톤 목록/상세, 팀 모집, 랭킹 등을 제공
- **저장소**: https://github.com/oksk1111/daker_hackaton_web
- **배포**: Vercel

## 2. 기술 스택
| 항목 | 기술 |
|------|------|
| 프레임워크 | Next.js 14+ (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 상태/저장 | localStorage (클라이언트 전용) |
| 유틸리티 | date-fns, uuid |
| 테스트 | Jest, React Testing Library |
| 린팅 | ESLint (Next.js preset) |
| 배포 | Vercel |
| 패키지매니저 | npm |

## 3. 프로젝트 구조
```
daker_hackerthon_web/
├── docs/
│   └── SRS.md                  # 기술 명세
├── data/
│   └── 예시자료/                 # 예시 JSON 데이터
│       ├── public_hackathons.json
│       ├── public_hackathon_detail.json
│       ├── public_leaderboard.json
│       └── public_teams.json
├── public/                      # 정적 파일
├── src/
│   ├── app/                     # Next.js App Router 페이지
│   │   ├── layout.tsx           # 글로벌 레이아웃 (Navbar 포함)
│   │   ├── page.tsx             # 메인 페이지 (/)
│   │   ├── hackathons/
│   │   │   ├── page.tsx         # 해커톤 목록 (/hackathons)
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # 해커톤 상세 (/hackathons/:slug)
│   │   ├── camp/
│   │   │   └── page.tsx         # 팀원 모집 (/camp)
│   │   └── rankings/
│   │       └── page.tsx         # 랭킹 (/rankings)
│   ├── components/              # 재사용 UI 컴포넌트
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── common/
│   │   │   ├── StatusHandler.tsx
│   │   │   └── HeroCard.tsx
│   │   ├── hackathon/
│   │   │   ├── HackathonCard.tsx
│   │   │   ├── OverviewSection.tsx
│   │   │   ├── EvalSection.tsx
│   │   │   ├── ScheduleSection.tsx
│   │   │   ├── PrizeSection.tsx
│   │   │   ├── TeamsSection.tsx
│   │   │   ├── SubmitSection.tsx
│   │   │   └── LeaderboardSection.tsx
│   │   ├── camp/
│   │   │   ├── TeamCard.tsx
│   │   │   └── TeamForm.tsx
│   │   └── rankings/
│   │       └── RankingTable.tsx
│   ├── lib/                     # 비즈니스 로직 / 스토어
│   │   ├── types.ts             # 전역 TypeScript 타입 정의
│   │   ├── seed.ts              # 초기 데이터 시딩
│   │   ├── store/
│   │   │   ├── hackathonStore.ts
│   │   │   ├── teamStore.ts
│   │   │   ├── submissionStore.ts
│   │   │   ├── leaderboardStore.ts
│   │   │   └── rankingStore.ts
│   │   └── utils.ts             # 공통 유틸 함수
│   └── __tests__/               # 테스트 코드
│       ├── unit/
│       │   ├── hackathonStore.test.ts
│       │   ├── teamStore.test.ts
│       │   ├── submissionStore.test.ts
│       │   ├── leaderboardStore.test.ts
│       │   └── components/
│       │       ├── Navbar.test.tsx
│       │       ├── HackathonCard.test.tsx
│       │       └── TeamCard.test.tsx
│       └── integration/
│           └── app.integration.test.tsx
├── specification.md             # 기능 명세서
├── jest.config.ts               # Jest 설정
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── vercel.json                  # Vercel 배포 설정
```

## 4. 데이터 모델

### 4.1 Hackathon (해커톤)
```typescript
interface Hackathon {
  slug: string;
  title: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  tags: string[];
  thumbnailUrl: string;
  period: {
    timezone: string;
    submissionDeadlineAt: string;
    endAt: string;
  };
  links: {
    detail: string;
    rules: string;
    faq: string;
  };
}
```

### 4.2 HackathonDetail (해커톤 상세)
```typescript
interface HackathonDetail {
  slug: string;
  title: string;
  sections: {
    overview: { summary: string; teamPolicy: { allowSolo: boolean; maxTeamSize: number } };
    info: { notice: string[]; links: { rules: string; faq: string } };
    eval: { metricName: string; description: string; ... };
    schedule: { timezone: string; milestones: { name: string; at: string }[] };
    prize: { items: { place: string; amountKRW: number }[] };
    teams: { campEnabled: boolean; listUrl: string };
    submit: { allowedArtifactTypes: string[]; guide: string[]; ... };
    leaderboard: { publicLeaderboardUrl: string; note: string };
  };
}
```

### 4.3 Team (팀)
```typescript
interface Team {
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
```

### 4.4 LeaderboardEntry (리더보드)
```typescript
interface LeaderboardEntry {
  rank: number;
  teamName: string;
  score: number;
  submittedAt: string;
  scoreBreakdown?: Record<string, number>;
  artifacts?: { webUrl?: string; pdfUrl?: string; planTitle?: string };
}
```

### 4.5 Submission (제출)
```typescript
interface Submission {
  id: string;
  hackathonSlug: string;
  teamName: string;
  notes?: string;
  fileType: string;
  fileName: string;
  submittedAt: string;
}
```

## 5. 페이지별 요구사항
[specification.md 참조](../specification.md)

## 6. 데이터 저장 방식
- **localStorage** 기반 클라이언트 전용 저장소
- 키: `hackathons`, `hackathonDetails`, `teams`, `leaderboards`, `submissions`
- 앱 초기 로딩 시 데이터가 없으면 시드 데이터 자동 주입

## 7. 배포
- **플랫폼**: Vercel
- **빌드 명령**: `npm run build`
- **출력 디렉터리**: `.next`
- **GitHub**: https://github.com/oksk1111/daker_hackaton_web
