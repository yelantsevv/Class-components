import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../components/ErrorButton/ErrorButton';

describe('ErrorButton', () => {
  it('renders the button', () => {
    render(<ErrorButton />);
    expect(screen.getByText(/error button/i)).toBeInTheDocument();
  });

  it('throws error with correct message', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<ErrorButton />);
      fireEvent.click(screen.getByText(/error button/i));
    }).toThrow('Error Boundary: Triggered Error');

    errorSpy.mockRestore();
  });
});
