import { ReactNode, useState } from "react";
import {
  LuArrowUpZA,
  LuArrowDownZA,
  LuArrowUp10,
  LuArrowDown10,
} from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./styles.module.scss"; 

interface SortingOption {
  value: string;
  label: string;
  iconAsc: ReactNode;
  iconDesc: ReactNode;
}

interface SortingProps {
  selectedOption: string;
  isAscending: boolean;
  onSortChange: (selectedOption: string, isAscending: boolean) => void;
}

const Sorting: React.FC<SortingProps> = ({ selectedOption, isAscending, onSortChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const sortingOptions: SortingOption[] = [
    {
      value: "title",
      label: "Title",
      iconAsc: <LuArrowUpZA className={styles.iconSort} />,
      iconDesc: <LuArrowDownZA className={styles.iconSort} />,
    },
    {
      value: "city",
      label: "City",
      iconAsc: <LuArrowUpZA className={styles.iconSort} />,
      iconDesc: <LuArrowDownZA className={styles.iconSort} />,
    },
    {
      value: "default_price",
      label: "Price",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
    {
      value: "rating",
      label: "Rating",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
    {
      value: "review_count",
      label: "Reviews",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
    {
      value: "duration",
      label: "Duration",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
    {
      value: "start_date",
      label: "Start Date",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
    {
      value: "end_date",
      label: "End Date",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
  ];

  const handleOptionClick = (option: SortingOption) => {
    if (selectedOption !== option.value) {
      onSortChange(option.value, isAscending); 
    }
    setIsDropdownOpen(false);
  };


  const handleIconClick = () => {
    const newIsAscending = !isAscending;
    onSortChange(selectedOption, newIsAscending);
  };

  const selectedOptionData =
    sortingOptions.find((option) => option.value === selectedOption) ||
    sortingOptions[0];

  return (
    <div className={styles.ordination}>
      <p className={styles.sortBy}>Sort by</p>
      <div className={`${styles.iconWrapper}`} onClick={handleIconClick}>
        {isAscending ? selectedOptionData.iconAsc : selectedOptionData.iconDesc}
      </div>
      <div
        className={styles.inputWrapper}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className={styles.selectedOption}>{selectedOptionData.label}</p>
        <IoIosArrowDown
          className={`${styles.icon} ${isDropdownOpen ? styles.open : ""}`}
        />
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            {sortingOptions.map((option, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onMouseDown={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sorting;
