import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { RevealWrapper } from "next-reveal";

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
  className = styles.defaultCard,
}) => {
  return (
    <RevealWrapper
      origin="left"
      delay={200}
      duration={1000}
      className={`${styles.card} ${className}`}
    >
      <Link
        href={`/destination/${destination.toLowerCase().replace(" ", "-")}`}
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
    </RevealWrapper>
  );
};

export default CardDestination;
