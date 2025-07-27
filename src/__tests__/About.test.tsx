import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from '../components/About/About';
import { getData } from '../api';
import { mockResults } from './mockData';

vi.mock('../api', () => ({
  getData: vi.fn(),
  URL: 'https://swapi.dev/api/people/1/',
}));

vi.mock('../components/Film/Film', () => ({
  default: vi.fn(({ film }) => <div data-testid="film">{film}</div>),
}));

vi.mock('../components/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('../helpers', () => ({
  helper: {
    useParams: vi.fn().mockReturnValue('1'),
    query: vi.fn().mockReturnValue('?search=test'),
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('About Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('spinner', async () => {
    vi.mocked(getData).mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('about')).toBeInTheDocument();
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  it('list of props', async () => {
    vi.mocked(getData).mockResolvedValueOnce(mockResults);

    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(':Luke')).toBeInTheDocument();
      expect(screen.getByText(':male')).toBeInTheDocument();
      expect(screen.getByText(':172')).toBeInTheDocument();
      expect(screen.getByText(':77')).toBeInTheDocument();
      expect(screen.getByText(':19BBY')).toBeInTheDocument();
      expect(screen.getByText(':fair')).toBeInTheDocument();
    });
  });

  it('list of films', async () => {
    vi.mocked(getData).mockResolvedValueOnce(mockResults);

    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    await waitFor(() => {
      const filmItems = screen.getAllByTestId('film');
      expect(filmItems.length).toBe(2);
      expect(filmItems[0]).toHaveTextContent('https://swapi.dev/api/films/1/');
      expect(filmItems[1]).toHaveTextContent('https://swapi.dev/api/films/2/');
    });
  });
});
