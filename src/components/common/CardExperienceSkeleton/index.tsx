import React from "react";
import styles from "./styles.module.scss";

const CardExperienceSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonFavorite} />
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonInfo}>
        <div className={`${styles.skeletonText} ${styles.location}`} />
        <div className={`${styles.skeletonText} ${styles.name}`} />
        <div className={`${styles.skeletonText} ${styles.review}`} />
        <div className={`${styles.skeletonText} ${styles.budget}`} />
      </div>
    </div>
  );
};

export default CardExperienceSkeleton;

