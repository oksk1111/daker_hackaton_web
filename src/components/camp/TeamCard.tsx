import type { Team } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{team.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{team.teamCode}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            team.isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {team.isOpen ? '모집중' : '모집완료'}
        </span>
      </div>

      {/* Intro */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{team.intro}</p>

      {/* Looking For */}
      {team.lookingFor.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {team.lookingFor.map((pos) => (
            <span
              key={pos}
              className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded text-xs font-medium"
            >
              {pos}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
        <span>👥 {team.memberCount}명</span>
        <span>{formatDateShort(team.createdAt)}</span>
      </div>

      {/* Contact */}
      {team.isOpen && (
        <a
          href={team.contact.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block w-full text-center py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          연락하기
        </a>
      )}
    </div>
  );
}
