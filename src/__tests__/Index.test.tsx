import * as Components from '../components';

const expectedComponents: Record<string, unknown> = {
  ErrorBoundary: Components.ErrorBoundary,
  ErrorButton: Components.ErrorButton,
  Header: Components.Header,
  Search: Components.Search,
  CardList: Components.CardList,
  Card: Components.Card,
  Film: Components.Film,
  Spinner: Components.Spinner,
  Paginator: Components.Paginator,
};

describe('Component Exports', () => {
  Object.entries(expectedComponents).forEach(([name, component]) => {
    it(`should export ${name}`, () => {
      expect(component).toBeDefined();
    });
  });
});
