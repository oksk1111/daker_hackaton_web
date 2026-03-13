import type { PrizeSection as PrizeData } from '@/lib/types';
import { formatKRW } from '@/lib/utils';

interface Props {
  prize: PrizeData;
}

const placeLabel: Record<string, string> = {
  '1st': '1st Place',
  '2nd': '2nd Place',
  '3rd': '3rd Place',
};

const placeColor: Record<string, string> = {
  '1st': 'bg-amber-50 border-amber-200',
  '2nd': 'bg-neutral-50 border-neutral-200',
  '3rd': 'bg-orange-50 border-orange-200',
};

export default function PrizeSection({ prize }: Props) {
  return (
    <section id="prize" className="space-y-4">
      <h2 className="section-title">상금</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {prize.items.map((item) => (
          <div
            key={item.place}
            className={`bg-white border rounded-xl p-6 text-center hover:shadow-md transition-shadow ${placeColor[item.place] || 'border-neutral-200'}`}
          >
            <div className="w-10 h-10 rounded-full bg-[#f3f0ff] flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-sm text-neutral-500 uppercase font-semibold">{placeLabel[item.place] || item.place}</p>
            <p className="text-2xl font-bold text-[#7C3AED] mt-2">{formatKRW(item.amountKRW)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
