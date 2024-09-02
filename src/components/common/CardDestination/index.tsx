import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface CardDestinationProps {
  id: string;
  image: string;
  travels: number;
  destination: string;
  about: string;
  className?: string;
}

const CardDestination: React.FC<CardDestinationProps> = ({
  id,
  image,
  travels,
  destination,
  about,
  className = styles.defaultCard,
}) => {
  return (
    <Link
      href={`/destinations/${id}`}
      className={`${styles.card} ${className}`}
    >
      <Image
        src={image}
        alt={destination}
        fill={true}
        sizes="(max-width: 600px) 85vw, (max-width: 1200px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        className={styles.image}
      />
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <p className={styles.travels}>{travels} Travels</p>
        <h3 className={styles.destination}>{destination}</h3>
        <p className={styles.about}>{about}</p>
      </div>
    </Link>
  );
};

export default CardDestination;
