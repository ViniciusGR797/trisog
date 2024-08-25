import React, { createContext, useState, ReactNode, useContext } from 'react';

type CurrencyType = 'USD' | 'EUR' | 'BRL';

interface CurrencyData {
  symbol: string;
  exchangeRate: number;
}

interface CurrencyContextType {
  currency: CurrencyType;
  symbol: string;
  exchangeRate: number;
  setCurrency: (currency: CurrencyType) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencyData: Record<CurrencyType, CurrencyData> = {
  USD: { symbol: '$', exchangeRate: 1 },
  EUR: { symbol: '€', exchangeRate: 0.89 },
  BRL: { symbol: 'R$', exchangeRate: 5.54 },
};

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  
  const { symbol, exchangeRate } = currencyData[currency];

  return (
    <CurrencyContext.Provider value={{ currency, symbol, exchangeRate, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
