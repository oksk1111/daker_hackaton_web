'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { TeamsLinkSection as TeamsData } from '@/lib/types';
import type { Team } from '@/lib/types';
import { getTeamsByHackathon } from '@/lib/store/teamStore';

interface Props {
  teams: TeamsData;
  hackathonSlug: string;
}

export default function TeamsSection({ teams, hackathonSlug }: Props) {
  const [teamList, setTeamList] = useState<Team[]>([]);

  useEffect(() => {
    setTeamList(getTeamsByHackathon(hackathonSlug));
  }, [hackathonSlug]);

  return (
    <section id="teams" className="space-y-4">
      <h2 className="section-title">팀</h2>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-neutral-600">
            현재 <span className="font-bold text-[#7C3AED]">{teamList.length}</span>개 팀이 등록되어 있습니다.
          </p>
          {teams.campEnabled && (
            <Link
              href={`/camp?hackathon=${hackathonSlug}`}
              className="btn-primary text-sm"
            >
              이 해커톤 팀 보기 / 생성
            </Link>
          )}
        </div>

        {/* Quick team list */}
        {teamList.length > 0 && (
          <div className="space-y-2">
            {teamList.slice(0, 3).map((t) => (
              <div
                key={t.teamCode}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div>
                  <span className="font-semibold text-neutral-800">{t.name}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${t.isOpen ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
                    {t.isOpen ? '모집중' : '모집완료'}
                  </span>
                </div>
                <span className="text-xs text-neutral-500">{t.memberCount}명</span>
              </div>
            ))}
            {teamList.length > 3 && (
              <Link
                href={`/camp?hackathon=${hackathonSlug}`}
                className="text-sm text-[#7C3AED] hover:underline"
              >
                +{teamList.length - 3}개 팀 더 보기
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
