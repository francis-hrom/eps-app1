import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FindSelector from './FindSelector';

describe('<FindSelector />', () => {
  test('it should mount', () => {
    render(<FindSelector />);
    
    const findSelector = screen.getByTestId('FindSelector');

    expect(findSelector).toBeInTheDocument();
  });
});