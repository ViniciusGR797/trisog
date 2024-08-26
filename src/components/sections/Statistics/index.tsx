import React from "react";
import styles from "./styles.module.scss";
import StatisticalData from "@/components/common/StatisticalData";
import { useDestinationContext } from "@/contexts/DestinationContext";

const Statistics = () => {
  const { destinations } = useDestinationContext();

  return (
    <section className={styles.statistics}>
      <div className={styles.line}></div>
      <div className={styles.data}>
        <StatisticalData data={`${destinations.length - 1}+`} title="Total Destination" />
        <StatisticalData data="500+" title="Travel Packages" />
        <StatisticalData data="12k+" title="Total Travelers" />
        <StatisticalData data="7k+" title="Positive Reviews" />
      </div>
    </section>
  );
};

export default Statistics;
