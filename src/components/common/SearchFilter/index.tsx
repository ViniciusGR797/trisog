import React, { useState, ChangeEvent, MouseEvent } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";
import { useQueryContext } from "@/contexts/QueryOptionsContext";

const SearchFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useQueryContext();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    dispatch({ type: "SET_TITLE", payload: term });
  };

  const handleSearchClick = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    
    
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
