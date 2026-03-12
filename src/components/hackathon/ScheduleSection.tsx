import type { ScheduleSection as ScheduleData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface Props {
  schedule: ScheduleData;
}

export default function ScheduleSection({ schedule }: Props) {
  return (
    <section id="schedule" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="text-purple-500">📅</span> 일정
      </h2>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="relative">
          {schedule.milestones.map((ms, i) => (
            <div key={i} className="flex items-start gap-4 mb-6 last:mb-0">
              {/* Timeline dot & line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5" />
                {i < schedule.milestones.length - 1 && (
                  <div className="w-0.5 h-full bg-purple-200 mt-1 min-h-[24px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{ms.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{formatDate(ms.at)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">기준 시간대: {schedule.timezone}</p>
      </div>
    </section>
  );
}
