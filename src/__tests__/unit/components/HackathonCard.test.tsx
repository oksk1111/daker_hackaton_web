/**
 * Unit tests for HackathonCard component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import HackathonCard from '@/components/hackathon/HackathonCard';
import type { Hackathon } from '@/lib/types';

const mockHackathon: Hackathon = {
  slug: 'test-hackathon',
  title: '테스트 해커톤',
  status: 'ongoing',
  tags: ['AI', 'Web'],
  thumbnailUrl: 'https://example.com/thumb.jpg',
  period: {
    timezone: 'Asia/Seoul',
    submissionDeadlineAt: '2026-03-01T10:00:00+09:00',
    endAt: '2026-03-10T10:00:00+09:00',
  },
  links: {
    detail: '/hackathons/test-hackathon',
    rules: '#',
    faq: '#',
  },
};

describe('HackathonCard', () => {
  test('renders hackathon title', () => {
    render(<HackathonCard hackathon={mockHackathon} />);
    expect(screen.getByText('테스트 해커톤')).toBeInTheDocument();
  });

  test('renders status badge', () => {
    render(<HackathonCard hackathon={mockHackathon} />);
    expect(screen.getByText('진행중')).toBeInTheDocument();
  });

  test('renders tags', () => {
    render(<HackathonCard hackathon={mockHackathon} />);
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('Web')).toBeInTheDocument();
  });

  test('links to detail page', () => {
    render(<HackathonCard hackathon={mockHackathon} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/hackathons/test-hackathon');
  });
});
