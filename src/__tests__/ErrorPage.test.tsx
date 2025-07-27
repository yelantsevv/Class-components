import { render, screen, fireEvent } from '@testing-library/react';
import ErrorPage from '../components/ErrorPage/ErrorPage';

describe('ErrorPage', () => {
  it('text something went wrong', () => {
    const error = new Error('something went wrong');

    render(<ErrorPage error={error} reset={vi.fn()} />);

    expect(screen.getByText('something went wrong')).toBeInTheDocument();
  });

  it('button Reset', () => {
    const error = new Error('Error');

    render(<ErrorPage error={error} reset={vi.fn()} />);

    const button = screen.getByTestId('reset');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Reset');
  });

  it('click Reset', () => {
    const resetMock = vi.fn();
    const error = new Error('Error');

    render(<ErrorPage error={error} reset={resetMock} />);

    const button = screen.getByTestId('reset');
    fireEvent.click(button);

    expect(resetMock).toHaveBeenCalledTimes(1);
  });

  it('click Reset without error', () => {
    const error = new Error('Error');

    render(<ErrorPage error={error} reset={undefined} />);

    const button = screen.getByTestId('reset');
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
