import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface NewsProps {
  image: string;
  date: string;
  author: string;
  title: string;
}

const News: React.FC<NewsProps> = ({ image, date, author, title }) => {
  return (
      <Link href="/blog" className={styles.card}>
        <Image
          src={image}
          alt={title}
          width={1020}
          height={840}
          className={styles.image}
        />
        <div className={styles.info}>
          <div className={styles.metData}>
            <p>{date}</p>
            <div className={styles.author}>
              <span>•</span>
              <p>{author}</p>
            </div>
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
  );
};

export default News;
