import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import SearchFilter from "../SearchFilter";
import SliderFilter from "../SliderFilter";
import { useQueryContext } from "@/contexts/QueryOptionsContext";
import ContinentFilter from "../ContinentFilter";
import { Destination } from "@/types/destination";
import DestinationService from "@/services/api/destinationService";
import ExperienceService from "@/services/api/experienceService";
import { useExperienceContext } from "@/contexts/ExperienceContext";
import { QueryOption } from "@/types/queryOption";
import CategoryFilter from "../CategoryFilter";
import { Category } from "@/types/category";
import categoryService from "@/services/api/categoryService";
import RatingFilter from "../RatingFilter";
import { BsSliders } from "react-icons/bs";
import { PaginatedExperiences } from "@/types/experience";

interface FilterProps {
  isFavorites?: boolean;
  onChange: (experience: PaginatedExperiences) => void;
}

const Filter: React.FC<FilterProps> = ({ isFavorites = false, onChange }) => {
  const { state, dispatch } = useQueryContext();
  const { setLoading } = useExperienceContext();
  const [isLoadingByFavorites, setLoadingByFavorites] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
      const response = await categoryService.getCategories();
      if (response?.status === 200) {
        setCategories(response.data);
      }
    };

    fetchData();
  }, [setCategories]);

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    isFavorites ? setLoadingByFavorites(true) : setLoading(true);
    const response = isFavorites
      ? await ExperienceService.getExperiencesUserFavorites(queryOption)
      : await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      onChange(response.data);
    }
    isFavorites ? setLoadingByFavorites(false) : setLoading(false);
  };

  const handleSearchChange = (term: string) => {
    dispatch({ type: "SET_TITLE", payload: term });
  };

  const handleSearchClick = () => {
    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    fetchDataExperiences(state);
  };

  const handleSliderChange = (price: number) => {
    dispatch({ type: "SET_PRICE", payload: price.toString() });
  };

  const handleSliderSubmit = () => {
    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    fetchDataExperiences(state);
  };

  const handleToggleCategory = (id: string) => {
    const categoriesIdList = state.categoriesId
      ? state.categoriesId.split(",")
      : [];

    const updatedcategoriesIdList = categoriesIdList.includes(id)
      ? categoriesIdList.filter((countryId) => countryId !== id)
      : [...categoriesIdList, id];

    dispatch({
      type: "SET_CATEGORIES_ID",
      payload: updatedcategoriesIdList.join(","),
    });

    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    state.categoriesId = updatedcategoriesIdList.join(",");
    fetchDataExperiences(state);
  };

  const handleToggleCountry = (id: string) => {
    const destinationIdList = state.destinationsId
      ? state.destinationsId.split(",")
      : [];

    const updateddestinationIdList = destinationIdList.includes(id)
      ? destinationIdList.filter((countryId) => countryId !== id)
      : [...destinationIdList, id];

    dispatch({
      type: "SET_DESTINATIONS_ID",
      payload: updateddestinationIdList.join(","),
    });

    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    state.destinationsId = updateddestinationIdList.join(",");
    fetchDataExperiences(state);
  };

  const rating = [
    { id: "5", name: "5 Stars" },
    { id: "4", name: "4 Stars & Up" },
    { id: "3", name: "3 Stars & Up" },
    { id: "2", name: "2 Stars & Up" },
    { id: "1", name: "1 Stars & Up" },
  ];

  const handleToggleRating = (id: string) => {
    const rating = state.rating === id ? "" : id;

    dispatch({
      type: "SET_RATING",
      payload: rating,
    });

    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    state.rating = rating;
    fetchDataExperiences(state);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window?.innerWidth <= 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setFiltersVisible(true); 
    } else {
      setFiltersVisible(false); 
    }
  }, [isMobile]);

  return (
    <>
      <button className={styles.button} onClick={toggleFilters}>
        <span>Filters</span>
        <BsSliders className={styles.filterIcon} />
      </button>
      {filtersVisible && (
        <div
          className={`${styles.filters} ${
            filtersVisible ? styles.filtersVisible : ""
          }`}
        >
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
            <CategoryFilter
              categories={categories}
              selectedCategories={
                state.categoriesId ? state.categoriesId.split(",") : []
              }
              onToggleCategory={handleToggleCategory}
            />
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
            <RatingFilter
              rating={rating}
              selectedRating={state.rating ? state.rating.split(",") : []}
              onToggleRating={handleToggleRating}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
