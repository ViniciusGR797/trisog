import React from "react";
import CheckboxList from "../CheckboxList";
import styles from "./styles.module.scss";

interface Country {
  id: string;
  name: string;
  continent: string;
}

interface ContinentFilterProps {
  countries: Country[];
  selectedCountries: string[];
  onToggleCountry: (id: string) => void;
}

const ContinentFilter: React.FC<ContinentFilterProps> = ({
  countries,
  selectedCountries,
  onToggleCountry,
}) => {
  // Agrupando os países por continente
  const continents = countries.reduce(
    (acc: Record<string, Country[]>, country) => {
      acc[country.continent] = acc[country.continent] || [];
      acc[country.continent].push(country);
      return acc;
    },
    {}
  );

  return (
    <div className={styles.continentFilter}>
      <label htmlFor="continentFilter" className={styles.label}>
        Destinations
      </label>

      {Object.keys(continents).map((continent) => (
        <div key={continent} className={styles.continentSection}>
          <p className={styles.continent}>{continent}</p>
          <CheckboxList
            items={continents[continent]}
            selectedItems={selectedCountries}
            onToggleItem={onToggleCountry}
          />
        </div>
      ))}
    </div>
  );
};

export default ContinentFilter;
