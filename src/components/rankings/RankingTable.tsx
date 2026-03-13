import type { RankingEntry } from '@/lib/types';

interface Props {
  rankings: RankingEntry[];
}

export default function RankingTable({ rankings }: Props) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-neutral-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase w-20">
              순위
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500 uppercase">
              닉네임
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-500 uppercase">
              포인트
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {rankings.map((entry) => (
            <tr key={entry.rank} className="hover:bg-neutral-50 transition-colors">
              <td className="px-6 py-4">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold ${
                  entry.rank <= 3 ? 'bg-[#f3f0ff] text-[#7C3AED]' : 'text-neutral-600'
                }`}>
                  {entry.rank}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className="font-semibold text-neutral-800">{entry.nickname}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="font-mono font-bold text-[#7C3AED]">{entry.points.toLocaleString()}</span>
                <span className="text-xs text-neutral-400 ml-1">pts</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
