import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Galley from "@/components/common/Gallery";
import { useDestinationContext } from "@/contexts/DestinationContext";
import DestinationService from "@/services/api/destinationService";
import { toast } from "react-toastify";

const DestinationGalley: React.FC = () => {
  const { destinations, setDestinations } = useDestinationContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DestinationService.getDestinations();
        if (response.status === 200) {
          setDestinations(response.data);
        } else {
          toast.error(response.data.msg);
        }
      } catch (error) {
        toast.error("An error occurred while fetching destinations.");
      }
    };

    fetchData();
  }, [setDestinations]);

  const chunkDestinations = (destinations: any[], size: number) => {
    const result: any[][] = [];
    for (let i = 0; i < destinations.length; i += size) {
      result.push(destinations.slice(i, i + size));
    }
    return result;
  };

  const destinationChunks = chunkDestinations(destinations, 6);

  return (
    <section className={styles.destinationGalley}>
      <div className={styles.destinationContainer}>
        {destinations.length === 0 ? (
          <p className={styles.noDestinationsMessage}>No destinations available at the moment</p>
        ) : (
          destinationChunks.map((chunk, index) => (
            <Galley
              key={index}
              destinations={chunk}
              reverse={index % 2 === 1}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default DestinationGalley;
