import React from 'react';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search..."
      value={searchTerm}
      id="search"
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full rounded-md border-0 my-12 px-4 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 sm:text-sm sm:leading-6"
    />
  );
};

export default SearchInput;
