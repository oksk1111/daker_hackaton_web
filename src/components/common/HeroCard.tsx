import Link from 'next/link';

interface HeroCardProps {
  href: string;
  title: string;
  description: string;
  color: 'purple' | 'blue' | 'green';
}

const colorMap = {
  purple: {
    bg: 'bg-white hover:bg-neutral-50 border-neutral-200',
    accent: 'bg-[#f3f0ff]',
    accentBar: 'bg-[#7C3AED]',
    title: 'text-neutral-800',
  },
  blue: {
    bg: 'bg-white hover:bg-neutral-50 border-neutral-200',
    accent: 'bg-blue-50',
    accentBar: 'bg-blue-500',
    title: 'text-neutral-800',
  },
  green: {
    bg: 'bg-white hover:bg-neutral-50 border-neutral-200',
    accent: 'bg-green-50',
    accentBar: 'bg-green-500',
    title: 'text-neutral-800',
  },
};

const iconSvg = {
  purple: (
    <svg className="w-6 h-6 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  blue: (
    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  green: (
    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

export default function HeroCard({ href, title, description, color }: HeroCardProps) {
  const c = colorMap[color];
  return (
    <Link
      href={href}
      className={`card block p-8 rounded-2xl border ${c.bg}`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${c.accent} flex items-center justify-center shrink-0`}>
          {iconSvg[color]}
        </div>
        <div>
          <h3 className={`text-xl font-bold ${c.title} mb-2`}>{title}</h3>
          <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      <div className={`h-0.5 ${c.accentBar} rounded-full mt-6 opacity-30`} />
    </Link>
  );
}
