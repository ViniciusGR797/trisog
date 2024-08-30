import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SearchFilter from "../SearchFilter";
import SliderFilter from "../SliderFilter";
import { useQueryContext } from "@/contexts/QueryOptionsContext";
import ContinentFilter from "../ContinentFilter";
import { Destination } from "@/types/destination";
import DestinationService from "@/services/api/destinationService";

interface Country {
  id: string;
  name: string;
  continent: string;
}

const Filter: React.FC = () => {
  const { state, dispatch } = useQueryContext();
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DestinationService.getDestinations();
      if (response?.status === 200) {
        setDestinations(response.data);
      }
    };

    fetchData();
  }, [setDestinations]);



  const handleSearchChange = (term: string) => {
    dispatch({ type: "SET_TITLE", payload: term });
  };

  const handleSearchClick = () => {
    console.log("Search clicked with term:", state.title);
  };

  const handleSliderChange = (price: number) => {
    dispatch({ type: "SET_PRICE", payload: price.toString() });
  };

  const handleSliderSubmit = () => {
    console.log("Filtered price:", state.price);
  };

  const handleToggleCountry = (id: string) => {
    const destinationIdList = state.destinationsId ? state.destinationsId.split(",") : [];

    const updateddestinationIdList = destinationIdList.includes(id)
      ? destinationIdList.filter((countryId) => countryId !== id) 
      : [...destinationIdList, id];

    dispatch({ type: "SET_DESTINATIONS_ID", payload: updateddestinationIdList.join(",") });

    // fazer getExperiense
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <SearchFilter
          searchTerm={state.title || ""}
          onChange={handleSearchChange}
          onClick={handleSearchClick}
        />
      </div>
      <div className={styles.filter}>
        <SliderFilter
          maxPrice={1000}
          value={Number(state.price) || 0}
          onChange={handleSliderChange}
          onClick={handleSliderSubmit}
        />
      </div>
      <div className={styles.filter}>
        <h4>Categories</h4>
        <label>
          <input type="checkbox" /> Category 1
        </label>
        <label>
          <input type="checkbox" /> Category 2
        </label>
        {/* Add more categories */}
      </div>
      <div className={styles.filter}>
        <ContinentFilter
          countries={destinations}
          selectedCountries={
            state.destinationsId ? state.destinationsId.split(",") : []
          }
          onToggleCountry={handleToggleCountry}
        />
      </div>
      <div className={styles.filter}>
        <h4>Reviews</h4>
        <label>
          <input type="checkbox" /> 4 Stars & Up
        </label>
        <label>
          <input type="checkbox" /> 3 Stars & Up
        </label>
      </div>
    </div>
  );
};

export default Filter;
