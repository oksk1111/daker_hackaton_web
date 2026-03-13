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
      <h2 className="section-title">제출</h2>

      {/* Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">제출 가이드</h3>
        <ul className="space-y-2">
          {submit.guide.map((g, i) => (
            <li key={i} className="text-sm text-blue-900 flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">&bull;</span>
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
          <h3 className="font-semibold text-neutral-700">제출 항목</h3>
          {submit.submissionItems.map((item) => (
            <div key={item.key} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-[#f3f0ff] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-800">{item.title}</p>
                <p className="text-xs text-neutral-500">형식: {item.format}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Form */}
      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-semibold text-green-800">제출이 완료되었습니다!</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-3 text-sm text-[#7C3AED] hover:underline"
          >
            추가 제출하기
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
          <h3 className="font-semibold text-neutral-700">제출 폼</h3>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">팀명 *</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
              placeholder="팀 이름을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">메모 (선택)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
              rows={3}
              placeholder="메모를 입력하세요 (선택사항)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">파일명 / URL *</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
              placeholder="제출 파일명 또는 URL"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7C3AED] text-white rounded-full font-medium hover:bg-[#6D28D9] transition-colors"
          >
            제출하기
          </button>
        </form>
      )}
    </section>
  );
}
