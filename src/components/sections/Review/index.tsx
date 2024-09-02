import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Review } from "@/types/review";
import ReviewService from "@/services/api/reviewService";
import CardReview from "@/components/common/CardReview";

interface ReviewSectionProps {
  experienceId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ experienceId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDataReviews = async () => {
    setLoading(true);
    const response = await ReviewService.getReviewsByExperience(experienceId);
    if (response?.status === 200) {
      setReviews(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataReviews();
  }, [experienceId]);

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        <h2 className={styles.title}>
          Showing {reviews.length}{" "}
          {`${reviews && reviews.length > 1 ? "reviews" : "review"}`}
        </h2>
        <div className={styles.reviewList}>
          {reviews.map((review) => (
            <CardReview key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
