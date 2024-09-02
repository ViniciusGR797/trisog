import { QueryOption } from '@/types/queryOption';
import React, { createContext, useReducer, ReactNode, useContext } from 'react';

export type QueryAction =
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_LIMIT'; payload: string }
  | { type: 'SET_TITLE'; payload: string | undefined }
  | { type: 'SET_PRICE'; payload: string | undefined }
  | { type: 'SET_CATEGORIES_ID'; payload: string | undefined }
  | { type: 'SET_DESTINATIONS_ID'; payload: string | undefined }
  | { type: 'SET_RATING'; payload: string | undefined }
  | { type: 'SET_DATE'; payload: string | undefined }
  | { type: 'SET_GUESTS'; payload: string | undefined }
  | { type: 'SET_IS_ACTIVITY'; payload: boolean | undefined }
  | { type: 'SET_SORT_BY'; payload: string }
  | { type: 'SET_ORDER'; payload: 'asc' | 'desc' };

export const initialQueryOption: QueryOption = {
  page: '1',
  limit: '9',
  title: undefined,
  price: undefined,
  categoriesId: undefined,
  destinationsId: undefined,
  rating: undefined,
  date: undefined,
  guests: undefined,
  isActivity: undefined,
  sortBy: 'title',
  order: 'asc',
};

function queryReducer(state: QueryOption, action: QueryAction): QueryOption {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_LIMIT':
      return { ...state, limit: action.payload };
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_PRICE':
      return { ...state, price: action.payload };
    case 'SET_CATEGORIES_ID':
      return { ...state, categoriesId: action.payload };
    case 'SET_DESTINATIONS_ID':
      return { ...state, destinationsId: action.payload };
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_GUESTS':
      return { ...state, guests: action.payload };
    case 'SET_IS_ACTIVITY':
      return { ...state, isActivity: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'SET_ORDER':
      return { ...state, order: action.payload };
    default:
      return state;
  }
}

interface QueryContextProps {
  state: QueryOption;
  dispatch: React.Dispatch<QueryAction>;
}

const QueryContext = createContext<QueryContextProps | undefined>(undefined);

const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(queryReducer, initialQueryOption);

  return (
    <QueryContext.Provider value={{ state, dispatch }}>
      {children}
    </QueryContext.Provider>
  );
};

function useQueryContext() {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
}

export { QueryProvider, useQueryContext };
