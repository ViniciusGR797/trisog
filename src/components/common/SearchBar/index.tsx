import React, { use, useEffect, useState } from "react";
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
import { QueryOption } from "@/types/queryOption";

const SearchBar: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useQueryContext();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setExperiences } = useExperienceContext();
  const { searchState, setSearchState } = useSearch();

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

  useEffect(() => {
    setSearchState(prevState => ({
      ...prevState,
      destination: destinations.find(item => item.id === state.destinationsId?.split(",")[0])?.name || "",
      activity: categories.find(item => item.id === state.categoriesId?.split(",")[0])?.name || "",
    }));

  }, [state.destinationsId, state.categoriesId]);

  const handleChange = (data: { id?: string; value: string; name: string }) => {
    setSearchState(prevState => ({
      ...prevState,
      [data.name]: data.value,
    }));

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

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    const response = await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      setExperiences(response.data);
    }
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    fetchDataExperiences(state);
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
