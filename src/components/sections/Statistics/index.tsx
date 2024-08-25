import React from "react";
import styles from "./styles.module.scss";
import StatisticalData from "@/components/common/StatisticalData";

const Statistics = () => {
  return (
    <section className={styles.statistics}>
      <div className={styles.line}></div>
      <div className={styles.data}>
        <StatisticalData data="120+" title="Total Destination" />
        <StatisticalData data="500+" title="Travel Packages" />
        <StatisticalData data="12k+" title="Total Travelers" />
        <StatisticalData data="7k+" title="Positive Reviews" />
      </div>
    </section>
  );
};

export default Statistics;
