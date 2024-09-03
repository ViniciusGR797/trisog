import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import CardExperience from "@/components/common/CardExperience";
import SectionHeader from "@/components/common/SectionHeader";
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

const TourMostPopular: React.FC = () => {
  const router = useRouter();
  const [experiences, setExperiences] = useState<
    PaginatedExperiences | undefined
  >(undefined);
  const { favorites, setFavorites } = useFavoriteContext();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
    const tuorPopularQueryOption = initialQueryOption;
    tuorPopularQueryOption.limit = "8";
    fetchDataExperiences(tuorPopularQueryOption);

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

  return (
    <section className={styles.tourMostPopular}>
      <SectionHeader title="Most Popular Tours" subtitle="Tours" />

      <div className={styles.carousel}>
        {loading ? (
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
        ) : experiences &&
          experiences.experiences &&
          experiences.experiences.length > 0 ? (
          <Carousel
            experiences={experiences.experiences}
            favoriteIds={favoriteIds}
            handleFavoriteToggle={handleFavoriteToggle}
          />
        ) : (
          <p className={styles.noToursMessage}>
            No most popular tours available at the moment
          </p>
        )}
      </div>
    </section>
  );
};

export default TourMostPopular;
