import React from "react";
import styles from "./styles.module.scss";

interface ReviewCriteriaProps {
  criteria: string;
  average: number;
}

const ReviewCriteria: React.FC<ReviewCriteriaProps> = ({
  criteria,
  average,
}) => {
  const progress = (average / 5) * 100;

  return (
    <div className={styles.reviewCriteria}>
      <p className={styles.criteriaText}>{criteria}</p>
      <div className={styles.criteriaContainer}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className={styles.averageScore}>{average.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default ReviewCriteria;
