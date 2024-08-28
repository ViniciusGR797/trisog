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

const TourMostPopular: React.FC = () => {
  const { paginatedExperiences, setPaginatedExperiences } =
    usePaginatedExperiencesContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ExperienceService.getExperiences();
        if (response.status === 200) {
          setPaginatedExperiences(response.data);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        toast.error("An error occurred while fetching experiences.");
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.tourMostPopular}>
      <SectionHeader title="Most Popular Tours" subtitle="Tours" />

      <div className={styles.carousel}>
        {paginatedExperiences && paginatedExperiences.experiences.length > 0 ? (
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
