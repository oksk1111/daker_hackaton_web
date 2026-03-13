'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StatusHandler from '@/components/common/StatusHandler';
import OverviewSection from '@/components/hackathon/OverviewSection';
import EvalSection from '@/components/hackathon/EvalSection';
import ScheduleSection from '@/components/hackathon/ScheduleSection';
import PrizeSection from '@/components/hackathon/PrizeSection';
import TeamsSection from '@/components/hackathon/TeamsSection';
import SubmitSection from '@/components/hackathon/SubmitSection';
import LeaderboardSection from '@/components/hackathon/LeaderboardSection';
import { getHackathonDetail } from '@/lib/store/hackathonStore';
import type { HackathonDetail } from '@/lib/types';

const SECTION_TABS = [
  { id: 'overview', label: '개요' },
  { id: 'eval', label: '평가' },
  { id: 'schedule', label: '일정' },
  { id: 'prize', label: '상금' },
  { id: 'teams', label: '팀' },
  { id: 'submit', label: '제출' },
  { id: 'leaderboard', label: '리더보드' },
];

export default function HackathonDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [detail, setDetail] = useState<HackathonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      const d = getHackathonDetail(slug);
      setDetail(d || null);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [slug]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StatusHandler
        loading={loading}
        empty={!detail}
        emptyMessage="해커톤을 찾을 수 없습니다."
      >
        {detail && (
          <>
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{detail.title}</h1>
            </div>

            {/* Section Tabs */}
            <div className="sticky top-16 z-40 bg-white -mx-4 px-4 py-3 mb-8 border-b border-neutral-200">
              <div className="flex gap-1 overflow-x-auto">
                {SECTION_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#7C3AED] text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-[#7C3AED]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              <OverviewSection overview={detail.sections.overview} info={detail.sections.info} />
              <EvalSection eval_={detail.sections.eval} />
              <ScheduleSection schedule={detail.sections.schedule} />
              <PrizeSection prize={detail.sections.prize} />
              <TeamsSection teams={detail.sections.teams} hackathonSlug={slug} />
              <SubmitSection submit={detail.sections.submit} hackathonSlug={slug} />
              <LeaderboardSection leaderboard={detail.sections.leaderboard} hackathonSlug={slug} />
            </div>
          </>
        )}
      </StatusHandler>
    </div>
  );
}
