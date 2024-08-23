import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero.svg"
        alt="Hero image with balloonsl"
        fill={true}
        style={{ objectFit: "cover" }}
        priority={true}
      />
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>Save 15% off in Worldwide</h2>
        <h1 className={styles.title}>Travel & Adventures</h1>
        <p className={styles.description}>
          Find awesome hotel, tour, car and activities in London
        </p>
      </div>
    </section>
  );
};

export default Hero;
