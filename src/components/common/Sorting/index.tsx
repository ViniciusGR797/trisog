import { ReactNode, useState } from "react";
import {
  LuArrowDownAZ,
  LuArrowUpAZ,
  LuArrowDown10,
  LuArrowUp10,
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
  onSortChange: (selectedOption: string, isAscending: boolean) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] =
    useState<SortingOption["value"]>("name");
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const sortingOptions: SortingOption[] = [
    {
      value: "name",
      label: "Name",
      iconAsc: <LuArrowUpAZ className={styles.iconSort} />,
      iconDesc: <LuArrowDownAZ className={styles.iconSort} />,
    },
    {
      value: "country",
      label: "Country",
      iconAsc: <LuArrowUpAZ className={styles.iconSort} />,
      iconDesc: <LuArrowDownAZ className={styles.iconSort} />,
    },
    {
      value: "city",
      label: "City",
      iconAsc: <LuArrowUpAZ className={styles.iconSort} />,
      iconDesc: <LuArrowDownAZ className={styles.iconSort} />,
    },
    {
      value: "rating",
      label: "Rating",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
    {
      value: "reviews",
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
      value: "price",
      label: "Price",
      iconAsc: <LuArrowUp10 className={styles.iconSort} />,
      iconDesc: <LuArrowDown10 className={styles.iconSort} />,
    },
  ];

  const handleOptionClick = (option: SortingOption) => {
    if (selectedOption !== option.value) {
      setSelectedOption(option.value);
      setIsAscending(true);
      onSortChange(option.value, true); 
    }
    setIsDropdownOpen(false);
  };

  const handleIconClick = () => {
    const newIsAscending = !isAscending;
    setIsAscending(!isAscending);
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
