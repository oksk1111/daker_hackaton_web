'use client';

import { useState } from 'react';
import type { SubmitSection as SubmitData } from '@/lib/types';
import { createSubmission } from '@/lib/store/submissionStore';

interface Props {
  submit: SubmitData;
  hackathonSlug: string;
}

export default function SubmitSection({ submit, hackathonSlug }: Props) {
  const [teamName, setTeamName] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) {
      setError('팀명을 입력해주세요.');
      return;
    }
    if (!fileName.trim()) {
      setError('파일명을 입력해주세요.');
      return;
    }
    setError('');
    createSubmission({
      hackathonSlug,
      teamName: teamName.trim(),
      notes: notes.trim() || undefined,
      fileType: submit.allowedArtifactTypes[0] || 'file',
      fileName: fileName.trim(),
    });
    setSubmitted(true);
  };

  return (
    <section id="submit" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-purple-500">📤</span> 제출
      </h2>

      {/* Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">제출 가이드</h3>
        <ul className="space-y-2">
          {submit.guide.map((g, i) => (
            <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              {g}
            </li>
          ))}
        </ul>
        <p className="text-xs text-blue-600 mt-3">
          허용 파일 형식: {submit.allowedArtifactTypes.join(', ')}
        </p>
      </div>

      {/* Submission Items (if any) */}
      {submit.submissionItems && (
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-700">제출 항목</h3>
          {submit.submissionItems.map((item) => (
            <div key={item.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-purple-500">📎</span>
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">형식: {item.format}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Form */}
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <p className="font-semibold text-green-800">제출이 완료되었습니다!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-3 text-sm text-purple-600 hover:underline"
          >
            추가 제출하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-gray-700">제출 폼</h3>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">팀명 *</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="팀 이름을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">메모 (선택)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              rows={3}
              placeholder="메모를 입력하세요 (선택사항)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">파일명 / URL *</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="제출 파일명 또는 URL"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            제출하기
          </button>
        </form>
      )}
    </section>
  );
}
