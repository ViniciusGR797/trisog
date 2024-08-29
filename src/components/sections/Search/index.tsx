import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CardExperience from "@/components/common/CardExperience";
import Sorting from "@/components/common/Sorting";
import { toast } from "react-toastify";
import ExperienceService from "@/services/api/experienceService";
import { useRouter } from "next/router";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
import FavoriteService from "@/services/api/favoriteService";
import { parseCookies } from "nookies";
import { useExperienceContext } from "@/contexts/ExperienceContext";
import SearchFilter from "@/components/common/SearchFilter";

const Search: React.FC = () => {
  const router = useRouter();

  const { experiences, setExperiences } = useExperienceContext();
  const { favorites, setFavorites } = useFavoriteContext();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchDataExperiences = async () => {
    const response = await ExperienceService.getExperiences();
    if (response?.status === 200) {
      setExperiences(response.data);
    } else {
      toast.error(response?.data.msg);
    }
  };

  const fetchDataFavorites = async () => {
    const response = await FavoriteService.getFavorite();
    if (response?.status === 200) {
      setFavorites(response.data);
      const ids: Set<string> = new Set(
        response.data.map((fav: { experience_id: string }) => fav.experience_id)
      );
      setFavoriteIds(ids);
    }
  };

  useEffect(() => {
    fetchDataExperiences();

    const cookies = parseCookies();
    const userCookie = cookies["@auth.user"]
      ? JSON.parse(cookies["@auth.user"])
      : null;
    setIsLoggedIn(userCookie !== null);
    if (userCookie) fetchDataFavorites();
  }, [router]);

  const handleFavoriteToggle = async (id: string) => {
    if (!isLoggedIn) {
      toast.warning("You need to be logged in to add to favorites");
      return;
    }

    const isFavorite = favoriteIds.has(id);

    let response;
    if (isFavorite) {
      response = await FavoriteService.deleteFavorite(id);
      if (response.status === 200) {
        setFavorites(
          favorites.filter((favorite) => favorite.experience_id !== id)
        );
        setFavoriteIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          updatedIds.delete(id);
          return updatedIds;
        });
        toast.success("Removed from favorites");
      }
    } else {
      response = await FavoriteService.createFavorite(id);
      if (response.status === 201) {
        const newFavorite = response.data;
        setFavorites([...favorites, newFavorite]);
        setFavoriteIds((prevIds) => {
          const updatedIds = new Set(prevIds);
          updatedIds.add(id);
          return updatedIds;
        });
        toast.success("Added to favorites");
      }
    }
  };

  const [sortOption, setSortOption] = useState<string>("name");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSortChange = (selectedOption: string, isAscending: boolean) => {
    setSortOption(selectedOption);
    setIsAscending(isAscending);
  };

  // const sortResults = (data: typeof results) => {
  //   return [...data].sort((a, b) => {
  //     const aValue = a[sortOption as keyof typeof a];
  //     const bValue = b[sortOption as keyof typeof b];

  //     if (typeof aValue === "string" && typeof bValue === "string") {
  //       // Comparação para valores de string (nome, cidade, etc.)
  //       return isAscending
  //         ? aValue.localeCompare(bValue)
  //         : bValue.localeCompare(aValue);
  //     } else if (typeof aValue === "number" && typeof bValue === "number") {
  //       // Comparação para valores numéricos (rating, reviews, etc.)
  //       return isAscending ? aValue - bValue : bValue - aValue;
  //     }
  //     return 0;
  //   });
  // };

  // const sortedResults = sortResults(results);

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <div className={styles.filters}>
          <div className={styles.filter}>
            <SearchFilter />
          </div>
          <div className={styles.filter}>
            <h4>Price Range</h4>
            {/* Add range input or slider */}
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
            <h4>Destinations</h4>
            <label>
              <input type="checkbox" /> Continent 1
            </label>
            <label>
              <input type="checkbox" /> Continent 2
            </label>
            {/* Add more continents */}
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

        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <span>
              {`${
                experiences && experiences.experiences
                  ? experiences.experiences.length + " "
                  : "0 "
              }`}
              {`${
                experiences &&
                experiences.experiences &&
                experiences.experiences.length > 1
                  ? "Tours"
                  : "Tour"
              }`}
            </span>
            <Sorting onSortChange={handleSortChange} />
          </div>

          <div
            className={`${
              experiences &&
              experiences.experiences &&
              experiences.experiences.length > 0
                ? styles.resultsList
                : styles.noResultsList
            }`}
          >
            {experiences &&
            experiences.experiences &&
            experiences.experiences.length > 0 ? (
              experiences.experiences.map((result, index) => (
                <div key={index} className={styles.resultItem}>
                  <CardExperience
                    id={result.id}
                    image={result.image}
                    location={{
                      country: result.destination.name,
                      city: result.city,
                    }}
                    name={result.title}
                    rating={result.rating}
                    reviews={result.review_count}
                    duration={result.duration}
                    price={result.default_price}
                    isActivity={result.is_activity}
                    isFavorite={favoriteIds.has(result.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No tours available</div>
            )}
          </div>
          <div className={styles.pagination}>
            {/* Implement pagination controls */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
