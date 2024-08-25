import React from "react";
import styles from "./styles.module.scss";
import { RevealWrapper } from "next-reveal";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <RevealWrapper
      origin="left"
      delay={200}
      duration={1000}
      className={styles.content}
    >
      <div className={styles.subtitle}>
        <span className={styles.line}></span>
        <span className={styles.text}>{subtitle}</span>
        <span className={styles.line}></span>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </RevealWrapper>
  );
};

export default SectionHeader;
