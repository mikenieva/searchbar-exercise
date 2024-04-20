import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import { Company } from '../interfaces';
import { URL } from '../constants/constants';

export const useFetchData = (searchTerm: string) => {
  const [results, setResults] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const url = `${URL.api}/search?name_like=${searchTerm}&_page=1&_limit=10`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchData = useCallback(_.debounce(fetchData, 300), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchData(searchTerm);
    } else {
      setResults([]);
    }
    return () => debouncedFetchData.cancel();
  }, [searchTerm, debouncedFetchData]);

  return { results, isLoading };
};
