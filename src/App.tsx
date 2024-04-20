import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import './App.css';
import SearchInput from './components/SearchInput';
import CompanyCard from './components/CompanyCard';
import LoadingIndicator from './components/LoadingIndicator';
import StarredCount from './components/StarredCount';
import Header from './components/Layout/Header';
import { Company } from './interfaces';
import { URL } from './constants/constants';
import useFetchData from './hooks/useFetchData';
import useToggleStar from './hooks/useToggleStar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [starredCount, setStarredCount] = useState(0);
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

  const toggleStar = async (id: string) => {
    const resultIndex = results.findIndex((result) => result.id === id);
    if (resultIndex === -1) return;

    const newStarredStatus = !results[resultIndex].starred;
    try {
      const response = await fetch(`${URL.api}/search/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ starred: newStarredStatus }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setResults((currentResults) => {
        const updatedResults = [...currentResults];
        updatedResults[resultIndex] = {
          ...updatedResults[resultIndex],
          starred: newStarredStatus,
        };
        return updatedResults;
      });

      setStarredCount((currentCount) =>
        newStarredStatus ? currentCount + 1 : currentCount - 1
      );
    } catch (error) {
      console.error('Error updating starred status: ', error);
    }
  };

  useEffect(() => {
    const fetchStarredCount = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL.api}/search?starred=true`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStarredCount(data.length);
      } catch (error) {
        console.error('Error fetching starred count: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStarredCount();
  }, []);

  return (
    <div>
      <Header />
      <div className="">
        <main>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Find companies
                </h1>
                <SearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                <StarredCount count={starredCount} />
                {isLoading ? (
                  <LoadingIndicator />
                ) : (
                  results.map((company) => (
                    <CompanyCard
                      key={company.id}
                      company={company}
                      toggleStar={toggleStar}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
