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
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
            date="June 12, 2021"
            author="Admin"
            title="The Best Travel Destination in 2021"
          />
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
            date="June 12, 2021"
            author="Admin"
            title="The Best Travel Destination in 2021"
          />
        </div>
        <div className={styles.updatesColumn}>
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
            date="June 12, 2021"
            author="Admin"
            title="The Best Travel Destination in 2021 The Best Travel Destination in 2021 The Best Travel Destination in 2021"
          />
          <News
            image="https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6"
            date="June 12, 2021"
            author="Admin"
            title="The Best Travel Destination in 2021"
          />
        </div>
      </div>
    </section>
  );
};

export default Updates;
