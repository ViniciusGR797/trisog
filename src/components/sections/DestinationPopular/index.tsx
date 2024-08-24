import React from "react";
import styles from "./styles.module.scss";
import CardDestination from "@/components/common/CardDestination";

const DestinationPopular: React.FC = () => {
  return (
    <section className={styles.destinationPopular}>
      <div className={styles.content}>
        <div className={styles.subtitle}>
          <span className={styles.line}></span>
          <span className={styles.text}>Destination</span>
          <span className={styles.line}></span>
        </div>
        <h2 className={styles.title}>Top Attractions Destinations</h2>
      </div>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryColumn}>
          <div className={styles.galleryRowTop}>
            <CardDestination
              image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
              travels={150}
              destination="France"
            />
            <CardDestination
              image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
              travels={150}
              destination="France"
            />
            <CardDestination
              image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
              travels={150}
              destination="France"
            />
          </div>
          <div className={styles.galleryRowBottom}>
            <CardDestination
              image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
              travels={150}
              destination="France"
              className={styles.itemLeft}
            />
            <CardDestination
              image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
              travels={150}
              destination="France"
              className={styles.itemRight}
            />
          </div>
        </div>

        <div className={styles.galleryTallImage}>
          <CardDestination
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
            travels={150}
            destination="France"
          />
        </div>
      </div>
    </section>
  );
};

export default DestinationPopular;
