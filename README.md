# 🏆 Daker Hackathon Platform

> **Daker 월간 해커톤: 긴급 인수인계 프로젝트**  
> 명세서만 보고 바이브 코딩으로 해커톤 플랫폼 웹서비스 구현

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat&logo=vercel)](https://dakerhackaton-lho0njgu2-sunkimins-projects.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)

**🔗 배포 URL**: [https://dakerhackaton-lho0njgu2-sunkimins-projects.vercel.app](https://dakerhackaton-lho0njgu2-sunkimins-projects.vercel.app)

---

## 📖 목차

1. [서비스 개요](#-서비스-개요)
2. [페이지 구성](#-페이지-구성)
3. [시스템 구성](#-시스템-구성)
4. [핵심 기능 명세](#-핵심-기능-명세)
5. [주요 사용 흐름](#-주요-사용-흐름)
6. [개발 및 개선 계획](#-개발-및-개선-계획)
7. [시작하기](#-시작하기)
8. [테스트](#-테스트)

---

## 🎯 서비스 개요

### 프로젝트 배경
본 프로젝트는 **Daker 월간 해커톤 (2026.03 - 긴급 인수인계 해커톤)** 제출작으로, 기능 명세서(`specification.md`)만 제공받아 실제 동작하는 해커톤 플랫폼 웹서비스를 구현한 프로젝트입니다.

### 서비스 목적
해커톤 참가자들이 **해커톤 정보 조회**, **팀원 모집**, **제출 및 리더보드 확인**, **전체 랭킹 조회**를 한 곳에서 수행할 수 있는 통합 플랫폼을 제공합니다.

### 주요 특징
- ✅ **Freshworks 기반 모던 디자인 시스템** - 깔끔하고 전문적인 UI/UX
- ✅ **완전한 클라이언트 사이드 동작** - localStorage 기반 데이터 관리
- ✅ **반응형 디자인** - 모바일/태블릿/데스크톱 최적화
- ✅ **타입 안전성** - TypeScript 100% 적용
- ✅ **테스트 커버리지** - Jest + React Testing Library
- ✅ **즉시 배포 가능** - Vercel 자동 배포 설정

---

## 📄 페이지 구성

### 1. 메인 페이지 (`/`)
- **Hero 섹션**: Freshworks 스타일의 대형 히어로 영역
- **핵심 기능 카드**: 해커톤 보기 / 팀 찾기 / 랭킹 보기
- **통계 정보**: 해커톤 수, 팀 수, 참가자 수

### 2. 해커톤 목록 (`/hackathons`)
- **필터링**: 상태별(예정/진행중/종료), 태그별 필터
- **해커톤 카드**: 썸네일, 제목, 상태 배지, 태그, 기간 정보
- **반응형 그리드**: 3열 → 2열 → 1열 레이아웃

### 3. 해커톤 상세 (`/hackathons/[slug]`)
7개의 섹션으로 구성된 상세 페이지:
- **개요/안내**: 해커톤 요약, 팀 정책, 유의사항
- **평가**: 평가 지표, 점수 계산 방식, 제출 제한
- **일정**: 타임라인 형식의 마일스톤
- **상금**: 순위별 상금 정보
- **팀**: 등록된 팀 목록, 팀 모집 페이지 연결
- **제출**: 제출 가이드, 제출 폼 (팀명, 메모, 파일/URL)
- **리더보드**: 실시간 순위, 점수, 제출 시간, 웹 링크

### 4. 팀원 모집 (`/camp`)
- **팀 생성 폼**: 팀명, 소개, 포지션, 연락처, 모집 상태
- **팀 카드 목록**: 팀 정보, 모집 포지션, 연락 버튼
- **해커톤 필터**: 특정 해커톤의 팀만 조회 (`?hackathon=slug`)

### 5. 랭킹 (`/rankings`)
- **전체 랭킹 테이블**: 순위, 닉네임, 포인트
- **기간 필터**: 전체 / 최근 30일 / 최근 7일
- **상위권 강조**: Top 3 시각적 강조

---

## 🏗️ 시스템 구성

### 기술 스택

| 분류 | 기술 | 버전 | 용도 |
|------|------|------|------|
| **프레임워크** | Next.js | 16.1.6 | React 기반 SSR/SSG |
| **언어** | TypeScript | 5.x | 타입 안전성 |
| **스타일링** | Tailwind CSS | 4.x | 유틸리티 기반 CSS |
| **상태 관리** | localStorage | - | 클라이언트 데이터 저장 |
| **날짜 처리** | date-fns | 4.1.0 | 날짜 포맷/계산 |
| **유틸리티** | uuid | 13.0.0 | 고유 ID 생성 |
| **테스팅** | Jest + RTL | 30.x / 16.x | 단위/통합 테스트 |
| **린팅** | ESLint | 9.x | 코드 품질 |
| **배포** | Vercel | - | CI/CD 자동화 |

### 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
├─────────────────────────────────────────────────────────┤
│  Pages (SSG/CSR)                                         │
│  ├─ / (Home)              → HeroCard                     │
│  ├─ /hackathons           → HackathonCard + Filters     │
│  ├─ /hackathons/[slug]    → 7 Sections                  │
│  ├─ /camp                 → TeamCard + TeamForm          │
│  └─ /rankings             → RankingTable                 │
├─────────────────────────────────────────────────────────┤
│  Components (Reusable UI)                                │
│  ├─ layout/    Navbar, Footer                            │
│  ├─ common/    StatusHandler, HeroCard                   │
│  ├─ hackathon/ 7개 섹션 컴포넌트                           │
│  ├─ camp/      TeamCard, TeamForm                        │
│  └─ rankings/  RankingTable                              │
├─────────────────────────────────────────────────────────┤
│  Business Logic (lib/)                                   │
│  ├─ types.ts           전역 타입 정의                       │
│  ├─ utils.ts           공통 유틸 함수                       │
│  ├─ seed.ts            초기 데이터 시딩                     │
│  └─ store/             데이터 CRUD 로직                    │
│     ├─ hackathonStore.ts                                 │
│     ├─ teamStore.ts                                      │
│     ├─ submissionStore.ts                                │
│     ├─ leaderboardStore.ts                               │
│     └─ rankingStore.ts                                   │
├─────────────────────────────────────────────────────────┤
│               localStorage (Data Layer)                  │
│  ├─ hackathons         해커톤 목록                          │
│  ├─ hackathonDetails   해커톤 상세                          │
│  ├─ teams              팀 모집글                            │
│  ├─ submissions        제출 내역                            │
│  ├─ leaderboards       리더보드                             │
│  └─ rankings           전체 랭킹                            │
└─────────────────────────────────────────────────────────┘
```

### 프로젝트 구조

```
daker_hackerthon_web/
├── design.json              # 디자인 시스템 명세
├── specification.md         # 기능 명세서
├── public/
│   └── images/              # SVG 아이콘, 일러스트
├── src/
│   ├── app/                 # Next.js App Router 페이지
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   ├── page.tsx         # 메인 페이지
│   │   ├── hackathons/      # 해커톤 목록/상세
│   │   ├── camp/            # 팀 모집
│   │   └── rankings/        # 랭킹
│   ├── components/          # UI 컴포넌트
│   │   ├── layout/          # 레이아웃 (Navbar, Footer)
│   │   ├── common/          # 공통 컴포넌트
│   │   ├── hackathon/       # 해커톤 관련 컴포넌트
│   │   ├── camp/            # 팀 모집 컴포넌트
│   │   └── rankings/        # 랭킹 컴포넌트
│   ├── lib/                 # 비즈니스 로직
│   │   ├── types.ts         # TypeScript 타입
│   │   ├── utils.ts         # 유틸리티
│   │   ├── seed.ts          # 초기 데이터
│   │   └── store/           # 데이터 스토어
│   └── __tests__/           # 테스트 코드
│       ├── unit/            # 단위 테스트
│       └── integration/     # 통합 테스트
├── jest.config.ts
├── tsconfig.json
└── vercel.json              # Vercel 배포 설정
```

---

## ⚙️ 핵심 기능 명세

### 1. 해커톤 관리
- **목록 조회**: 상태/태그 필터링, 반응형 그리드
- **상세 조회**: 7개 섹션으로 구조화된 상세 정보
- **데이터 모델**:
  ```typescript
  interface Hackathon {
    slug: string;
    title: string;
    status: 'upcoming' | 'ongoing' | 'ended';
    tags: string[];
    thumbnailUrl: string;
    period: { timezone, submissionDeadlineAt, endAt };
    links: { detail, rules, faq };
  }
  ```

### 2. 팀 모집
- **팀 생성**: 폼 검증, localStorage 저장
- **팀 목록**: 해커톤별 필터링, 모집 상태 표시
- **연락 기능**: 외부 링크 (오픈카톡/Google Form)
- **데이터 모델**:
  ```typescript
  interface Team {
    teamCode: string;
    hackathonSlug: string;
    name: string;
    isOpen: boolean;
    memberCount: number;
    lookingFor: string[];
    intro: string;
    contact: { type, url };
    createdAt: string;
  }
  ```

### 3. 제출 및 리더보드
- **제출 폼**: 팀명, 메모, 파일/URL 입력
- **리더보드**: 순위별 정렬, 제출 시간, 웹 링크
- **미제출 팀 표시**: 참가했으나 제출 안 한 팀 구분
- **데이터 모델**:
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
  
  interface LeaderboardEntry {
    rank: number;
    teamName: string;
    score: number;
    submittedAt: string;
    scoreBreakdown?: Record<string, number>;
    artifacts?: { webUrl, pdfUrl, planTitle };
  }
  ```

### 4. 전체 랭킹
- **포인트 기반 순위**: 해커톤 참여/성과 누적
- **기간 필터**: 전체/30일/7일
- **Top 3 강조**: 시각적 차별화
- **데이터 모델**:
  ```typescript
  interface RankingEntry {
    rank: number;
    nickname: string;
    points: number;
  }
  ```

### 5. 공통 기능
- **상태 처리**: 로딩/에러/빈 데이터 핸들링 (StatusHandler)
- **날짜 포맷**: 한국어 형식 (date-fns)
- **반응형 네비게이션**: 모바일 최적화
- **SEO 최적화**: 메타데이터 설정

---

## 🔄 주요 사용 흐름

### Flow 1: 해커톤 참가자의 정보 확인
```
1. 메인 페이지 접속
2. "해커톤 보러가기" 클릭
3. 해커톤 목록에서 관심 해커톤 필터링 (상태/태그)
4. 해커톤 카드 클릭 → 상세 페이지 이동
5. 7개 섹션 탐색 (개요, 평가, 일정, 상금, 팀, 제출, 리더보드)
```

### Flow 2: 팀원 모집
```
1. 해커톤 상세 페이지의 "팀" 섹션 또는 네비게이션의 "팀 모집" 클릭
2. "팀 모집글 작성하기" 버튼 클릭
3. 폼 작성:
   - 해커톤 선택 (선택사항)
   - 팀명, 소개 입력
   - 모집 포지션 선택 (Frontend, Backend, Designer 등)
   - 연락 링크 입력
   - 모집중 체크
4. "등록하기" 클릭 → 팀 카드 목록에 즉시 반영
5. 다른 사용자: "연락하기" 버튼으로 외부 링크 접속
```

### Flow 3: 제출 및 순위 확인
```
1. 해커톤 상세 페이지의 "제출" 섹션 이동
2. 제출 가이드 확인
3. 제출 폼 작성:
   - 팀명 입력
   - 메모 (선택)
   - 파일명/URL 입력
4. "제출하기" 클릭
5. "리더보드" 섹션 이동 → 실시간 순위 확인
6. 웹 링크로 다른 팀 결과물 확인 가능
```

### Flow 4: 전체 랭킹 확인
```
1. 네비게이션의 "랭킹" 클릭
2. 기간 필터 선택 (전체/30일/7일)
3. 순위 테이블에서 본인 순위 확인
4. Top 3 참가자 확인 (시각적 강조)
```

---

## 🚀 개발 및 개선 계획

### 완료된 항목 ✅
- [x] 기능 명세서 기반 전체 페이지 구현
- [x] Freshworks 기반 디자인 시스템 적용
- [x] localStorage 기반 데이터 관리
- [x] 반응형 UI 구현
- [x] 테스트 코드 작성 (단위/통합)
- [x] Vercel 자동 배포 설정
- [x] TypeScript 100% 적용
- [x] 이모지 제거 및 SVG 아이콘 적용

### 다음 단계 개선 계획 📋

#### Phase 1: 사용자 경험 개선
- [ ] 다크 모드 지원
- [ ] 페이지 전환 애니메이션
- [ ] 스켈레톤 로더 추가
- [ ] 검색 기능 (해커톤/팀)
- [ ] 북마크/즐겨찾기 기능

#### Phase 2: 기능 확장
- [ ] 실시간 알림 시스템
- [ ] 팀 채팅 기능 (WebSocket)
- [ ] 파일 업로드 기능 (S3/CDN)
- [ ] 사용자 인증 (OAuth)
- [ ] 팀 멤버 관리 (초대/수락/거절)

#### Phase 3: 백엔드 통합
- [ ] REST API 서버 구축 (Express/Fastify)
- [ ] PostgreSQL/MongoDB 데이터베이스 연동
- [ ] Redis 캐싱 레이어
- [ ] JWT 기반 인증/인가
- [ ] 파일 스토리지 (AWS S3)

#### Phase 4: 고도화
- [ ] 실시간 리더보드 업데이트 (WebSocket)
- [ ] 이메일 알림 (제출 마감, 순위 변동)
- [ ] 관리자 대시보드
- [ ] 통계 및 분석 대시보드
- [ ] 다국어 지원 (i18n)

#### Phase 5: 성능 최적화
- [ ] 이미지 최적화 (Next/Image)
- [ ] 코드 스플리팅 최적화
- [ ] SSR/ISR 전략 적용
- [ ] CDN 설정
- [ ] 성능 모니터링 (Sentry, Vercel Analytics)

---

## 🏃 시작하기

### 환경 요구사항
- Node.js 18.x 이상
- npm 9.x 이상

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/oksk1111/daker_hackaton_web.git
cd daker_hackaton_web

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 열기
# http://localhost:3000
```

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 🧪 테스트

```bash
# 전체 테스트
npm test

# 유닛 테스트만
npm run test:unit

# 통합 테스트만
npm run test:integration

# 커버리지 포함
npm run test:coverage

# Watch 모드
npm run test:watch
```

### 테스트 커버리지
- **Store 로직**: hackathonStore, teamStore, submissionStore, leaderboardStore, rankingStore
- **컴포넌트**: Navbar, HackathonCard, TeamCard
- **통합 테스트**: 전체 앱 렌더링 테스트

---

## 📚 관련 문서

- [기능 명세서 (specification.md)](./specification.md)
- [소프트웨어 요구사항 명세 (SRS.md)](./docs/SRS.md)
- [디자인 시스템 (design.json)](./design.json)

---

## 📝 라이선스

MIT License

---

## 👨‍💻 개발자

**SunkiMin**  
📧 oksk1111@gmail.com  
🔗 GitHub: [@oksk1111](https://github.com/oksk1111)

---

## 🙏 감사의 말

이 프로젝트는 **Daker 월간 해커톤 (2026.03 - 긴급 인수인계)** 제출작으로 제작되었습니다.  
명세서만 보고 구현하는 특별한 도전 과제였으며, 바이브 코딩을 통해 완성도 높은 결과물을 만들어낼 수 있었습니다.

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요! ⭐**

Made with ❤️ for Daker Hackathon

</div>

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── page.tsx          # 메인 (/)
│   ├── hackathons/       # 해커톤 목록 & 상세
│   ├── camp/             # 팀원 모집
│   └── rankings/         # 랭킹
├── components/           # 재사용 UI 컴포넌트
│   ├── layout/           # Navbar, Footer
│   ├── common/           # StatusHandler, HeroCard
│   ├── hackathon/        # 해커톤 관련 섹션 (7개)
│   ├── camp/             # 팀 카드, 팀 폼
│   └── rankings/         # 랭킹 테이블
├── lib/                  # 비즈니스 로직
│   ├── types.ts          # TypeScript 타입
│   ├── utils.ts          # 유틸 함수
│   ├── seed.ts           # 초기 데이터 시딩
│   └── store/            # localStorage 스토어
└── __tests__/            # 테스트 코드
    ├── unit/
    └── integration/
```

## 🌐 배포

Vercel에 자동 배포됩니다. `main` 브랜치에 push하면 자동으로 배포됩니다.

## 📋 기능

- **메인 페이지**: 해커톤, 팀 찾기, 랭킹 바로가기
- **해커톤 목록**: 상태/태그 필터, 카드 리스트
- **해커톤 상세**: 7개 섹션 (개요, 평가, 일정, 상금, 팀, 제출, 리더보드)
- **팀원 모집**: 팀 리스트, 모집글 작성, 해커톤별 필터
- **랭킹**: 글로벌 포인트 순위 테이블

## 📄 License

MIT
