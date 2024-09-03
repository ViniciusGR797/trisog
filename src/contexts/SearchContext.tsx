import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchState {
  destination: string;
  activity: string;
  when: string;
  guess: string;
  isSearchActive: boolean;
}

interface SearchContextType {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

const initialSearchState: SearchState = {
  destination: "",
  activity: "",
  when: "",
  guess: "",
  isSearchActive: false,
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState);

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
