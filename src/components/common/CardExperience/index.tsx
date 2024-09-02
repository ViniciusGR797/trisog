import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatDuration } from "@/utils/time";

interface CardExperienceProps {
  id: string;
  image: string;
  location: {
    country: string;
    city?: string;
  };
  name: string;
  rating: string;
  reviews: number;
  duration: number;
  price: number;
  isActivity?: boolean;
  isFavorite: boolean;
  onFavoriteToggle: (id: string) => void;
}

const CardExperience: React.FC<CardExperienceProps> = ({
  id,
  image,
  location,
  name,
  rating,
  reviews,
  duration,
  price,
  isActivity = false,
  isFavorite,
  onFavoriteToggle
}) => {
  const { symbol, exchangeRate } = useCurrency();

  return (
    <div
      className={styles.card}
    >
      <div className={styles.favoriteButton} onClick={() => onFavoriteToggle(id)}>
        {isFavorite ? (
          <AiFillHeart className={styles.heartIcon} />
        ) : (
          <AiOutlineHeart className={styles.heartIcon} />
        )}
      </div>
      <Link href={`/tours/${id}`} className={styles.cardDetail}>
        <Image
          src={image}
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
            <div className={styles.review}>
              <div className={styles.ratingStar}>
                <AiFillStar className={styles.starIcon} />
                <span>{rating}</span>
              </div>
              <span className={styles.reviews}>{reviews} reviews</span>
            </div>
            <div className={styles.time}>
              <CiClock2 className={styles.starTime} />
              <span>{formatDuration(duration)}</span>
            </div>
          </div>
          <hr className={styles.separator} />
          <div className={styles.budget}>
            <p className={styles.startFrom}>Starting From</p>
            <p className={styles.price}>
              {symbol}{" "}
              {parseFloat((price * exchangeRate).toFixed(2)).toString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardExperience;
