import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GetRankings from './GetRankings';

describe('<GetRankings />', () => {
  test('it should mount', () => {
    render(<GetRankings />);
    
    const getRankings = screen.getByTestId('GetRankings');

    expect(getRankings).toBeInTheDocument();
  });
});