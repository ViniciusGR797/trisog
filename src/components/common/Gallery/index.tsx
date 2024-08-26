import React, { useState } from "react";
import styles from "./styles.module.scss";
import CardDestination from "../CardDestination";
import { Destination } from "@/types/destination";

interface GalleryProps {
  destinations: Destination[];
  reverse?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ destinations, reverse = false }) => {
  return (
    <div
      className={`${styles.galleryContainer} ${
        reverse ? styles.galleryReverse : ""
      }`}
    >
      <div
        className={`${styles.galleryColumn} ${
          destinations.length !== 6 ? styles.extendedWidth : ""
        }`}
      >
        <div className={styles.galleryRowTop}>
          {destinations.slice(0, 3).map((card, index) => (
            <CardDestination
              key={card.id}
              id={card.id}
              image={card.images[0]}
              travels={card.travel_count}
              destination={card.name}
              about={card.about}
            />
          ))}
        </div>

        <div
        className={`${styles.galleryRowBottom} ${
          destinations.length === 4 ? styles.extendedItemLeft : ""
        }`}
      >
          {destinations[3] && (
            <CardDestination
              key={destinations[3].id}
              id={destinations[3].id}
              image={destinations[3].images[0]}
              travels={destinations[3].travel_count}
              destination={destinations[3].name}
              about={destinations[3].about}
              className={styles.itemLeft}
            />
          )}
          {destinations[4] && (
            <CardDestination
              key={destinations[4].id}
              id={destinations[4].id}
              image={destinations[4].images[0]}
              travels={destinations[4].travel_count}
              destination={destinations[4].name}
              about={destinations[4].about}
              className={styles.itemRight}
            />
          )}
        </div>
      </div>

      <div
        className={
          destinations.length === 6
            ? styles.galleryTallImage
            : styles.noGalleryTallImage
        }
      >
        {destinations[5] && (
          <CardDestination
            key={destinations[5].id}
            id={destinations[5].id}
            image={destinations[5].images[0]}
            travels={destinations[5].travel_count}
            about={destinations[5].about}
            destination={destinations[5].name}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
