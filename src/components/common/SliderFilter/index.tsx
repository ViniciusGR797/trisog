import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./styles.module.scss";
import { useCurrency } from "@/contexts/CurrencyContext";

type SliderFilterProps = {
  maxPrice: number;
  value: number;
  onChange: (value: number) => void;
  onClick: () => void;
};

const SliderFilter: React.FC<SliderFilterProps> = ({ maxPrice, value, onChange, onClick }) => {
  const { symbol, exchangeRate } = useCurrency();

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === "number") onChange(value);
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.filter}>
      <label className={styles.label}>Filter By</label>
      <Slider
        defaultValue={20}
        min={0}
        max={maxPrice}
        value={value}
        onChange={handleSliderChange}
        trackStyle={{ backgroundColor: "#fd5056", height: 6 }}
        handleStyle={{
          borderColor: "#fd5056",
          height: 15,
          width: 15,
          marginTop: -4,
          backgroundColor: "#fd5056",
          opacity: 1,
        }}
        railStyle={{ backgroundColor: "#d9d9d9", height: 6 }}
      />
      <div className={styles.price}>
        <span className={styles.minPrice}>
          {symbol}
          {(0 * exchangeRate).toFixed(2)}
        </span>
        <span className={styles.maxPrice}>
          {symbol}
          {(value * exchangeRate).toFixed(2)}
        </span>
      </div>
      <button type="button" onClick={handleClick} className={styles.button}>
        Submit
      </button>
    </div>
  );
};

export default SliderFilter;
