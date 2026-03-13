'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_ITEMS = [
  { href: '/', label: '메인' },
  { href: '/hackathons', label: '해커톤' },
  { href: '/camp', label: '팀 모집' },
  { href: '/rankings', label: '랭킹' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo.svg" alt="Daker" width={28} height={28} className="text-purple-600" />
            <span className="text-xl font-bold text-[#7C3AED]">Daker</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#f3f0ff] text-[#6D28D9]'
                      : 'text-neutral-600 hover:text-[#7C3AED] hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
