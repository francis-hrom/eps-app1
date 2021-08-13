import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TargetsPage from './TargetsPage';

describe('<TargetsPage />', () => {
  test('it should mount', () => {
    render(<TargetsPage />);
    
    const targetsPage = screen.getByTestId('TargetsPage');

    expect(targetsPage).toBeInTheDocument();
  });
});