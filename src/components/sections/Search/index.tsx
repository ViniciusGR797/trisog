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
import { calculateAverageRating } from "@/utils/average";
import { PaginatedExperiences } from "@/types/experience";

interface SearchProps {
  isFavorites?: boolean;
}

const Search: React.FC<SearchProps> = ({ isFavorites = false }) => {
  const router = useRouter();
  const { state, dispatch } = useQueryContext();
  const [experiencesByFavorites, setExperiencesByFavorites] = useState<
    PaginatedExperiences | undefined
  >(undefined);
  const { experiences, setExperiences, isLoading, setLoading } =
    useExperienceContext();
  const [isLoadingByFavorites, setLoadingByFavorites] = useState<boolean>(true);
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

  const fetchDataExperiencesByFavorites = async (queryOption: QueryOption) => {
    setLoadingByFavorites(true);
    const response = await ExperienceService.getExperiencesUserFavorites(
      queryOption
    );
    if (response?.status === 200) {
      setExperiencesByFavorites(response.data);
    }
    isFavorites ? setLoadingByFavorites(false) : setLoading(false);
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
    if (!searchState.isSearchActive && experiences === undefined && !isFavorites) {
      dispatch({
        type: "SET_PAGE",
        payload: "1",
      });

      state.page = "1";
      fetchDataExperiences(state);
    }

    if (isFavorites && experiencesByFavorites === undefined) {
      dispatch({
        type: "SET_PAGE",
        payload: "1",
      });

      state.page = "1";
      fetchDataExperiencesByFavorites(state);
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
  }, [router, isFavorites]);

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

  const handleChangeExperiences = (experiences: PaginatedExperiences) => {
    isFavorites
      ? setExperiencesByFavorites(experiences)
      : setExperiences(experiences);
  }

  const experiencesWorking = isFavorites ? experiencesByFavorites : experiences;

  return (
    <section className={`${styles.searchSection} ${isFavorites ? styles.noSearchBar : ""}`}>
      <div className={styles.searchContainer}>
        <Filter isFavorites={isFavorites} onChange={handleChangeExperiences} />
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            <span>
              {`${
                experiencesWorking && experiencesWorking.experiences
                ? experiencesWorking.total_experiences + " "
                : "0 "
                }`}
              {`${
                experiencesWorking &&
                experiencesWorking.experiences &&
                experiencesWorking.experiences.length > 1
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
            {isLoading || (isFavorites && isLoadingByFavorites) ? (
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
                  experiencesWorking &&
                  experiencesWorking.experiences &&
                  experiencesWorking.experiences.length > 0
                  ? styles.resultsList
                  : styles.noResultsList
                  }`}
              >
                {experiencesWorking &&
                  experiencesWorking.experiences &&
                  experiencesWorking.experiences.length > 0 ? (
                  experiencesWorking.experiences.map((result, index) => (
                    <div key={index} className={styles.resultItem}>
                      <CardExperience
                        id={result.id}
                        image={result.image}
                        location={{
                          country: result.destination.name,
                          city: result.city,
                        }}
                        name={result.title}
                        rating={calculateAverageRating(result.ratings)}
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
              currentPage={experiencesWorking?.page || 1}
              totalPages={experiencesWorking?.total_pages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
