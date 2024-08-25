import React, { useState } from "react";
import styles from "./styles.module.scss";
import Galley from "@/components/common/Gallery";

const DestinationGalley: React.FC = () => {
  const [destinations, setDestinations] = useState([
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
  ]);

  return (
    <section className={styles.destinationGalley}>
      <div className={styles.destinationContainer}>
        <Galley
          cards={destinations.slice(0, 6)}
        />
        <Galley
          cards={destinations.slice(-6)}
          reverse={true}
        />
      </div>
    </section>
  );
};

export default DestinationGalley;
