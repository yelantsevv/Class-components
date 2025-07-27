import { getData, URL } from '../api';
import type { Results } from '../types/types';
import { mockResults } from './mockData';

window.fetch = vi.fn();

describe('getData', () => {
  it('return data', async () => {
    const mockFetch = fetch as ReturnType<typeof vi.fn>;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResults,
    });

    const data = await getData<Results>(URL);
    expect(data).toEqual(mockResults);
    expect(mockFetch).toHaveBeenCalledWith(URL);

    const secondCall = await getData<Results>(URL);
    expect(secondCall).toEqual(mockResults);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
