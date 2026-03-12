'use client';

import { useEffect } from 'react';
import { seedAll } from '@/lib/seed';

export default function AppInitializer() {
  useEffect(() => {
    seedAll();
  }, []);
  return null;
}
