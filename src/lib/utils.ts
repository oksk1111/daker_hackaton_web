import { format, parseISO, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

/** ISO 날짜 문자열을 한국어 형식으로 포맷 */
export function formatDate(isoString: string): string {
  try {
    return format(parseISO(isoString), 'yyyy.MM.dd HH:mm', { locale: ko });
  } catch {
    return isoString;
  }
}

/** ISO 날짜 문자열을 짧은 형식으로 포맷 */
export function formatDateShort(isoString: string): string {
  try {
    return format(parseISO(isoString), 'yyyy.MM.dd', { locale: ko });
  } catch {
    return isoString;
  }
}

/** 상태 라벨 변환 */
export function statusLabel(status: string): string {
  switch (status) {
    case 'upcoming': return '예정';
    case 'ongoing': return '진행중';
    case 'ended': return '종료';
    default: return status;
  }
}

/** 상태 색상 (tailwind class) */
export function statusColor(status: string): string {
  switch (status) {
    case 'upcoming': return 'bg-blue-100 text-blue-700';
    case 'ongoing': return 'bg-green-100 text-green-700';
    case 'ended': return 'bg-gray-100 text-gray-500';
    default: return 'bg-gray-100 text-gray-500';
  }
}

/** 금액 포맷 (원) */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원';
}

/** 날짜가 특정 기간 내에 있는지 확인 */
export function isWithinDays(isoString: string, days: number): boolean {
  try {
    const date = parseISO(isoString);
    const now = new Date();
    return Math.abs(differenceInDays(now, date)) <= days;
  } catch {
    return false;
  }
}

/** 안전한 localStorage 접근 */
export function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded 등 무시
  }
}
