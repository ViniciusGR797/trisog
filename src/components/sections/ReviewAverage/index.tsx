import React from "react";
import styles from "./styles.module.scss";
import { Ratings } from "@/types/review";
import ReviewCriteria from "@/components/common/ReviewCriteria";
import { calculateAverageRating, getRatingDescription, normalizeRating } from "@/utils/average";
import { AiFillStar } from "react-icons/ai";

interface ReviewAverageProps {
  ratings: Ratings | undefined;
}

const ReviewAverage: React.FC<ReviewAverageProps> = ({ ratings }) => {
  const generalAverage = calculateAverageRating(ratings);
  const ratingDescription = getRatingDescription(Number(generalAverage));

  return (
    <section className={styles.reviewAverageSection}>
      <div className={styles.reviewAverageContainer}>
        <h2 className={styles.title}>Average Reviews</h2>
        <div className={styles.average}>
          <div className={styles.generalAverage}>
            <p className={styles.averageNumber}>{generalAverage}</p>
            <div className={styles.averageDescription}>
              <AiFillStar />
              <p>{ratingDescription}</p>
            </div>
          </div>
          <div className={styles.criteriaAverage}>
            <div className={styles.criteriaColumn}>
              <ReviewCriteria
                criteria="Services"
                average={ratings ? normalizeRating(ratings.services) : 0}
              />
              <ReviewCriteria
                criteria="Location"
                average={ratings ? normalizeRating(ratings.location) : 0}
              />
              <ReviewCriteria
                criteria="Amenities"
                average={ratings ? normalizeRating(ratings.amenities) : 0}
              />
            </div>
            <div className={styles.criteriaColumn}>
              <ReviewCriteria
                criteria="Prices"
                average={ratings ? normalizeRating(ratings.prices) : 0}
              />
              <ReviewCriteria
                criteria="Food"
                average={ratings ? normalizeRating(ratings.food) : 0}
              />
              <ReviewCriteria
                criteria="Room comfort and quality"
                average={ratings ? normalizeRating(ratings.room_comfort_and_quality) : 0}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewAverage;
