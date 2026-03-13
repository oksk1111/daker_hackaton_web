import type { Team } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  return (
    <div className="card bg-white border border-neutral-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-neutral-800">{team.name}</h3>
          <p className="text-xs text-neutral-400 mt-0.5">{team.teamCode}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            team.isOpen ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'
          }`}
        >
          {team.isOpen ? '모집중' : '모집완료'}
        </span>
      </div>

      {/* Intro */}
      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{team.intro}</p>

      {/* Looking For */}
      {team.lookingFor.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {team.lookingFor.map((pos) => (
            <span
              key={pos}
              className="px-2 py-0.5 bg-[#f3f0ff] text-[#6D28D9] rounded-full text-xs font-medium"
            >
              {pos}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-100">
        <span>{team.memberCount}명</span>
        <span>{formatDateShort(team.createdAt)}</span>
      </div>

      {/* Contact */}
      {team.isOpen && (
        <a
          href={team.contact.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full text-center py-2 bg-[#7C3AED] text-white rounded-full text-sm font-medium hover:bg-[#6D28D9] transition-colors"
        >
          연락하기
        </a>
      )}
    </div>
  );
}
