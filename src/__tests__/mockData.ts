import type { Films, Person, Results, State } from '../types/types';

export const mockResults: Results = {
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
  name: 'Luke',
  gender: 'male',
  height: '172',
  mass: '77',
};

export const mockPerson: Person = {
  count: 1,
  previous: 'https://swapi.dev/api/people/?page=1',
  next: 'https://swapi.dev/api/people/?page=2',
  results: [mockResults],
};
export const mockState: State = {
  isLoading: false,
  results: [mockResults],
  pageLink: vi.fn(),
  onSearch: vi.fn(),
};

export const mockFilms: Films = {
  title: 'The Empire Strikes Back',
  opening_crawl: 'It is a dark time for the Luke...',
};
