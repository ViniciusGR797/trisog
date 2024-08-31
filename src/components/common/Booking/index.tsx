import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Experience } from "@/types/experience";
import { useCurrency } from "@/contexts/CurrencyContext";
import { IoIosArrowDown } from "react-icons/io";
import { generateTimeOptionList } from "@/utils/time";
import { FiCalendar } from "react-icons/fi";

export interface TimeOption {
  value: number;
  label: string;
}

interface CardExperienceProps {
  experience: Experience;
  selectedOption: number;
  onDateChange: (date: string) => void;
  onTimeChange: (selectedOption: number) => void;
}

const Booking: React.FC<CardExperienceProps> = ({
  experience,
  selectedOption,
  onDateChange,
  onTimeChange,
}) => {
  const { symbol, exchangeRate } = useCurrency();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const options: TimeOption[] = generateTimeOptionList(experience.duration);

  const handleOptionClick = (option: TimeOption) => {
    if (selectedOption !== option.value) {
      onTimeChange(option.value);
    }
    setIsDropdownOpen(false);
  };

  const selectedOptionData =
    options.find((option) => option.value === selectedOption) || options[0];

  return (
    <div className={styles.booking}>
      <div className={styles.perPerson}>
        <span className={styles.pricePerPerson}>
          {symbol}{" "}
          {parseFloat(
            (experience.default_price * exchangeRate).toFixed(2)
          ).toString()}
        </span>
        / per person
      </div>
      <hr className={styles.separator} />
      <div className={styles.form}>
        <div className={styles.inputDate}>
          <p className={styles.label}>Date</p>
          {/* <DatePicker
            granularity="day"
            dateInputClassNames={{
              label: "text-subtitle",
              inputWrapper: "bg-white rounded h12",
              input: "text-body-s",
            }}
            minValue={parseDate(
              new Date(experience.start_date).toISOString().split("T")[0]
            )}
            maxValue={parseDate(
              new Date(experience.end_date).toISOString().split("T")[0]
            )}
            label="Date"
            labelPlacement="outside"
            radius="sm"
            endContent={<FiCalendar className={styles.calendarIcon} />}
            onChange={(value) => onDateChange(value.toString())}
          /> */}
        </div>
        <div className={styles.inputTime}>
          <p className={styles.label}>Time</p>
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
                {options.map((option, index) => (
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
      </div>
      <div className={styles.ticket}></div>
      <hr className={styles.separator} />
      <div className={styles.total}></div>
      <div className={styles.button}></div>
    </div>
  );
};

export default Booking;
