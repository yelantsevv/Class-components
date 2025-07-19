import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as api from '../api';
import { mockPerson } from './mockData';

vi.mock('../components', async () => ({
  Header: () => <div data-testid="header" />,
  CardList: () => <div data-testid="cardlist" />,
  Spinner: () => <div data-testid="spinner" />,
  ErrorButton: () => <button data-testid="error-button">Error</button>,
}));

describe('App component', () => {
  beforeEach(() => {
    vi.spyOn(api, 'getData').mockResolvedValue(mockPerson);
    localStorage.setItem('search', 'Luke');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('calls getData with search from localStorage on mount', async () => {
    render(<App />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(api.getData).toHaveBeenCalledWith(`${api.URL}?search=Luke`);
    });
  });

  it('renders Header and CardList after loading', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('cardlist')).toBeInTheDocument();
    });
  });

  it('shows Spinner when loading is true', () => {
    render(<App />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders ErrorButton', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByTestId('error-button')).toBeInTheDocument();
    });
  });
});
