import React, { useState } from "react";
import styles from "./styles.module.scss";
import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  criterion: string;
  label: string;
  value: number;
  onChange: (newValue: number, name: string) => void;
}

const Rating: React.FC<RatingProps> = ({
  criterion,
  label,
  value,
  onChange,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (index: number) => {
    console.log("click", index + 1, "criterion", criterion);
    value === index + 1
      ? onChange(0, criterion)
      : onChange(index + 1, criterion);
  };

  const handleMouseEnter = (index: number) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  return (
    <div className={styles.rating}>
      <p className={styles.criterion}>{label}</p>
      <div className={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <AiFillStar
            key={index}
            className={`${styles.starIcon} ${
              (hoverValue || value) > index ? styles.active : ""
            }`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
