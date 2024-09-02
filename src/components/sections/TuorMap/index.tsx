import React from "react";
import styles from "./styles.module.scss";

interface TourMapProps {
  mapLink: string;
}

const TourMap: React.FC<TourMapProps> = ({ mapLink }) => {
    console.log(mapLink);

  return (
    <section className={styles.tourMapSection}>
      <div className={styles.tourMapContainer}>
        <h2 className={styles.title}>Map</h2>
        <iframe
          src={mapLink}
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.map}
        ></iframe>
      </div>
    </section>
  );
};

export default TourMap;
