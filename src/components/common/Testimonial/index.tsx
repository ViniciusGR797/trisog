import React from "react";
import styles from "./styles.module.scss";
import { RiDoubleQuotesR } from "react-icons/ri";
import { RevealWrapper } from "next-reveal";

interface TestimonialProps {
  message: string;
  author: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ message, author }) => {
  return (
    <RevealWrapper
      origin="left"
      delay={200}
      duration={1000}
      className={styles.testimonial}
    >
      <RiDoubleQuotesR className={styles.quoteIcon} />
      <p className={styles.message}>“{message}”</p>
      <p className={styles.author}>- {author}</p>
    </RevealWrapper>
  );
};

export default Testimonial;
