/**
 * Unit tests for Navbar component
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navbar', () => {
  test('renders logo', () => {
    render(<Navbar />);
    expect(screen.getByText('Daker')).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText('메인')).toBeInTheDocument();
    expect(screen.getByText('해커톤')).toBeInTheDocument();
    expect(screen.getByText('팀 모집')).toBeInTheDocument();
    expect(screen.getByText('랭킹')).toBeInTheDocument();
  });

  test('active link has correct styling', () => {
    render(<Navbar />);
    const homeLink = screen.getByText('메인');
    expect(homeLink.className).toContain('bg-purple-50');
  });
});
