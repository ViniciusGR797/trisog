import React from "react";
import CheckboxList from "../CheckboxList";
import styles from "./styles.module.scss";

interface RatingFilterProps {
  rating: { id: string; name: string }[];
  selectedRating: string[];
  onToggleRating: (id: string) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  rating,
  selectedRating,
  onToggleRating,
}) => {
  return (
    <div className={styles.ratingFilter}>
      <label htmlFor="ratingFilter" className={styles.label}>
        Reviews
      </label>
      <CheckboxList
        items={rating}
        selectedItems={selectedRating}
        onToggleItem={onToggleRating}
        shouldSort={false}
      />
    </div>
  );
};

export default RatingFilter;
