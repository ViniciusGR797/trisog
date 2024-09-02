import React from "react";
import CheckboxList from "../CheckboxList";
import styles from "./styles.module.scss";
import { Destination } from "@/types/destination";

interface ContinentFilterProps {
  countries: Destination[];
  selectedCountries: string[];
  onToggleCountry: (id: string) => void;
}

const ContinentFilter: React.FC<ContinentFilterProps> = ({
  countries,
  selectedCountries,
  onToggleCountry,
}) => {
  const continents = countries.reduce(
    (acc: Record<string, Destination[]>, country) => {
      acc[country.continent] = acc[country.continent] || [];
      acc[country.continent].push(country);
      return acc;
    },
    {}
  );
  
  const sortedContinentKeys = Object.keys(continents).sort();

  const sortedContinents = sortedContinentKeys.reduce((acc, key) => {
    acc[key] = continents[key];
    return acc;
  }, {} as Record<string, Destination[]>);

  return (
    <div className={styles.continentFilter}>
      <label htmlFor="continentFilter" className={styles.label}>
        Destinations
      </label>

      {Object.keys(sortedContinents).map((continent) => (
        <div key={continent} className={styles.continentSection}>
          <p className={styles.continent}>{continent}</p>
          <CheckboxList
            items={sortedContinents[continent]}
            selectedItems={selectedCountries}
            onToggleItem={onToggleCountry}
          />
        </div>
      ))}
    </div>
  );
};

export default ContinentFilter;
