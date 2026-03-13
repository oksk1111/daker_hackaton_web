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
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Team Recruitment</h1>
        <p className="text-neutral-500">
          {hackathonFilter
            ? 'Browse team posts for this hackathon.'
            : 'Find teammates or create your own team.'}
        </p>
        {hackathonFilter && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-[#f3f0ff] text-[#6D28D9] rounded-full text-sm">
            <span>Filter: {hackathonFilter}</span>
            <a href="/camp" className="text-[#7C3AED] hover:underline text-xs ml-1">Clear</a>
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
        <div className="w-10 h-10 border-4 border-[#f3f0ff] border-t-[#7C3AED] rounded-full animate-spin" />
      </div>
    }>
      <CampContent />
    </Suspense>
  );
}
