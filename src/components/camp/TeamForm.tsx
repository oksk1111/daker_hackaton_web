'use client';

import { useState } from 'react';
import type { Hackathon } from '@/lib/types';
import { createTeam } from '@/lib/store/teamStore';

interface Props {
  hackathons: Hackathon[];
  defaultHackathonSlug?: string;
  onCreated: () => void;
}

const POSITION_OPTIONS = ['Frontend', 'Backend', 'Designer', 'ML Engineer', 'PM', 'Data Engineer', 'DevOps'];

export default function TeamForm({ hackathons, defaultHackathonSlug, onCreated }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [intro, setIntro] = useState('');
  const [recruiting, setRecruiting] = useState(true);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [contactUrl, setContactUrl] = useState('');
  const [hackathonSlug, setHackathonSlug] = useState(defaultHackathonSlug || '');
  const [error, setError] = useState('');

  const togglePosition = (pos: string) => {
    setLookingFor((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError('팀명은 필수입니다.'); return; }
    if (!intro.trim()) { setError('소개는 필수입니다.'); return; }
    if (!contactUrl.trim()) { setError('연락 링크는 필수입니다.'); return; }
    setError('');

    createTeam({
      hackathonSlug: hackathonSlug || 'general',
      name: name.trim(),
      intro: intro.trim(),
      isOpen: recruiting,
      lookingFor,
      contactUrl: contactUrl.trim(),
    });

    // Reset
    setName('');
    setIntro('');
    setLookingFor([]);
    setContactUrl('');
    setIsOpen(false);
    onCreated();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 font-medium hover:bg-purple-50 transition-colors"
      >
        + 팀 모집글 작성하기
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-xl p-6 space-y-4"
    >
      <h3 className="text-lg font-bold text-gray-800">팀 모집글 작성</h3>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
      )}

      {/* Hackathon selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">해커톤 (선택)</label>
        <select
          value={hackathonSlug}
          onChange={(e) => setHackathonSlug(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
        >
          <option value="">해커톤 없음 (일반 모집)</option>
          {hackathons.map((h) => (
            <option key={h.slug} value={h.slug}>{h.title}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">팀명 *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
          placeholder="팀 이름"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">소개 *</label>
        <textarea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
          rows={3}
          placeholder="팀 소개를 작성하세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">모집 포지션</label>
        <div className="flex flex-wrap gap-2">
          {POSITION_OPTIONS.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => togglePosition(pos)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                lookingFor.includes(pos)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">연락 링크 *</label>
        <input
          type="text"
          value={contactUrl}
          onChange={(e) => setContactUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
          placeholder="오픈카톡 / Google Form 등"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={recruiting}
          onChange={(e) => setRecruiting(e.target.checked)}
          id="recruiting"
          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <label htmlFor="recruiting" className="text-sm text-gray-700">모집중</label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          등록하기
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}
