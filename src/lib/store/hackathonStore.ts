import type { Hackathon, HackathonDetail } from '../types';
import { getFromStorage } from '../utils';

export function getAllHackathons(): Hackathon[] {
  return getFromStorage<Hackathon[]>('hackathons', []);
}

export function getHackathonBySlug(slug: string): Hackathon | undefined {
  return getAllHackathons().find((h) => h.slug === slug);
}

export function getHackathonDetail(slug: string): HackathonDetail | undefined {
  const details = getFromStorage<HackathonDetail[]>('hackathonDetails', []);
  return details.find((d) => d.slug === slug);
}

export function filterHackathons(
  status?: string,
  tag?: string,
): Hackathon[] {
  let list = getAllHackathons();
  if (status && status !== 'all') {
    list = list.filter((h) => h.status === status);
  }
  if (tag && tag !== 'all') {
    list = list.filter((h) => h.tags.includes(tag));
  }
  return list;
}

export function getAllTags(): string[] {
  const hackathons = getAllHackathons();
  const tagSet = new Set<string>();
  hackathons.forEach((h) => h.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
