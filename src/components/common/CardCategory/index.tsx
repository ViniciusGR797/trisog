import React from "react";
import styles from "./styles.module.scss";
import { Category } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import { QueryOption } from "@/types/queryOption";
import ExperienceService from "@/services/api/experienceService";
import { useCurrency } from "@/contexts/CurrencyContext";
import { initialQueryOption } from "@/contexts/QueryOptionsContext";
import { useExperienceContext } from "@/contexts/ExperienceContext";

interface CategoryProps {
  category: Category;
}

const CardCategory: React.FC<CategoryProps> = ({ category }) => {
  const { symbol, exchangeRate } = useCurrency();
  const { setExperiences, setLoading } = useExperienceContext();

  const fetchDataExperiences = async (queryOption: QueryOption) => {
    setLoading(true);
    const response = await ExperienceService.getExperiences(queryOption);
    if (response?.status === 200) {
      setExperiences(response.data);
    }
    setLoading(false);
  };

  const handleClickCategory = (id: string): void => {
    const queryOption = initialQueryOption;
    queryOption.categoriesId = id;
    fetchDataExperiences(queryOption);
  };

  return (
    <Link
      href="/tours"
      onClick={() => handleClickCategory(category.id)}
      className={styles.card}
    >
      <Image
        src={category.icon}
        alt={category.name}
        width={60}
        height={60}
        className={styles.icon}
      />
      <div className={styles.circleAboutIcon}></div>
      <h3 className={styles.title}>{category.name}</h3>
      <div className={styles.tours}>
        {`${category && category.travel_count
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
    </Link>
  );
};

export default CardCategory;
