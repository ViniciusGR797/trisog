import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import CardExperience from "@/components/common/CardExperience";

const TourMostPopular: React.FC = () => {
  const [cards, setCards] = useState([
    {
      id: "1",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Rio de Janeiro",
      name: "Sunset Cruise in Rio",
      rating: 4.8,
      reviews: 180,
      duration: 2.5,
      price: 150,
      isActivity: true,
    },
    {
      id: "2",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Petropolis",
      name: "Mountain Hike Adventure",
      rating: 4.7,
      reviews: 95,
      duration: 4,
      price: 80,
      isActivity: true,
    },
    {
      id: "3",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Iguazu",
      name: "Iguazu Falls Tour",
      rating: 5.0,
      reviews: 220,
      duration: 48,
      price: 200,
      isActivity: true,
    },
    {
      id: "4",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Salvador",
      name: "Cultural Festival Experience",
      rating: 4.6,
      reviews: 150,
      duration: 5,
      price: 100,
      isActivity: true,
    },
    {
      id: "5",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Rio de Janeiro",
      name: "Sunset Cruise in Rio",
      rating: 4.8,
      reviews: 180,
      duration: 2.5,
      price: 150,
      isActivity: true,
    },
    {
      id: "6",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Petropolis",
      name: "Mountain Hike Adventure",
      rating: 4.7,
      reviews: 95,
      duration: 4,
      price: 80,
      isActivity: true,
    },
    {
      id: "7",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Iguazu",
      name: "Iguazu Falls Tour",
      rating: 5.0,
      reviews: 220,
      duration: 48,
      price: 200,
      isActivity: true,
    },
    {
      id: "8",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Salvador",
      name: "Cultural Festival Experience",
      rating: 4.6,
      reviews: 150,
      duration: 5,
      price: 100,
      isActivity: true,
    },
    {
      id: "9",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Iguazu",
      name: "Iguazu Falls Tour",
      rating: 5.0,
      reviews: 220,
      duration: 48,
      price: 200,
      isActivity: true,
    },
    {
      id: "10",
      image:
        "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
      country: "Brazil",
      city: "Salvador",
      name: "Cultural Festival Experience",
      rating: 4.6,
      reviews: 150,
      duration: 5,
      price: 100,
      isActivity: true,
    },
  ]);

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
                id={card.id}
                image={card.image}
                location={{ country: card.country, city: card.city }}
                name={card.name}
                rating={card.rating}
                reviews={card.reviews}
                duration={card.duration}
                price={card.price}
                isActivity={card.isActivity}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TourMostPopular;
