import { render, screen, fireEvent } from '@testing-library/react';
import Paginator from '../components/Paginator/Paginator';
import { mockState } from './mockData';

describe('Paginator', () => {
  it('renders two buttons: prev and next', () => {
    render(<Paginator {...mockState} />);
    expect(screen.getByText('prev')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
  });

  it('calls pageLink with correct previous link when prev is clicked', () => {
    const mockPageLink = vi.fn();
    render(
      <Paginator {...mockState} pageLink={mockPageLink} previous="prev" />
    );

    fireEvent.click(screen.getByText('prev'));
    expect(mockPageLink).toHaveBeenCalledWith('prev');
  });

  it('calls pageLink with correct previous link when next is clicked', () => {
    const mockPageLink = vi.fn();
    render(<Paginator {...mockState} pageLink={mockPageLink} next="next" />);

    fireEvent.click(screen.getByText('next'));
    expect(mockPageLink).toHaveBeenCalledWith('next');
  });

  it('disables "prev" button when no previous link', () => {
    render(<Paginator {...mockState} previous={null} />);
    expect(screen.getByText('prev')).toBeDisabled();
  });

  it('disables "next" button when no next link', () => {
    render(<Paginator {...mockState} next={null} />);
    expect(screen.getByText('next')).toBeDisabled();
  });
});
