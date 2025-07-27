import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router';
import { getData } from '../api';
import { mockState } from './mockData';

vi.mock('../components', () => ({
  Header: () => <div data-testid="header" />,
  CardList: () => <div data-testid="card-list" />,
  ErrorButton: () => <div data-testid="error-button" />,
}));

vi.mock('../api', () => ({
  getData: vi.fn(),
  URL: 'https://swapi.dev/api/people/',
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

vi.mock('../hooks/useLocaleStorage', () => ({
  useLocalStorage: vi.fn(() => ['?search=skywalker', vi.fn()]),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render App with data loading and call pageLink', async () => {
    (getData as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockState);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getData).toHaveBeenCalledWith(
        'https://swapi.dev/api/people/?search=skywalker'
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('?search=skywalker');

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });
});
