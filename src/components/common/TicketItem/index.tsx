import React from "react";
import styles from "./styles.module.scss";
import { FiMinus, FiPlus } from "react-icons/fi";

interface TicketItemProps {
  text: string;
  value: number;
  meetsMinimumAge: boolean;
  onChange: (newValue: number) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({ text, value, meetsMinimumAge, onChange }) => {
  const handleDecrement = () => {
    if (value > 0 && meetsMinimumAge) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (meetsMinimumAge) {
      onChange(value + 1);
    }
  };

  return (
    <div className={styles.container}>
      <p className={`${styles.text} ${!meetsMinimumAge ? styles.strikethrough : ""}`}>
        {text}
      </p>
      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={handleDecrement}
          disabled={!meetsMinimumAge || value <= 0}
        >
          <FiMinus />
        </button>
        <div className={styles.value}>{meetsMinimumAge ? value : 0}</div>
        <button
          className={styles.button}
          onClick={handleIncrement}
          disabled={!meetsMinimumAge}
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
};

export default TicketItem;
