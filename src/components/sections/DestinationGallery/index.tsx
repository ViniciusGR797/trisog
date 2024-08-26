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
      const response = await DestinationService.getDestinations();
      if (response.status === 200) {
        setDestinations(response.data);
      } else {
        toast.error(response.data.msg);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.destinationGalley}>
      <div className={styles.destinationContainer}>
        <Galley
          destinations={destinations.slice(0, 6)}
        />
        <Galley
          destinations={destinations.slice(-6)}
          reverse={true}
        />
      </div>
    </section>
  );
};

export default DestinationGalley;
