import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import styles from "./styles.module.scss";
import { Pagination } from "swiper/modules";
import CardExperience from "@/components/common/CardExperience";

const TourMostPopular: React.FC = () => {
  const cards = ["", "", "", "", "", "", "", "", "", ""];

  return (
    <section className={styles.tourMostPopular}>
      <div className={styles.content}>
        <div className={styles.subtitle}>
          <span className={styles.line}></span>
          <span className={styles.text}>Tours</span>
          <span className={styles.line}></span>
        </div>
        <h2 className={styles.title}>Most Popular Tours</h2>
      </div>
      <div className={styles.carousel}>
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
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <CardExperience
                imageSrc="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
                location={{ country: "Brazil", city: "Rio de Janeiro" }}
                name="Amazing Experience in Rio"
                rating={4.5}
                reviews={120}
                time="3 hours"
                price="$120"
                isActivity={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TourMostPopular;
