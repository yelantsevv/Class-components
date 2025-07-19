import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';
import { mockState } from './mockData';
import type { State } from '../types/types';

vi.mock('../components/Search/Search', () => ({
  default: ({ onSearch }: State) => (
    <div data-testid="search" onClick={() => onSearch('Luke')}>
      Mock Search
    </div>
  ),
}));

vi.mock('../components/Paginator/Paginator', () => ({
  default: ({ pageLink }: State) => (
    <div data-testid="paginator" onClick={() => pageLink('next')}>
      Mock Paginator
    </div>
  ),
}));

describe('Header', () => {
  it('renders Search and Paginator components', () => {
    render(<Header {...mockState} />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('paginator')).toBeInTheDocument();
  });

  it('passes props to Search and Paginator', () => {
    render(<Header {...mockState} />);
    screen.getByTestId('search').click();
    screen.getByTestId('paginator').click();
    expect(mockState.onSearch).toHaveBeenCalled();
    expect(mockState.pageLink).toHaveBeenCalledWith('next');
  });
});
