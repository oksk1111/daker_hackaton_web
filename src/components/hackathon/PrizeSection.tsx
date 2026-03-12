import type { PrizeSection as PrizeData } from '@/lib/types';
import { formatKRW } from '@/lib/utils';

interface Props {
  prize: PrizeData;
}

const placeEmoji: Record<string, string> = {
  '1st': '🥇',
  '2nd': '🥈',
  '3rd': '🥉',
};

export default function PrizeSection({ prize }: Props) {
  return (
    <section id="prize" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-purple-500">💰</span> 상금
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {prize.items.map((item) => (
          <div
            key={item.place}
            className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-3">{placeEmoji[item.place] || '🏅'}</div>
            <p className="text-sm text-gray-500 uppercase font-semibold">{item.place}</p>
            <p className="text-2xl font-bold text-purple-600 mt-2">{formatKRW(item.amountKRW)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
