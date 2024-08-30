import React from "react";
import Checkbox from "../Checkbox";
import styles from "./styles.module.scss";

interface CheckboxListProps {
  items: { id: string; name: string }[];
  selectedItems: string[];
  onToggleItem: (id: string) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  selectedItems,
  onToggleItem,
}) => {
  return (
    <div className={styles.checkboxList}>
      {items.map((item) => (
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
