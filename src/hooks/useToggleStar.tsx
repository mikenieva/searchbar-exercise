import { useState, useCallback } from 'react';
import { Company } from '../interfaces';
import { URL } from '../constants/constants';

export const useToggleStar = (initialResults: Company[]) => {
  const [results, setResults] = useState<Company[]>(initialResults);
  const [starredCount, setStarredCount] = useState(0);

  const toggleStar = useCallback(
    async (id: string) => {
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
    },
    [results]
  );

  return { results, toggleStar, starredCount };
};
