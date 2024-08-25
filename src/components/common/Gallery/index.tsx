import React, { useState } from "react";
import styles from "./styles.module.scss";
import CardDestination from "../CardDestination";

interface CardData {
  image: string;
  travels: number;
  destination: string;
}

interface GalleryProps {
  cards: CardData[];
  reverse?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ cards, reverse = false }) => {
  return (
    <div className={`${styles.galleryContainer} ${reverse ? styles.galleryReverse : ""}`}>
      <div className={styles.galleryColumn}>
        <div className={styles.galleryRowTop}>
          {cards.slice(0, 3).map((card, index) => (
            <CardDestination
              key={index}
              image={card.image}
              travels={card.travels}
              destination={card.destination}
            />
          ))}
        </div>
        <div className={styles.galleryRowBottom}>
          {cards[3] && (
            <CardDestination
              image={cards[3].image}
              travels={cards[3].travels}
              destination={cards[3].destination}
              className={styles.itemLeft}
            />
          )}
          {cards[4] && (
            <CardDestination
              image={cards[4].image}
              travels={cards[4].travels}
              destination={cards[4].destination}
              className={styles.itemRight}
            />
          )}
        </div>
      </div>

      <div className={styles.galleryTallImage}>
        {cards[5] && (
          <CardDestination
            image={cards[5].image}
            travels={cards[5].travels}
            destination={cards[5].destination}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
