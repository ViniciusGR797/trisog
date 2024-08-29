import { Favorite } from "@/types/favorite";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FavoriteContextType {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const updateFavorites = (newFavorites: Favorite[]) => {
    setFavorites(newFavorites);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites: updateFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error(
      "useFavoriteContext must be used within a FavoriteProvider"
    );
  }
  return context;
};
