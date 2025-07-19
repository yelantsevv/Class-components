import { render, screen } from '@testing-library/react';
import CardList from '../components/CardList/CardList';
import { mockResults, mockState } from './mockData';

vi.mock('../components', async () => ({
  Card: ({ name }: { name: string }) => <div data-testid="card">{name}</div>,
}));

describe('CardList component', () => {
  it('renders "No results" when results is empty', () => {
    render(<CardList {...mockState} results={[]} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('renders cards when results are present and not loading', () => {
    render(<CardList {...mockState} results={[mockResults]} />);
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent('Luke');
  });

  it('does not render cards when isLoading is true', () => {
    render(
      <CardList {...mockState} isLoading={true} results={[mockResults]} />
    );
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });
});
