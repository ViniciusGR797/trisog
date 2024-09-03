import React from "react";
import Checkbox from "../Checkbox";
import styles from "./styles.module.scss";

interface Item {
  id: string;
  name: string;
}

interface CheckboxListProps {
  items: Item[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
  shouldSort?: boolean; 
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  selectedItems,
  onToggleItem,
  shouldSort = true, 
}) => {
  const displayedItems = shouldSort
    ? [...items].sort((a, b) => a.name.localeCompare(b.name))
    : items;

  return (
    <div className={styles.checkboxList}>
      {displayedItems.map((item) => (
        <div key={item.id} className={styles.checkboxItem}>
          <Checkbox
            checked={selectedItems.includes(item.id)}
            onChange={() => onToggleItem(item.id)}
          />
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
