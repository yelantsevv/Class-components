import { getData, URL } from '../api';
import type { Results } from '../types/types';
import { mockResults } from './mockData';

window.fetch = vi.fn();

describe('getData', () => {
  it('fetches data successfully', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResults,
    });

    const data = await getData<Results>(URL);
    expect(data).toEqual(mockResults);
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('throws error when response is not ok', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    await expect(getData(URL)).rejects.toThrow('Not Found');
    expect(fetch).toHaveBeenCalledWith(URL);
  });
});
