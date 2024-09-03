import React from "react";
import styles from "./styles.module.scss";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isLongText?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  isLongText = false,
}) => {
  return (
    <div className={styles.content}>
      <div className={`${styles.subtitle} ${isLongText ? styles.longSubtitle : ""}`}>
        <span className={styles.line}></span>
        <span className={`${styles.text} ${isLongText ? styles.longText : ""}`} >{subtitle}</span>
        <span className={styles.line}></span>
      </div>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
};

export default SectionHeader;
