import { render, screen, waitFor } from '@testing-library/react';
import Film from '../components/Film/Film';
import { getData } from '../api';
import type { Films, FilmType } from '../types/types';
import { mockFilms } from './mockData';

vi.mock('../api', () => ({
  getData: vi.fn(),
}));

describe('Film component', () => {
  const filmLink = 'https://swapi.py4e.com/api/films/1/';
  const mockState = new Map<string, Films | 'loading'>();

  const baseProps: FilmType = {
    film: filmLink,
    state: mockState,
  };

  beforeEach(() => {
    mockState.clear();
    (getData as ReturnType<typeof vi.fn>).mockReset();
  });

  it('fetches and displays film title when not cached', async () => {
    (getData as ReturnType<typeof vi.fn>).mockResolvedValue(mockFilms);

    render(<Film {...baseProps} />);
    const loadingItem = screen.getByRole('listitem');
    expect(loadingItem).toHaveClass(/loading/);
    await waitFor(() => {
      expect(screen.getByText(mockFilms.title)).toBeInTheDocument();
    });
  });

  it('uses cached film data if available', async () => {
    mockState.set(filmLink, mockFilms);
    render(<Film {...baseProps} />);
    expect(screen.getByText(mockFilms.title)).toBeInTheDocument();
  });
});
