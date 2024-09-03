import React from "react";
import styles from "./styles.module.scss";
import { Weather } from "@/types/destination";
import WeatherPeriod from "../WeatherPeriod";

interface WeatherAnnualProps {
  weather: Weather;
}

const WeatherAnnual: React.FC<WeatherAnnualProps> = ({ weather }) => {
  return (
    <div className={styles.weather}>
      <h2 className={styles.title}>Weather</h2>
      <div className={styles.weatherPeriods}>
        <WeatherPeriod periodLabel="Jan - Feb" minTemp={weather.jan_feb.min} maxTemp={weather.jan_feb.max} />
        <WeatherPeriod periodLabel="Mar - Apr" minTemp={weather.mar_apr.min} maxTemp={weather.mar_apr.max} />
        <WeatherPeriod periodLabel="May - Jun" minTemp={weather.may_jun.min} maxTemp={weather.may_jun.max} />
        <WeatherPeriod periodLabel="Jul - Aug" minTemp={weather.jul_aug.min} maxTemp={weather.jul_aug.max} />
        <WeatherPeriod periodLabel="Sep - Oct" minTemp={weather.sep_oct.min} maxTemp={weather.sep_oct.max} />
        <WeatherPeriod periodLabel="Nov - Dec" minTemp={weather.nov_dec.min} maxTemp={weather.nov_dec.max} />
      </div>
    </div>
  );
};

export default WeatherAnnual;
