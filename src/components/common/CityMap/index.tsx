import React from "react";
import styles from "./styles.module.scss";

interface CityMapProps {
  mapLink: string;
}

const CityMap: React.FC<CityMapProps> = ({ mapLink }) => {
  return (
    <section className={styles.tourMapSection}>
        <h2 className={styles.title}>City Map</h2>
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
    </section>
  );
};

export default CityMap;
