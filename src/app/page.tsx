import HeroCard from '@/components/common/HeroCard';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🏆 Daker <span className="text-purple-600">Hackathon</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          해커톤에 참여하고, 팀을 구성하고, 랭킹에 도전하세요.
          <br />
          모든 해커톤 정보를 한 곳에서 확인할 수 있습니다.
        </p>
      </div>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HeroCard
          href="/hackathons"
          icon="🚀"
          title="해커톤 보러가기"
          description="진행중이거나 예정된 해커톤을 확인하고 참가하세요. 다양한 주제의 해커톤이 기다리고 있습니다."
          color="purple"
        />
        <HeroCard
          href="/camp"
          icon="👥"
          title="팀 찾기"
          description="함께할 팀원을 찾거나 팀을 만들어보세요. 다양한 포지션의 팀원을 모집할 수 있습니다."
          color="blue"
        />
        <HeroCard
          href="/rankings"
          icon="📊"
          title="랭킹 보기"
          description="전체 참가자 랭킹을 확인하세요. 해커톤 참여와 성과에 따른 포인트 순위를 볼 수 있습니다."
          color="green"
        />
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-3 gap-8 text-center">
        <div>
          <p className="text-3xl font-bold text-purple-600">3+</p>
          <p className="text-sm text-gray-500 mt-1">해커톤</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-blue-600">4+</p>
          <p className="text-sm text-gray-500 mt-1">팀</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-green-600">10+</p>
          <p className="text-sm text-gray-500 mt-1">참가자</p>
        </div>
      </div>
    </div>
  );
}
