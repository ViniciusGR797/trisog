import React from 'react';
import styles from './styles.module.scss';
import { RiDoubleQuotesR } from "react-icons/ri";

interface TestimonialProps {
  message: string;
  author: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ message, author }) => {
  return (
    <div className={styles.testimonial}>
      <RiDoubleQuotesR className={styles.quoteIcon} />
      <p className={styles.message}>“{message}”</p>
      <p className={styles.author}>- {author}</p>
    </div>
  );
};

export default Testimonial;
