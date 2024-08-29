import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import CardExperience from "@/components/common/CardExperience";
import SectionHeader from "@/components/common/SectionHeader";
import { usePaginatedExperiencesContext } from "@/contexts/PaginatedExperiencesContext";
import { toast } from "react-toastify";
import ExperienceService from "@/services/api/experienceService";
import FavoriteService from "@/services/api/favoriteService";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

const TourMostPopular: React.FC = () => {
  const router = useRouter();

  const { paginatedExperiences, setPaginatedExperiences } =
    usePaginatedExperiencesContext();
  const { favorites, setFavorites } = useFavoriteContext();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const fetchDataExperiences = async () => {
    const response = await ExperienceService.getExperiences();
    if (response?.status === 200) {
      setPaginatedExperiences(response.data);
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
    const userCookie = cookies['@auth.user'] ? JSON.parse(cookies['@auth.user']) : null;
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
        {paginatedExperiences &&
        paginatedExperiences.experiences &&
        paginatedExperiences.experiences.length > 0 ? (
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={styles.swiperContainer}
            breakpoints={{
              1200: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1000: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
          >
            {paginatedExperiences?.experiences.map((experience, index) => (
              <SwiperSlide key={index}>
                <CardExperience
                  id={experience.id}
                  image={experience.image}
                  location={{
                    country: experience.destination.name,
                    city: experience.city,
                  }}
                  name={experience.title}
                  rating={experience.rating}
                  reviews={experience.review_count}
                  duration={experience.duration}
                  price={experience.default_price}
                  isActivity={experience.is_activity}
                  isFavorite={favoriteIds.has(experience.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </SwiperSlide>
            ))}
          </Swiper>
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
