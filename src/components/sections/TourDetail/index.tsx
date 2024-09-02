import React from "react";
import styles from "./styles.module.scss";

interface TourDetailProps {
  overview: string;
}

const TourDetail: React.FC<TourDetailProps> = ({ overview }) => {
  const overviewParagraphs = overview.split('\n\n').map((line, index) => (
    <p key={index}>{line}</p> 
  ));

  return (
    <section className={styles.tourDetailSection}>
      <div className={styles.tourDetailContainer}>
        <h2 className={styles.title}>Overview</h2>
        <div className={styles.overview}>{overviewParagraphs}</div>
      </div>
    </section>
  );
};

export default TourDetail;
