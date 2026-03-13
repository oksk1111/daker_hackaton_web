/**
 * Unit tests for TeamCard component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamCard from '@/components/camp/TeamCard';
import type { Team } from '@/lib/types';

const mockTeamOpen: Team = {
  teamCode: 'T-TEST-01',
  hackathonSlug: 'test-hackathon',
  name: '테스트팀',
  isOpen: true,
  memberCount: 3,
  lookingFor: ['Frontend', 'Backend'],
  intro: '테스트 팀입니다.',
  contact: { type: 'link', url: 'https://example.com' },
  createdAt: '2026-03-01T10:00:00+09:00',
};

const mockTeamClosed: Team = {
  ...mockTeamOpen,
  teamCode: 'T-TEST-02',
  name: '마감팀',
  isOpen: false,
  lookingFor: [],
};

describe('TeamCard', () => {
  test('renders team name', () => {
    render(<TeamCard team={mockTeamOpen} />);
    expect(screen.getByText('테스트팀')).toBeInTheDocument();
  });

  test('renders open status when isOpen', () => {
    render(<TeamCard team={mockTeamOpen} />);
    expect(screen.getByText('모집중')).toBeInTheDocument();
  });

  test('renders closed status when not open', () => {
    render(<TeamCard team={mockTeamClosed} />);
    expect(screen.getByText('모집완료')).toBeInTheDocument();
  });

  test('renders looking for positions', () => {
    render(<TeamCard team={mockTeamOpen} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
  });

  test('renders contact button when open', () => {
    render(<TeamCard team={mockTeamOpen} />);
    expect(screen.getByText('연락하기')).toBeInTheDocument();
  });

  test('does not render contact button when closed', () => {
    render(<TeamCard team={mockTeamClosed} />);
    expect(screen.queryByText('연락하기')).not.toBeInTheDocument();
  });

  test('renders member count', () => {
    render(<TeamCard team={mockTeamOpen} />);
    expect(screen.getByText('3명')).toBeInTheDocument();
  });
});
