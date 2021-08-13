import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RankingsPage from './RankingsPage';

describe('<RankingsPage />', () => {
  test('it should mount', () => {
    render(<RankingsPage />);
    
    const rankingsPage = screen.getByTestId('RankingsPage');

    expect(rankingsPage).toBeInTheDocument();
  });
});