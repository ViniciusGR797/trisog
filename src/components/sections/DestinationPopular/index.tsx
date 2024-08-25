import React from "react";
import styles from "./styles.module.scss";
import CardDestination from "@/components/common/CardDestination";
import Gallery from "@/components/common/Gallery";
import SectionHeader from "@/components/common/SectionHeader";

const DestinationPopular: React.FC = () => {
  return (
    <section className={styles.destinationPopular}>
      <SectionHeader title="Top Attractions Destinations" subtitle="Destination" />
      <div className={styles.gallery}>
        <Gallery
          cards={[
            {
              image:
                "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
              travels: 150,
              destination: "France",
            },
            {
              image:
                "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
              travels: 100,
              destination: "Italy",
            },
            {
              image:
                "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
              travels: 200,
              destination: "Spain",
            },
            {
              image:
                "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
              travels: 250,
              destination: "Portugal",
            },
            {
              image:
                "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
              travels: 300,
              destination: "Germany",
            },
            {
              image:
                "https://firebasestorage.googleapis.com/v0/b/trisog-94e32.appspot.com/o/archipelago.jpg?alt=media&token=23326e87-8571-4103-868c-2ad8797879a6",
              travels: 350,
              destination: "Netherlands",
            },
          ]}
        />
      </div>
    </section>
  );
};

export default DestinationPopular;
