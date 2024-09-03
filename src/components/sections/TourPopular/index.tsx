import React, { useEffect, useState } from "react";
import "swiper/scss";
import "swiper/scss/pagination";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import ExperienceService from "@/services/api/experienceService";
import FavoriteService from "@/services/api/favoriteService";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import {
  initialQueryOption,
  useQueryContext,
} from "@/contexts/QueryOptionsContext";
import { QueryOption } from "@/types/queryOption";
import { PaginatedExperiences } from "@/types/experience";
import CardExperienceSkeleton from "@/components/common/CardExperienceSkeleton";
import Carousel from "@/components/common/Carousel";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useExperienceContext } from "@/contexts/ExperienceContext";

interface TourPopularProps {
  destinationId: string;
}

const TourPopular: React.FC<TourPopularProps> = ({ destinationId }) => {
  const router = useRouter();
  const [experiencesByDestination, setExperiencesByDestination] = useState<
    PaginatedExperiences | undefined
  >(undefined);
  const { experiences, setExperiences, isLoading, setLoading } =
    useExperienceContext();
  const { favorites, setFavorites } = useFavoriteContext();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loadingByDestination, setLoadingByDestination] =
    useState<boolean>(true);

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    setLoadingByDestination(true);
    const response = await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      setExperiencesByDestination(response.data);
    }
    setLoadingByDestination(false);
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
    if (destinationId) {
      const destinationOption = initialQueryOption;
      destinationOption.destinationsId = destinationId;
      destinationOption.isActivity = false;
      fetchDataExperiences(destinationOption);
    }
    const cookies = parseCookies();
    const userCookie = cookies["@auth.user"]
      ? JSON.parse(cookies["@auth.user"])
      : null;
    setIsLoggedIn(userCookie !== null);
    if (userCookie) fetchDataFavorites();
  }, [router, destinationId]);

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

  const handleClickSeeAll = async () => {
    if (destinationId) {
      const destinationOption = initialQueryOption;
      destinationOption.destinationsId = destinationId;
      destinationOption.isActivity = false;
      setLoading(true);
      const response = await ExperienceService.getExperiences(destinationOption);
      if (response?.status === 200) {
        setExperiences(response.data);
      }
      setLoading(false);
      router.push("/tours");
    }
  };

  return (
    <section className={styles.tourPopular}>
      <div className={styles.header}>
        <p className={styles.title}>
          Popular Tours in{" "}
          {experiencesByDestination?.experiences[0].destination.name}
        </p>
        <div className={styles.seeAll} onClick={handleClickSeeAll}>
          <p>See all</p>
          <IoMdArrowRoundForward className={styles.icon} />
        </div>
      </div>
      <div className={styles.carousel}>
        {loadingByDestination ? (
          <div className={styles.skeletonWrapper}>
            <div className={`${styles.skeletonItem} ${styles.skeletonOne}`}>
              <CardExperienceSkeleton />
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonTwo}`}>
              <CardExperienceSkeleton />
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonThree}`}>
              <CardExperienceSkeleton />
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonFour}`}>
              <CardExperienceSkeleton />
            </div>
          </div>
        ) : experiencesByDestination &&
          experiencesByDestination.experiences &&
          experiencesByDestination.experiences.length > 0 ? (
          <Carousel
            experiences={experiencesByDestination.experiences}
            favoriteIds={favoriteIds}
            handleFavoriteToggle={handleFavoriteToggle}
          />
        ) : (
          <p className={styles.noToursMessage}>
            No tours available at the moment
          </p>
        )}
      </div>
    </section>
  );
};

export default TourPopular;
