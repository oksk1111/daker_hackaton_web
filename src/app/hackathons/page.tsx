'use client';

import { useState, useEffect } from 'react';
import HackathonCard from '@/components/hackathon/HackathonCard';
import StatusHandler from '@/components/common/StatusHandler';
import { filterHackathons, getAllTags } from '@/lib/store/hackathonStore';
import type { Hackathon } from '@/lib/types';

const STATUS_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'upcoming', label: '예정' },
  { value: 'ongoing', label: '진행중' },
  { value: 'ended', label: '종료' },
];

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 약간의 딜레이로 로딩 상태 보여주기
    const timer = setTimeout(() => {
      setTags(getAllTags());
      setHackathons(filterHackathons(statusFilter, tagFilter));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      setHackathons(filterHackathons(statusFilter, tagFilter));
    }
  }, [statusFilter, tagFilter, loading]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🚀 해커톤</h1>
        <p className="text-gray-500">진행중이거나 예정된 해커톤을 확인하세요.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Status Filter */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === opt.value
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">모든 태그</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* List */}
      <StatusHandler loading={loading} empty={hackathons.length === 0} emptyMessage="해당하는 해커톤이 없습니다.">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((h) => (
            <HackathonCard key={h.slug} hackathon={h} />
          ))}
        </div>
      </StatusHandler>
    </div>
  );
}
