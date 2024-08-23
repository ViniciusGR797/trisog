import React, { useState } from "react";
import styles from "./styles.module.scss";
import InputSearch from "../InputSearch";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { CiFlag1, CiCalendar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { toast } from "react-toastify";

const SearchBar: React.FC = () => {
  const [formData, setFormData] = useState({
    destination: "",
    activity: "",
    when: "",
    guess: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;
    if (name === "guess" && !/[0-9]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success(JSON.stringify(formData));
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.form}>
        <div className={styles.inputs}>
          <InputSearch
            label="Destination"
            type="text"
            name="destination"
            value={formData.destination}
            placeholder="Where to go?"
            onChange={handleChange}
            Icon={PiPaperPlaneTilt}
          />
          <InputSearch
            label="Type"
            type="text"
            name="activity"
            value={formData.activity}
            placeholder="Activity"
            onChange={handleChange}
            Icon={CiFlag1}
          />
        </div>
        <div className={styles.inputs}>
          <InputSearch
            label="When"
            type="date"
            name="when"
            value={formData.when}
            placeholder="Date"
            onChange={handleChange}
            Icon={CiCalendar}
          />
          <InputSearch
            label="Guess"
            type="text"
            name="guess"
            value={formData.guess}
            placeholder="0"
            onChange={handleChange}
            Icon={GoPeople}
          />
        </div>
      </div>

      <button className={styles.searchButton}>Search</button>
    </div>
  );
};

export default SearchBar;
