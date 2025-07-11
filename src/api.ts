// export const URL = 'https://swapi.dev/api/people/';
// зеркало оригинального SWAPI на оригинальном SSL-сертификате истекло
export const URL = 'https://swapi.py4e.com/api/people';

export const getData = async <T>(page: string): Promise<T> => {
  const response = await fetch(page);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
