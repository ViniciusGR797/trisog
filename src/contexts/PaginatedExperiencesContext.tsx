import { PaginatedExperiences } from "@/types/experience";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PaginatedExperiencesContextType {
  paginatedExperiences: PaginatedExperiences | undefined;
  setPaginatedExperiences: (paginatedExperiences: PaginatedExperiences) => void;
}

const PaginatedExperiencesContext = createContext<PaginatedExperiencesContextType | undefined>(
  undefined
);

export const PaginatedExperiencesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [paginatedExperiences, setPaginatedExperiences] = useState<PaginatedExperiences>();

  const updatePaginatedExperiences = (newPaginatedExperiences: PaginatedExperiences) => {
    setPaginatedExperiences(newPaginatedExperiences);
  };

  return (
    <PaginatedExperiencesContext.Provider
      value={{ paginatedExperiences, setPaginatedExperiences: updatePaginatedExperiences }}
    >
      {children}
    </PaginatedExperiencesContext.Provider>
  );
};

export const usePaginatedExperiencesContext = () => {
  const context = useContext(PaginatedExperiencesContext);
  if (context === undefined) {
    throw new Error(
      "usePaginatedExperiencesContext must be used within a PaginatedExperiencesProvider"
    );
  }
  return context;
};
