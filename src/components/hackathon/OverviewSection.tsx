import type { OverviewSection as OverviewData, InfoSection } from '@/lib/types';

interface Props {
  overview: OverviewData;
  info: InfoSection;
}

export default function OverviewSection({ overview, info }: Props) {
  return (
    <section id="overview" className="space-y-6">
      <h2 className="section-title">개요 / 안내</h2>

      {/* Summary */}
      <div className="bg-[#f3f0ff] rounded-xl p-6">
        <p className="text-neutral-700 leading-relaxed">{overview.summary}</p>
        <div className="mt-4 flex gap-4 text-sm text-neutral-600">
          <span>개인 참가: {overview.teamPolicy.allowSolo ? '가능' : '불가'}</span>
          <span>최대 팀원: {overview.teamPolicy.maxTeamSize}명</span>
        </div>
      </div>

      {/* Notices */}
      {info.notice.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-800 mb-3">유의사항</h3>
          <ul className="space-y-2">
            {info.notice.map((n, i) => (
              <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">&bull;</span>
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
          className="btn-secondary"
        >
          규정 보기
        </a>
        <a
          href={info.links.faq}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          FAQ
        </a>
      </div>
    </section>
  );
}
