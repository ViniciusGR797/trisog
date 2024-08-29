import React, { ChangeEvent, MouseEvent } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";
import { useQueryContext } from "@/contexts/QueryOptionsContext";

interface SearchFilterProps {
  searchTerm: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, onChange, onClick }) => {
  const { dispatch } = useQueryContext();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    onChange(term);
    
  };

  const handleSearchClick = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor="searchFilter" className={styles.label}>
        Search
      </label>
      <div className={styles.inputWrapper}>
        <input
          id="searchFilter"
          type="text"
          name="searchFilter"
          value={searchTerm}
          placeholder="Type anything..."
          onChange={handleSearchChange}
          className={styles.input}
        />
        <FiSearch
          title="Clique para buscar"
          onClick={handleSearchClick}
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
