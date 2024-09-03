import React from "react";
import styles from "./styles.module.scss";
import { Category } from "@/types/category";
import Image from "next/image";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CategoryProps {
  category: Category;
}

const CardCategory: React.FC<CategoryProps> = ({ category }) => {
  const { symbol, exchangeRate } = useCurrency();

  return (
    <div className={styles.card}>
      <Image
        src={category.icon}
        alt={category.name}
        width={150}
        height={150}
        className={styles.icon}
      />
      <div className={styles.circleAboutIcon}></div>
      <h3 className={styles.title}>{category.name}</h3>
      <div className={styles.tours}>
        {`${
          category && category.travel_count
            ? category.travel_count - 1 + " "
            : "0 "
        }`}
        {`${category && category.travel_count > 1 ? "Tours+" : "Tour"}`}
      </div>
      <div className={styles.price}>
        <span className={styles.priceFrom}>From</span>
        <span className={styles.priceSymbol}>
          {symbol}{" "}
          {parseFloat(
            (category.from_price * exchangeRate).toFixed(2)
          ).toString()}
        </span>
      </div>
    </div>
  );
};

export default CardCategory;
