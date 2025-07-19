import { render, screen } from '@testing-library/react';
import Card from '../components/Card/Card';
import { mockResults } from './mockData';
import type { CardType } from '../types/types';

vi.mock('../components', async () => {
  return {
    Film: ({ film }: { film: string }) => (
      <li data-testid="mock-film">{film}</li>
    ),
  };
});

describe('Card component', () => {
  beforeEach(() => {
    render(<Card {...(mockResults as CardType)} />);
  });

  it('renders character info correctly', () => {
    expect(screen.getByText(mockResults.name)).toBeInTheDocument();
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/mass: 77/i)).toBeInTheDocument();
  });

  it('renders film titles as Film components', () => {
    const films = screen.getAllByTestId('mock-film');
    expect(films).toHaveLength(mockResults.films.length);
    expect(films[0]).toHaveTextContent(mockResults.films[0]);
    expect(films[1]).toHaveTextContent(mockResults.films[1]);
  });
});
