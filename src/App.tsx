import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './App.css';
import SearchInput from './components/SearchInput';
import CompanyCard from './components/CompanyCard';
import LoadingIndicator from './components/LoadingIndicator';
import StarredCount from './components/StarredCount';
import Header from './components/Layout/Header';

interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
}

interface Company {
  id: string;
  starred: boolean;
  name: string;
  description: string;
  address: Address;
  image?: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [starredCount, setStarredCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      const url = `http://localhost:3001/search?q=${searchTerm}&_page=1&_limit=10`;
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

  const debouncedFetchData = React.useCallback(_.debounce(fetchData, 300), []);

  useEffect(() => {
    if (searchTerm) {
      debouncedFetchData(searchTerm);
    } else {
      setResults([]);
    }
    return () => debouncedFetchData.cancel();
  }, [searchTerm, debouncedFetchData]);

  const toggleStar = async (id: string) => {
    const result = results.find((result) => result.id === id);
    if (!result) return;

    try {
      const response = await fetch(`http://localhost:3001/search/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ starred: !result.starred }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedResults = results.map((result) =>
        result.id === id ? { ...result, starred: !result.starred } : result
      );
      setResults(updatedResults);

      setStarredCount(updatedResults.filter((result) => result.starred).length);
    } catch (error) {
      console.error('Error updating starred status: ', error);
    }
  };

  useEffect(() => {
    const fetchStarredCount = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3001/search?starred=true`
        );
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
        <header>
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <main>
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
        </main>
      </div>
    </div>
  );
}

export default App;
