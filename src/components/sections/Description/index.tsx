import React from "react";
import styles from "./styles.module.scss";

interface DescriptionProps {
  title: string;
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ title, description }) => {
  const descriptionParagraphs = description.split('\n\n').map((line, index) => (
    <p key={index}>{line}</p> 
  ));

  return (
    <section className={styles.descriptionSection}>
      <div className={styles.descriptionContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description}>{descriptionParagraphs}</div>
      </div>
    </section>
  );
};

export default Description;
