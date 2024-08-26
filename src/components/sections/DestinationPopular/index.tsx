import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Gallery from "@/components/common/Gallery";
import SectionHeader from "@/components/common/SectionHeader";
import DestinationService from "@/services/api/destinationService";
import { useDestinationContext } from "@/contexts/DestinationContext";
import { toast } from "react-toastify";

const DestinationPopular: React.FC = () => {
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
    <section className={styles.destinationPopular}>
      <SectionHeader
        title="Top Attractions Destinations"
        subtitle="Destination"
      />
      <div className={styles.gallery}>
        {destinations.length === 0 ? (
          <p className={styles.noDestinationsMessage}>No top attractions available at the moment</p>
        ) : (
          <Gallery destinations={destinations.slice(0, 6)} />
        )}
      </div>
    </section>
  );
};

export default DestinationPopular;
