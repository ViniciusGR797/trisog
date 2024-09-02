import React from "react";
import styles from "./styles.module.scss";

const CardExperienceInfoSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.imageContainer}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.links}>
          <div className={styles.link}></div>
          <div className={styles.link}></div>
        </div>
      </div>
      <div className={styles.skeletonInfo}>
        <div className={styles.headerInfo}>
          <div className={styles.location} />
          <div className={styles.shareFavorite} >
            <div className={styles.shareFavoriteIcon} />
            <div className={styles.shareFavoriteIcon} />
          </div>
        </div>
        <div className={`${styles.skeletonText} ${styles.name}`} />
        <div className={styles.detail}>
          <div className={`${styles.skeletonText} ${styles.from}`} />
          <div className={`${styles.skeletonText} ${styles.duration}`} />
          <div className={`${styles.skeletonText} ${styles.maxPeople}`} />
          <div className={`${styles.skeletonText} ${styles.minAge}`} />
          <div className={`${styles.skeletonText} ${styles.tourType}`} />
          <div className={`${styles.skeletonText} ${styles.reviews}`} />
        </div>
      </div>
    </div>
  );
};

export default CardExperienceInfoSkeleton;
