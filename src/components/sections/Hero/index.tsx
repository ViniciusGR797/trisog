import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import SearchBar from "@/components/common/SearchBar";
import { RevealWrapper } from "next-reveal";

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
      <RevealWrapper
        origin="left"
        delay={200}
        duration={1000}
        className={styles.textContainer}
      >
        <h2 className={styles.subtitle}>Save 15% off in Worldwide</h2>
        <h1 className={styles.title}>Travel & Adventures</h1>
        <p className={styles.description}>
          Find awesome hotel, tour, car and activities in London
        </p>
      </RevealWrapper>
      <SearchBar />
    </section>
  );
};

export default Hero;
