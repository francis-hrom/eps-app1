import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FindSelectorPage from './FindSelectorPage';

describe('<FindSelectorPage />', () => {
  test('it should mount', () => {
    render(<FindSelectorPage />);
    
    const findSelectorPage = screen.getByTestId('FindSelectorPage');

    expect(findSelectorPage).toBeInTheDocument();
  });
});