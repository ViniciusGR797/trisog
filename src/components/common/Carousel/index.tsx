import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import CardExperience from "../CardExperience";
import { Experience } from "@/types/experience";

interface CarouselProps {
  experiences: Experience[];

  favoriteIds: Set<string>;
  handleFavoriteToggle: (id: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  experiences,
  favoriteIds,
  handleFavoriteToggle,
}) => {
  return (
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
      {experiences.map((experience, index) => (
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
  );
};

export default Carousel;
