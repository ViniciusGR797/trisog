import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface CardDestinationProps {
  image: string;
  travels: number;
  destination: string;
  className?: string;
}

const CardDestination: React.FC<CardDestinationProps> = ({
  image,
  travels,
  destination,
  className =  styles.defaultCard, 
}) => {
  return (
    <Link
      href={`/destination/${destination.toLowerCase().replace(" ", "-")}`}
      className={`${styles.card} ${className}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={destination}
          fill={true}
          style={{ objectFit: "cover" }}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.travels}>{travels} Travels</p>
        <h3 className={styles.destination}>{destination}</h3>
      </div>
    </Link>
  );
};

export default CardDestination;
