import { PaginatedExperiences } from "@/types/experience";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ExperienceContextType {
  experiences: PaginatedExperiences | undefined;
  setExperiences: (paginatedExperiences: PaginatedExperiences) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(
  undefined
);

export const ExperienceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [experiences, setExperiences] = useState<PaginatedExperiences | undefined>();

  const updateExperiences = (newPaginatedExperiences: PaginatedExperiences) => {
    setExperiences(newPaginatedExperiences);
  };

  return (
    <ExperienceContext.Provider
      value={{ experiences, setExperiences: updateExperiences }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error(
      "useExperienceContext must be used within an ExperienceProvider"
    );
  }
  return context;
};
