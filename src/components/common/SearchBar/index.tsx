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

  const destinationOptions = [
    "New York",
    "Los Angeles",
    "Paris",
    "Tokyo",
    "Rome",
    "London",
    "Barcelona",
    "Dubai",
    "Sydney",
    "Bangkok",
    "Istanbul",
    "Rio de Janeiro",
    "Cape Town",
    "Cairo",
    "Hong Kong",
    "Singapore",
    "Amsterdam",
    "Venice",
    "Florence",
    "Vienna",
    "Prague",
    "Lisbon",
    "Moscow",
    "Berlin",
    "San Francisco",
    "Mexico City",
    "Toronto",
    "Seoul",
    "Buenos Aires",
    "Marrakech",
  ];
  const activityOptions = ["Hiking", "Skiing", "Swimming", "Cycling"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    const { destination, activity, when, guess } = formData;

    if (!destinationOptions.includes(destination)) {
      toast.warn("Please select a valid destination");
      return;
    }

    if (!activityOptions.includes(activity)) {
      toast.warn("Please select a valid activity");
      return;
    }

    if (!validateDate(when)) {
      toast.warn("Date must be in the format YYYY-MM-DD");
      return;
    }

    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber) || guessNumber <= 0) {
      toast.warn("Guess must be a positive integer greater than 0");
      return;
    }

    toast.success("Your search was successfully completed!");
  };

  return (
    <div
      className={styles.searchBar}
    >
      <div className={styles.form}>
        <div className={styles.inputs}>
          <InputSearch
            label="Destination"
            type="select"
            name="destination"
            value={formData.destination}
            placeholder="Where to go?"
            onChange={handleChange}
            Icon={PiPaperPlaneTilt}
            options={destinationOptions}
          />
          <InputSearch
            label="Type"
            type="select"
            name="activity"
            value={formData.activity}
            placeholder="Activity"
            onChange={handleChange}
            Icon={CiFlag1}
            options={activityOptions}
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
            type="number"
            name="guess"
            value={formData.guess}
            placeholder="0"
            onChange={handleChange}
            Icon={GoPeople}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className={styles.searchButton}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
