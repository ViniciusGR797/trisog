import React from "react";
import styles from "./styles.module.scss";

interface WeatherPeriodProps {
  periodLabel: string;
  minTemp: number;
  maxTemp: number;
}

const WeatherPeriod: React.FC<WeatherPeriodProps> = ({
  periodLabel,
  minTemp,
  maxTemp,
}) => {
  return (
    <div className={styles.weather}>
      <div className={styles.weatherPeriod}>
        <span className={styles.label}>{periodLabel}</span>
        <span className={styles.temperature}>
          {minTemp}°C - {maxTemp}°C
        </span>
      </div>
    </div>
  );
};

export default WeatherPeriod;
