import type { RankingEntry } from '@/lib/types';

interface Props {
  rankings: RankingEntry[];
}

export default function RankingTable({ rankings }: Props) {
  const rankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase w-20">
              순위
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
              닉네임
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
              포인트
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rankings.map((entry) => (
            <tr key={entry.rank} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-lg">{rankEmoji(entry.rank)}</td>
              <td className="px-6 py-4">
                <span className="font-semibold text-gray-800">{entry.nickname}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-mono font-bold text-purple-600">{entry.points.toLocaleString()}</span>
                <span className="text-xs text-gray-400 ml-1">pts</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
