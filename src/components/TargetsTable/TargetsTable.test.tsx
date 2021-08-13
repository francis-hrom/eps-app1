import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TargetsTable from './TargetsTable';

describe('<TargetsTable />', () => {
  test('it should mount', () => {
    render(<TargetsTable />);
    
    const targetsTable = screen.getByTestId('TargetsTable');

    expect(targetsTable).toBeInTheDocument();
  });
});