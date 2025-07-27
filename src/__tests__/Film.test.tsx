import { render, screen, waitFor } from '@testing-library/react';
import Film from '../components/Film/Film';
import { getData } from '../api';
import { mockFilms } from './mockData';

vi.mock('../api', () => ({
  getData: vi.fn(() => Promise.resolve(mockFilms)),
}));

describe('Film Component', () => {
  it('renders loading state initially', async () => {
    render(<Film film="films/1/" />);
    await waitFor(() => {
      expect(screen.getByTestId('loading-film')).toBeInTheDocument();
    });
  });

  it('calls getData with the correct film URL', async () => {
    render(<Film film="/films/1/" />);
    await waitFor(() => {
      expect(getData).toHaveBeenCalledWith('/films/1/');
    });
  });
});
