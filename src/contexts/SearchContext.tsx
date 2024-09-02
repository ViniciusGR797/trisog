// contexts/SearchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Defina o tipo para o estado do contexto
interface SearchState {
  destination: string;
  activity: string;
  when: string;
  guess: string;
  isSearchActive: boolean;
}

// Defina o tipo para o contexto, incluindo funções para atualizar o estado
interface SearchContextType {
  searchState: SearchState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
}

// Crie um objeto de estado inicial
const initialSearchState: SearchState = {
  destination: "",
  activity: "",
  when: "",
  guess: "",
  isSearchActive: false,
};

// Crie o contexto com um valor inicial
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Crie um provider para o contexto
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchState, setSearchState] = useState<SearchState>(initialSearchState);

  return (
    <SearchContext.Provider value={{ searchState, setSearchState }}>
      {children}
    </SearchContext.Provider>
  );
};

// Crie um hook personalizado para usar o contexto
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
