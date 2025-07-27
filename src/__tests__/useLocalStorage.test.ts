import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../hooks/useLocaleStorage';

describe('useLocalStorage', () => {
  const KEY = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the value from localStorage on initialization', () => {
    localStorage.setItem(KEY, 'hello');
    const { result } = renderHook(() => useLocalStorage(KEY));

    expect(result.current[0]).toBe('hello');
  });

  it('uses empty string if key is not found', () => {
    const { result } = renderHook(() => useLocalStorage(KEY));
    expect(result.current[0]).toBe('');
  });

  it('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(KEY));

    act(() => {
      result.current[1]('  new value  ');
    });

    expect(localStorage.getItem(KEY)).toBe('new value');
    expect(result.current[0]).toBe('  new value  ');
  });

  it('updating value with empty spaces is kept trimmed', () => {
    const { result } = renderHook(() => useLocalStorage(KEY));

    act(() => {
      result.current[1]('   spaced   ');
    });

    expect(localStorage.getItem(KEY)).toBe('spaced');
  });
});
