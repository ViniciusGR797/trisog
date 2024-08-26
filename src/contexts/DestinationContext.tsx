import { Destination } from "@/types/destination";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface DestinationContextType {
  destinations: Destination[];
  setDestinations: (destinations: Destination[]) => void;
}

const DestinationContext = createContext<DestinationContextType | undefined>(
  undefined
);

export const DestinationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const updateDestinations = (newDestinations: Destination[]) => {
    setDestinations(newDestinations);
  };

  return (
    <DestinationContext.Provider
      value={{ destinations, setDestinations: updateDestinations }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestinationContext = () => {
  const context = useContext(DestinationContext);
  if (context === undefined) {
    throw new Error(
      "useDestinationContext must be used within a DestinationProvider"
    );
  }
  return context;
};
