import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles.module.scss";
import { Pagination } from "swiper/modules";
import CardExperience from "@/components/common/CardExperience";

const TourMostPopular: React.FC = () => {
  const cards = [
    {
      id: "1",
      name: "Beach Resort",
      city: "Miami",
      isActivity: true,
      image: "paradise-beach.svg",
      duration: "3 days",
      price: {
        jan: [150, 200],
        feb: [180, 220],
        mar: [210, 250],
        apr: [160, 210],
        may: [170, 230],
        jun: [180, 240],
        jul: [190, 260],
        aug: [200, 270],
        sep: [160, 220],
        oct: [150, 210],
        nov: [140, 200],
        dec: [190, 250],
      },
      destinationId: "resort123",
    },
    {
      id: "2",
      name: "Mountain Hiking",
      city: "Denver",
      isActivity: true,
      image: "paradise-beach.svg",
      duration: "2 days",
      price: {
        jan: [100, 130],
        feb: [120, 150],
        mar: [140, 170],
        apr: [130, 160],
        may: [110, 140],
        jun: [120, 150],
        jul: [130, 160],
        aug: [140, 170],
        sep: [120, 150],
        oct: [110, 140],
        nov: [100, 130],
        dec: [120, 150],
      },
      destinationId: "hiking456",
    },
    {
      id: "3",
      name: "City Tour",
      city: "New York",
      isActivity: false,
      image: "city-tour.jpg",
      duration: "1 day",
      price: {
        jan: [50, 70],
        feb: [60, 80],
        mar: [70, 90],
        apr: [60, 80],
        may: [50, 70],
        jun: [60, 80],
        jul: [70, 90],
        aug: [80, 100],
        sep: [60, 80],
        oct: [50, 70],
        nov: [40, 60],
        dec: [70, 90],
      },
      destinationId: "tour789",
    },
    {
      id: "4",
      name: "Wine Tasting",
      city: "Napa Valley",
      isActivity: true,
      image: "wine-tasting.jpg",
      duration: "4 hours",
      price: {
        jan: [80, 100],
        feb: [90, 110],
        mar: [100, 120],
        apr: [90, 110],
        may: [80, 100],
        jun: [90, 110],
        jul: [100, 120],
        aug: [110, 130],
        sep: [90, 110],
        oct: [80, 100],
        nov: [70, 90],
        dec: [100, 120],
      },
      destinationId: "wine101",
    },
    {
      id: "5",
      name: "Art Gallery",
      city: "Los Angeles",
      isActivity: false,
      image: "art-gallery.jpg",
      duration: "2 hours",
      price: {
        jan: [30, 50],
        feb: [35, 55],
        mar: [40, 60],
        apr: [35, 55],
        may: [30, 50],
        jun: [35, 55],
        jul: [40, 60],
        aug: [45, 65],
        sep: [35, 55],
        oct: [30, 50],
        nov: [25, 45],
        dec: [40, 60],
      },
      destinationId: "gallery202",
    },
    {
      id: "6",
      name: "Safari Adventure",
      city: "Kenya",
      isActivity: true,
      image: "safari-adventure.jpg",
      duration: "7 days",
      price: {
        jan: [1000, 1200],
        feb: [1100, 1300],
        mar: [1200, 1400],
        apr: [1100, 1300],
        may: [1000, 1200],
        jun: [1100, 1300],
        jul: [1200, 1400],
        aug: [1300, 1500],
        sep: [1100, 1300],
        oct: [1000, 1200],
        nov: [900, 1100],
        dec: [1200, 1400],
      },
      destinationId: "safari303",
    },
    {
      id: "7",
      name: "Spa Retreat",
      city: "Bali",
      isActivity: true,
      image: "spa-retreat.jpg",
      duration: "5 days",
      price: {
        jan: [500, 700],
        feb: [550, 750],
        mar: [600, 800],
        apr: [550, 750],
        may: [500, 700],
        jun: [550, 750],
        jul: [600, 800],
        aug: [650, 850],
        sep: [550, 750],
        oct: [500, 700],
        nov: [450, 650],
        dec: [600, 800],
      },
      destinationId: "spa404",
    },
    {
      id: "8",
      name: "Historical Tour",
      city: "Rome",
      isActivity: false,
      image: "historical-tour.jpg",
      duration: "3 hours",
      price: {
        jan: [40, 60],
        feb: [45, 65],
        mar: [50, 70],
        apr: [45, 65],
        may: [40, 60],
        jun: [45, 65],
        jul: [50, 70],
        aug: [55, 75],
        sep: [45, 65],
        oct: [40, 60],
        nov: [35, 55],
        dec: [50, 70],
      },
      destinationId: "tour505",
    },
    {
      id: "9",
      name: "Cooking Class",
      city: "Paris",
      isActivity: true,
      image: "cooking-class.jpg",
      duration: "4 hours",
      price: {
        jan: [70, 90],
        feb: [80, 100],
        mar: [90, 110],
        apr: [80, 100],
        may: [70, 90],
        jun: [80, 100],
        jul: [90, 110],
        aug: [100, 120],
        sep: [80, 100],
        oct: [70, 90],
        nov: [60, 80],
        dec: [90, 110],
      },
      destinationId: "cooking606",
    },
    {
      id: "10",
      name: "Concert Experience",
      city: "Austin",
      isActivity: false,
      image: "concert-experience.jpg",
      duration: "5 hours",
      price: {
        jan: [100, 140],
        feb: [120, 160],
        mar: [140, 180],
        apr: [120, 160],
        may: [100, 140],
        jun: [120, 160],
        jul: [140, 180],
        aug: [160, 200],
        sep: [120, 160],
        oct: [100, 140],
        nov: [80, 120],
        dec: [140, 180],
      },
      destinationId: "concert707",
    },
  ];

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
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
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
