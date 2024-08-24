import React from "react";
import styles from "./styles.module.scss";

interface StatisticalDataProps {
  data: string | number;
  title: string;
}

const StatisticalData: React.FC<StatisticalDataProps> = ({ data, title }) => {
  return (
    <div className={styles.statisticalData}>
      <h2 className={styles.data}>{data}</h2>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default StatisticalData;
