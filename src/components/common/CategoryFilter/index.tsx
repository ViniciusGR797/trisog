import React from "react";
import CheckboxList from "../CheckboxList";
import styles from "./styles.module.scss";
import { Category } from "@/types/category";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onToggleCategory,
}) => {
  return (
    <div className={styles.categoryFilter}>
      <label htmlFor="categoryFilter" className={styles.label}>
        Categories
      </label>
      <CheckboxList
        items={categories}
        selectedItems={selectedCategories}
        onToggleItem={onToggleCategory}
      />
    </div>
  );
};

export default CategoryFilter;
