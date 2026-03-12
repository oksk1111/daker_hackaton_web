import type { EvalSection as EvalData } from '@/lib/types';

interface Props {
  eval_: EvalData;
}

export default function EvalSection({ eval_ }: Props) {
  return (
    <section id="eval" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-purple-500">📊</span> 평가
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            평가 지표
          </span>
          <p className="text-lg font-bold text-gray-800 mt-1">{eval_.metricName}</p>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">{eval_.description}</p>

        {eval_.limits && (
          <div className="flex gap-6 text-sm text-gray-600">
            {eval_.limits.maxRuntimeSec && (
              <span>⏱ 최대 실행시간: {eval_.limits.maxRuntimeSec}초</span>
            )}
            {eval_.limits.maxSubmissionsPerDay && (
              <span>📤 일일 제출 제한: {eval_.limits.maxSubmissionsPerDay}회</span>
            )}
          </div>
        )}

        {eval_.scoreDisplay && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">{eval_.scoreDisplay.label} 구성</h4>
            <div className="flex gap-3">
              {eval_.scoreDisplay.breakdown.map((b) => (
                <div
                  key={b.key}
                  className="flex-1 bg-gray-50 rounded-lg p-3 text-center"
                >
                  <p className="text-2xl font-bold text-purple-600">{b.weightPercent}%</p>
                  <p className="text-xs text-gray-500 mt-1">{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
