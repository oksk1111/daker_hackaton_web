'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TeamCard from '@/components/camp/TeamCard';
import TeamForm from '@/components/camp/TeamForm';
import StatusHandler from '@/components/common/StatusHandler';
import { getAllTeams, getTeamsByHackathon } from '@/lib/store/teamStore';
import { getAllHackathons } from '@/lib/store/hackathonStore';
import type { Team, Hackathon } from '@/lib/types';

function CampContent() {
  const searchParams = useSearchParams();
  const hackathonFilter = searchParams.get('hackathon') || '';

  const [teams, setTeams] = useState<Team[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTeams = useCallback(() => {
    if (hackathonFilter) {
      setTeams(getTeamsByHackathon(hackathonFilter));
    } else {
      setTeams(getAllTeams());
    }
  }, [hackathonFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHackathons(getAllHackathons());
      loadTeams();
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [loadTeams]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">👥 팀원 모집</h1>
        <p className="text-gray-500">
          {hackathonFilter
            ? '이 해커톤의 팀 모집글을 확인하세요.'
            : '함께할 팀원을 찾거나 팀을 만들어보세요.'}
        </p>
        {hackathonFilter && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm">
            <span>🏷️ 필터: {hackathonFilter}</span>
            <a href="/camp" className="text-purple-500 hover:underline text-xs">✕ 필터 해제</a>
          </div>
        )}
      </div>

      {/* Team Form */}
      <div className="mb-8">
        <TeamForm
          hackathons={hackathons}
          defaultHackathonSlug={hackathonFilter}
          onCreated={loadTeams}
        />
      </div>

      {/* Team List */}
      <StatusHandler loading={loading} empty={teams.length === 0} emptyMessage="등록된 팀 모집글이 없습니다.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((t) => (
            <TeamCard key={t.teamCode} team={t} />
          ))}
        </div>
      </StatusHandler>
    </div>
  );
}

export default function CampPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    }>
      <CampContent />
    </Suspense>
  );
}
