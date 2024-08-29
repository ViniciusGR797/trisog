import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import StatisticalData from "@/components/common/StatisticalData";
import { toast } from "react-toastify";
import DestinationService from "@/services/api/destinationService";
import ExperienceService from "@/services/api/experienceService";
import { Destination } from "@/types/destination";
import { useExperienceContext } from "@/contexts/ExperienceContext";

const Statistics = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const { experiences } = useExperienceContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await DestinationService.getDestinations();
      if (response?.status === 200) {
        setDestinations(response.data);
      }
    };

    fetchData();
  }, [setDestinations]);

  return (
    <section className={styles.statistics}>
      <div className={styles.line}></div>
      <div className={styles.data}>
        <StatisticalData
          data={`${
            destinations && destinations.length > 0
              ? destinations.length - 1 + "+"
              : "0"
          }`}
          title="Total Destination"
        />
        <StatisticalData
          data={`${
            experiences && experiences.experiences
              ? experiences.experiences.length - 1 + "+"
              : "0"
          }`}
          title="Travel Packages"
        />
        <StatisticalData data="12k+" title="Total Travelers" />
        <StatisticalData data="7k+" title="Positive Reviews" />
      </div>
    </section>
  );
};

export default Statistics;
