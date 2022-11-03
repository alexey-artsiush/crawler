/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import { SearchResult } from './SearchResult';

describe('Search result component', () => {
  it('List render without data', () => {
    render(<SearchResult />);
    expect(screen.queryByRole('result-apartmentId')).toBeNull();
  });
});
