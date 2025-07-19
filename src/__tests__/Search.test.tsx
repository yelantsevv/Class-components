import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';

describe('Search', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    localStorage.clear();
  });

  it('renders input with default placeholder from localStorage or fallback', () => {
    render(
      <Search
        isLoading={false}
        onSearch={mockOnSearch}
        results={[]}
        pageLink={() => {}}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.placeholder).toBe('Search...');
  });

  it('uses placeholder from localStorage if exists', () => {
    localStorage.setItem('search', 'Luke');
    render(
      <Search
        isLoading={false}
        onSearch={mockOnSearch}
        results={[]}
        pageLink={() => {}}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.placeholder).toBe('Luke');
  });

  it('updates input value when typing', () => {
    render(
      <Search
        isLoading={false}
        onSearch={mockOnSearch}
        results={[]}
        pageLink={() => {}}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Yoda' } });
    expect(input.value).toBe('Yoda');
  });

  it('calls onSearch with input value on submit and saves to localStorage', () => {
    render(
      <Search
        isLoading={false}
        onSearch={mockOnSearch}
        results={[]}
        pageLink={() => {}}
      />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const button = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'Obi-Wan' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Obi-Wan');
    expect(localStorage.getItem('search')).toBe('Obi-Wan');
  });
});
