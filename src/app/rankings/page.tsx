'use client';

import { useState, useEffect } from 'react';
import RankingTable from '@/components/rankings/RankingTable';
import StatusHandler from '@/components/common/StatusHandler';
import { getRankingsSorted } from '@/lib/store/rankingStore';
import type { RankingEntry } from '@/lib/types';

const PERIOD_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: '30', label: '최근 30일' },
  { value: '7', label: '최근 7일' },
];

export default function RankingsPage() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setRankings(getRankingsSorted());
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // period 필터 (데모에서는 전체 데이터만 표시)
  const filteredRankings = rankings;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Rankings</h1>
        <p className="text-neutral-500">해커톤 참여와 성과에 따른 포인트 순위입니다.</p>
      </div>

      {/* Period Filter */}
      <div className="flex gap-1 bg-white border border-neutral-200 rounded-xl p-1 mb-8 w-fit">
        {PERIOD_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setPeriod(opt.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === opt.value
                ? 'bg-[#7C3AED] text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Ranking Table */}
      <StatusHandler loading={loading} empty={filteredRankings.length === 0} emptyMessage="랭킹 데이터가 없습니다.">
        <RankingTable rankings={filteredRankings} />
      </StatusHandler>
    </div>
  );
}
