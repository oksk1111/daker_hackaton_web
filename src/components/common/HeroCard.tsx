import Link from 'next/link';

interface HeroCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  color: 'purple' | 'blue' | 'green';
}

const colorMap = {
  purple: {
    bg: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
    icon: 'bg-purple-100 text-purple-600',
    title: 'text-purple-700',
  },
  blue: {
    bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
    icon: 'bg-blue-100 text-blue-600',
    title: 'text-blue-700',
  },
  green: {
    bg: 'bg-green-50 hover:bg-green-100 border-green-200',
    icon: 'bg-green-100 text-green-600',
    title: 'text-green-700',
  },
};

export default function HeroCard({ href, icon, title, description, color }: HeroCardProps) {
  const c = colorMap[color];
  return (
    <Link
      href={href}
      className={`block p-8 rounded-2xl border-2 ${c.bg} transition-all duration-200 hover:shadow-lg hover:-translate-y-1`}
    >
      <div className={`w-16 h-16 rounded-xl ${c.icon} flex items-center justify-center text-3xl mb-5`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold ${c.title} mb-2`}>{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </Link>
  );
}
