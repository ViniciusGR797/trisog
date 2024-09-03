import React from "react";
import styles from "./styles.module.scss";
import CardDestination from "@/components/common/CardDestination";
import News from "@/components/common/News";
import SectionHeader from "@/components/common/SectionHeader";

const Updates: React.FC = () => {
  return (
    <section className={styles.updates}>
      <SectionHeader title="Latest Travel Guide" subtitle="Updates" />
      <div className={styles.updatesContainer}>
        <div className={styles.updatesColumn}>
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/blogs%2Fblog-3.png?alt=media&token=b534976f-6bce-4521-a1fa-6dcdf5d1d2fc"
            date="July 13, 2023"
            author="Admin"
            title="The Impact of Covid-19 on travel & tourism industry"
          />
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/blogs%2Fblog-4.png?alt=media&token=a9bc7e77-2b6d-4b05-b59c-6e54ac4d46f9"
            date="October 9, 2021"
            author="Admin"
            title="Sustainable Travel: The New Trend"
          />
        </div>
        <div className={styles.updatesColumn}>
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/blogs%2Fblog-1.png?alt=media&token=bb5f91d6-153e-49b2-ad5d-bc9ddd5f2df5"
            date="June 20, 2024"
            author="Admin"
            title="Top Destinations for 2024 Revealed"
          />
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/blogs%2Fblog-2.png?alt=media&token=1f721f63-74f7-4b92-aaea-f08fec0146bc"
            date="January 5, 2023"
            author="Admin"
            title="Tourism Industry Sees Record Growth"
          />
        </div>
      </div>
    </section>
  );
};

export default Updates;
