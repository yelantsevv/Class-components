import { render } from '@testing-library/react';
import Spinner from '../components/Spinner/Spinner';

describe('Spinner component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct class from CSS module', () => {
    const { container } = render(<Spinner />);
    const div = container.querySelector('div');
    expect(div?.className).toMatch(/spinner/);
  });
});
