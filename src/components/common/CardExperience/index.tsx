import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

interface CardExperienceProps {
  imageSrc: string;
  location: {
    country: string;
    city?: string;
  };
  name: string;
  rating: number;
  reviews: number;
  time: string;
  price: string;
  isActivity?: boolean;
}

const CardExperience: React.FC<CardExperienceProps> = ({
  imageSrc,
  location,
  name,
  rating,
  reviews,
  time,
  price,
  isActivity = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${name} favorite status changed`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favoriteButton} onClick={toggleFavorite}>
        {isFavorite ? (
          <AiFillHeart className={styles.heartIcon} />
        ) : (
          <AiOutlineHeart className={styles.heartIcon} />
        )}
      </div>
      <div className={styles.cardDetail}>
        <Image
          src={imageSrc}
          alt={name}
          width={1000}
          height={1000}
          className={styles.image}
        />
        <div className={styles.info}>
          <div className={styles.location}>
            {isActivity
              ? `${location.city}, ${location.country}`
              : location.country}
          </div>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.ratingTime}>
            <div className={styles.reviews}>
              <div className={styles.ratingStar}>
                <AiFillStar className={styles.starIcon} />
                <span>{rating}</span>
              </div>
              <span className={styles.reviews}>{reviews} reviews</span>
            </div>
            <div className={styles.time}>
              <CiClock2 className={styles.starTime} />
              <span>{time}</span>
            </div>
          </div>
          <hr className={styles.separator} />
          <div className={styles.budget}>
            <p className={styles.startFrom}>Starting From</p>
            <p className={styles.price}>{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExperience;
