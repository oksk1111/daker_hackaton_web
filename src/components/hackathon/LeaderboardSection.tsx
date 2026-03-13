'use client';

import { useState, useEffect } from 'react';
import type { LeaderboardMeta, LeaderboardEntry } from '@/lib/types';
import { getLeaderboardEntries } from '@/lib/store/leaderboardStore';
import { getSubmissionsByHackathon } from '@/lib/store/submissionStore';
import { formatDate } from '@/lib/utils';

interface Props {
  leaderboard: LeaderboardMeta;
  hackathonSlug: string;
}

export default function LeaderboardSection({ leaderboard, hackathonSlug }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [noSubmissionTeams, setNoSubmissionTeams] = useState<string[]>([]);

  useEffect(() => {
    const lbEntries = getLeaderboardEntries(hackathonSlug);
    setEntries(lbEntries);

    // 제출 내역 확인 – 참가했으나 제출 없는 팀은 "미제출" 표기
    const submissions = getSubmissionsByHackathon(hackathonSlug);
    const submittedTeams = new Set(submissions.map((s) => s.teamName));
    const lbTeams = new Set(lbEntries.map((e) => e.teamName));
    // 제출 내역이 있지만 리더보드에 없는 팀 = 미반영
    const noSub = submissions
      .filter((s) => !lbTeams.has(s.teamName))
      .map((s) => s.teamName);
    setNoSubmissionTeams([...new Set(noSub)]);
  }, [hackathonSlug]);

  const rankLabel = (rank: number) => {
    return `${rank}`;
  };

  return (
    <section id="leaderboard" className="space-y-4">
      <h2 className="section-title">리더보드</h2>

      {leaderboard.note && (
        <p className="text-sm text-neutral-500 bg-neutral-50 p-3 rounded-lg">{leaderboard.note}</p>
      )}

      {entries.length === 0 ? (
        <div className="text-center py-8 text-neutral-400">
          아직 리더보드 데이터가 없습니다.
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">순위</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">팀</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase">점수</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-500 uppercase">제출 시간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {entries.map((entry) => (
                <tr key={entry.rank} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                      entry.rank <= 3 ? 'bg-[#f3f0ff] text-[#7C3AED]' : 'text-neutral-600'
                    }`}>
                      {rankLabel(entry.rank)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-neutral-800">{entry.teamName}</span>
                    {entry.artifacts?.webUrl && (
                      <a
                        href={entry.artifacts.webUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-xs text-[#7C3AED] hover:underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-[#7C3AED]">
                    {entry.score}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-neutral-500">
                    {formatDate(entry.submittedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 미제출 표기 */}
      {noSubmissionTeams.length > 0 && (
        <div className="text-sm text-neutral-400">
          <p>미제출 팀: {noSubmissionTeams.join(', ')}</p>
        </div>
      )}
    </section>
  );
}
