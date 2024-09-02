import React from "react";
import styles from "./styles.module.scss";
import { Review } from "@/types/review";
import Image from "next/image";
import { formatDate } from "@/utils/time";
import { AiFillStar } from "react-icons/ai";
import { calculateAverageRating } from "@/utils/average";

interface CardReviewProps {
  review: Review;
}

const CardReview: React.FC<CardReviewProps> = ({ review }) => {
  return (
    <div className={styles.cardReview}>
      <div className={styles.imageContainer}>
        <Image
          src={review.image}
          alt={review.name}
          width={100}
          height={100}
          priority={true}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.date}>{formatDate(review.created_at)}</p>
        <h3 className={styles.name}>{review.name}</h3>
        <div className={styles.review}>
          <div className={styles.ratingStar}>
            <AiFillStar className={styles.starIcon} />
            <span>{calculateAverageRating(review.ratings)}</span>
          </div>
          <span className={styles.reviews}>
            {`${
              review && review.user_review_count
                ? review.user_review_count + " "
                : "0 "
            }`}
            {`${
              review && review.user_review_count && review.user_review_count > 1
                ? "reviews"
                : "review"
            }`}
          </span>
        </div>
        <p className={styles.comment}>{review.comment}</p>
      </div>
    </div>
  );
};

export default CardReview;
