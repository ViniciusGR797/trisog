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
import Filter from "@/components/common/Filter";
import { useSearch } from "@/contexts/SearchContext";
import { QueryOption } from "@/types/queryOption";
import { useQueryContext } from "@/contexts/QueryOptionsContext";
import Pagination from "@/components/common/Pagination";
import CardExperienceSkeleton from "@/components/common/CardExperienceSkeleton";

const Search: React.FC = () => {
  const router = useRouter();
  const { state, dispatch } = useQueryContext();
  const { experiences, setExperiences, isLoading, setLoading } =
    useExperienceContext();
  const { favorites, setFavorites } = useFavoriteContext();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { searchState, setSearchState } = useSearch();

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    setLoading(true);
    const response = await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      setExperiences(response.data);
    }
    setLoading(false);
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
    if (!searchState.isSearchActive && experiences === undefined) {
      dispatch({
        type: "SET_PAGE",
        payload: "1",
      });

      state.page = "1";
      fetchDataExperiences(state);
    }

    if (
      searchState.destination === "" &&
      searchState.activity === "" &&
      searchState.when === "" &&
      searchState.guess === ""
    ) {
      setSearchState((prevState) => ({
        ...prevState,
        isSearchActive: false,
      }));
    }

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

  const handleSortChange = (selectedOption: string, isAscending: boolean) => {
    const sortBy = selectedOption;
    const order = isAscending ? "asc" : "desc";

    dispatch({
      type: "SET_SORT_BY",
      payload: sortBy,
    });

    dispatch({
      type: "SET_ORDER",
      payload: order,
    });

    dispatch({
      type: "SET_PAGE",
      payload: "1",
    });

    state.page = "1";
    state.sortBy = sortBy;
    state.order = order;
    fetchDataExperiences(state);
  };

  const handlePageChange = (page: number) => {
    dispatch({
      type: "SET_PAGE",
      payload: page.toString(),
    });

    state.page = page.toString();
    fetchDataExperiences(state);
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <Filter />
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <span>
              {`${
                experiences && experiences.experiences
                  ? experiences.total_experiences + " "
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
            <Sorting
              selectedOption={state.sortBy}
              isAscending={state.order === "asc"}
              onSortChange={handleSortChange}
            />
          </div>

          <div className={styles.resultsContent}>
            {isLoading ? (
              <div className={styles.skeletonWrapper}>
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
                <CardExperienceSkeleton />
              </div>
            ) : (
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
            )}
            <Pagination
              currentPage={experiences?.page || 1}
              totalPages={experiences?.total_pages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
