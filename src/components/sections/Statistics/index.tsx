import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import StatisticalData from "@/components/common/StatisticalData";
import { toast } from "react-toastify";
import DestinationService from "@/services/api/destinationService";
import ExperienceService from "@/services/api/experienceService";
import { Destination } from "@/types/destination";
import { usePaginatedExperiencesContext } from "@/contexts/PaginatedExperiencesContext";

const Statistics = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const { paginatedExperiences } = usePaginatedExperiencesContext();

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

  return (
    <section className={styles.statistics}>
      <div className={styles.line}></div>
      <div className={styles.data}>
        <StatisticalData
          data={`${destinations ? destinations.length - 1 + "+" : "0"}`}
          title="Total Destination"
        />
        <StatisticalData
          data={`${
            paginatedExperiences && paginatedExperiences.experiences
              ? paginatedExperiences.experiences.length - 1 + "+"
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
