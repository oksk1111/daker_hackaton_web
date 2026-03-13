import type { EvalSection as EvalData } from '@/lib/types';

interface Props {
  eval_: EvalData;
}

export default function EvalSection({ eval_ }: Props) {
  return (
    <section id="eval" className="space-y-4">
      <h2 className="section-title">평가</h2>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 space-y-4">
        <div>
          <span className="text-xs font-semibold text-[#7C3AED] uppercase tracking-wider">
            평가 지표
          </span>
          <p className="text-lg font-bold text-neutral-800 mt-1">{eval_.metricName}</p>
        </div>

        <p className="text-neutral-600 text-sm leading-relaxed">{eval_.description}</p>

        {eval_.limits && (
          <div className="flex gap-6 text-sm text-neutral-600">
            {eval_.limits.maxRuntimeSec && (
              <span>Max runtime: {eval_.limits.maxRuntimeSec}s</span>
            )}
            {eval_.limits.maxSubmissionsPerDay && (
              <span>Daily limit: {eval_.limits.maxSubmissionsPerDay} submissions</span>
            )}
          </div>
        )}

        {eval_.scoreDisplay && (
          <div className="mt-4">
            <h4 className="font-semibold text-neutral-700 mb-2">{eval_.scoreDisplay.label} 구성</h4>
            <div className="flex gap-3">
              {eval_.scoreDisplay.breakdown.map((b) => (
                <div
                  key={b.key}
                  className="flex-1 bg-neutral-50 rounded-lg p-3 text-center"
                >
                  <p className="text-2xl font-bold text-[#7C3AED]">{b.weightPercent}%</p>
                  <p className="text-xs text-neutral-500 mt-1">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
