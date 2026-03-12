# Daker Hackathon Web

해커톤 플랫폼 웹 애플리케이션 – 해커톤 목록/상세, 팀 모집, 랭킹을 제공합니다.

## 🚀 기술 스택

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: localStorage (클라이언트 전용)
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel

## 📦 설치 및 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
```

## 📁 프로젝트 구조

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
