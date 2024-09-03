import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <section className={styles.notFound}>
      <div className={styles.imageContainer}>
        <Image
          src="/images/not-found.svg"
          alt="Not Found"
          layout="responsive"
          width={600}
          height={400}
          priority={true}
        />
        <div className={styles.content}>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.subtitle}>
            Sorry, the page you are looking for does not exist
          </p>
          <Link href="/home" className={styles.button}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
