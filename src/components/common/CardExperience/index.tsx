import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { useCurrency } from "@/contexts/CurrencyContext";
import { RevealWrapper } from "next-reveal";

interface CardExperienceProps {
  id: string;
  image: string;
  location: {
    country: string;
    city?: string;
  };
  name: string;
  rating: number;
  reviews: number;
  duration: number;
  price: number;
  isActivity?: boolean;
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
}) => {
  const { symbol, exchangeRate } = useCurrency();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`${name} favorite status changed`);
  };

  const formatDuration = (hours: number): string => {
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours >= 1) {
      const formattedHours = hours % 1 === 0 ? Math.floor(hours) : hours;
      const displayHours =
        formattedHours % 1 === 0
          ? formattedHours.toString()
          : formattedHours.toFixed(1);
      return `${displayHours} hour${formattedHours > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      const minutes = Math.round(hours * 60);
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else {
      return "0 min";
    }
  };

  return (
    <RevealWrapper
      origin="left"
      delay={200}
      duration={1000}
      className={styles.card}
    >
      <div className={styles.favoriteButton} onClick={toggleFavorite}>
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
            <div className={styles.reviews}>
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
    </RevealWrapper>
  );
};

export default CardExperience;
