import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputSearch from "../InputSearch";
import { PiPaperPlaneTilt } from "react-icons/pi";
import { CiFlag1, CiCalendar } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { toast } from "react-toastify";
import { Destination } from "@/types/destination";
import DestinationService from "@/services/api/destinationService";
import CategoryService from "@/services/api/categoryService";
import ExperienceService from "@/services/api/experienceService";
import { QueryAction, useQueryContext } from "@/contexts/QueryOptionsContext";
import { Category } from "@/types/category";
import { useRouter } from "next/router";
import { useExperienceContext } from "@/contexts/ExperienceContext";
import { useSearch } from "@/contexts/SearchContext";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useQueryContext();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setExperiences } = useExperienceContext();
  const { searchState, setSearchState } = useSearch();
  // const [formData, setFormData] = useState({
  //   destination: "",
  //   activity: "",
  //   when: "",
  //   guess: "",
  // });

  useEffect(() => {
    const fetchData = async () => {
      const response = await DestinationService.getDestinations();
      if (response?.status === 200) {
        setDestinations(response.data);
      }
    };

    fetchData();
  }, [setDestinations]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await CategoryService.getCategories();
      if (response?.status === 200) {
        setCategories(response.data);
      }
    };

    fetchData();
  }, [setCategories]);

  const handleChange = (data: { id?: string; value: string; name: string }) => {
    setSearchState(prevState => ({
      ...prevState,
      [data.name]: data.value,
    }));
    // setFormData({ ...formData, [data.name]: data.value });

    const actionMap: { [key: string]: QueryAction } = {
      destination: { type: "SET_DESTINATIONS_ID", payload: data.id },
      activity: { type: "SET_CATEGORIES_ID", payload: data.id },
      when: { type: "SET_DATE", payload: data.value },
      guess: { type: "SET_GUESTS", payload: data.value },
    };

    const action = actionMap[data.name];
    if (action) dispatch(action);
  };

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  };

  const fetchDataExperiences = async () => {
    const response = await ExperienceService.getExperiences(state);
    if (response?.status === 200) {
      setExperiences(response.data);
    }
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const { destination, activity, when, guess } = searchState;

    // if (
    //   !destinations.map((destination) => destination.name).includes(destination)
    // ) {
    //   toast.warn("Please select a valid destination");
    //   return;
    // }

    // if (!categories.map((category) => category.name).includes(activity)) {
    //   toast.warn("Please select a valid activity");
    //   return;
    // }

    // if (!validateDate(when)) {
    //   toast.warn("Date must be in the format YYYY-MM-DD");
    //   return;
    // }

    // const guessNumber = parseInt(guess, 10);
    // if (isNaN(guessNumber) || guessNumber <= 0) {
    //   toast.warn("Guess must be a positive integer greater than 0");
    //   return;
    // }

    fetchDataExperiences();
    setSearchState(prevState => ({
      ...prevState,
      isSearchActive: true,
    }));

    router.push("/tours");
    toast.success("Your search was successfully completed!");
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.form}>
        <div className={styles.inputs}>
          <InputSearch
            label="Destination"
            type="select"
            name="destination"
            value={searchState.destination}
            placeholder="Where to go?"
            onChange={handleChange}
            Icon={PiPaperPlaneTilt}
            options={Array.from(
              new Map(destinations.map((item) => [item.name, item])).values()
            )}
          />
          <InputSearch
            label="Type"
            type="select"
            name="activity"
            value={searchState.activity}
            placeholder="Activity"
            onChange={handleChange}
            Icon={CiFlag1}
            options={Array.from(
              new Map(categories.map((item) => [item.name, item])).values()
            )}
          />
        </div>
        <div className={styles.inputs}>
          <InputSearch
            label="When"
            type="date"
            name="when"
            value={searchState.when}
            placeholder="Date"
            onChange={handleChange}
            Icon={CiCalendar}
          />
          <InputSearch
            label="Guess"
            type="number"
            name="guess"
            value={searchState.guess}
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
