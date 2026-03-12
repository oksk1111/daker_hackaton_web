import Link from 'next/link';
import type { Hackathon } from '@/lib/types';
import { statusLabel, statusColor, formatDateShort } from '@/lib/utils';

interface HackathonCardProps {
  hackathon: Hackathon;
}

export default function HackathonCard({ hackathon }: HackathonCardProps) {
  return (
    <Link
      href={`/hackathons/${hackathon.slug}`}
      className="block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="h-44 bg-gradient-to-br from-purple-100 to-blue-100 relative overflow-hidden">
        <img
          src={hackathon.thumbnailUrl}
          alt={hackathon.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
            hackathon.status,
          )}`}
        >
          {statusLabel(hackathon.status)}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {hackathon.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Period */}
        <div className="text-xs text-gray-500">
          <span>{formatDateShort(hackathon.period.submissionDeadlineAt)}</span>
          <span className="mx-1">~</span>
          <span>{formatDateShort(hackathon.period.endAt)}</span>
        </div>
      </div>
    </Link>
  );
}
