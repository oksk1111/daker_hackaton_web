import type { OverviewSection as OverviewData, InfoSection } from '@/lib/types';

interface Props {
  overview: OverviewData;
  info: InfoSection;
}

export default function OverviewSection({ overview, info }: Props) {
  return (
    <section id="overview" className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-purple-500">📋</span> 개요 / 안내
      </h2>

      {/* Summary */}
      <div className="bg-purple-50 rounded-xl p-6">
        <p className="text-gray-700 leading-relaxed">{overview.summary}</p>
        <div className="mt-4 flex gap-4 text-sm text-gray-600">
          <span>👤 개인 참가: {overview.teamPolicy.allowSolo ? '가능' : '불가'}</span>
          <span>👥 최대 팀원: {overview.teamPolicy.maxTeamSize}명</span>
        </div>
      </div>

      {/* Notices */}
      {info.notice.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">📢 유의사항</h3>
          <ul className="space-y-2">
            {info.notice.map((n, i) => (
              <li key={i} className="text-sm text-yellow-900 flex items-start gap-2">
                <span className="text-yellow-500 mt-0.5">•</span>
                {n}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      <div className="flex gap-3">
        <a
          href={info.links.rules}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
        >
          📄 규정 보기
        </a>
        <a
          href={info.links.faq}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
        >
          ❓ FAQ
        </a>
      </div>
    </section>
  );
}
