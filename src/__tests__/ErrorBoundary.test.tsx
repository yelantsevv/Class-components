import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import React from 'react';

class ErrorComponent extends React.Component {
  render() {
    throw new Error('ErrorBoundary test check');
    return null;
  }
}

class ConditionalComponent extends React.Component<{ trigger: boolean }> {
  render() {
    if (this.props.trigger) {
      throw new Error('Exploded!');
    }
    return <p>Loaded fine</p>;
  }
}

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <div>content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('catches error and displays error message', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading')).toHaveTextContent(
      'ErrorBoundary test check'
    );
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('resets state and shows children again after clicking Reset', () => {
    render(
      <ErrorBoundary>
        <ConditionalComponent trigger={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Exploded!');

    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    render(
      <ErrorBoundary>
        <ConditionalComponent trigger={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/loaded fine/i)).toBeInTheDocument();
  });
});
