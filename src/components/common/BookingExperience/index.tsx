import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Experience } from "@/types/experience";
import { Ticket } from "@/types/booking";
import { useCurrency } from "@/contexts/CurrencyContext";
import { IoIosArrowDown } from "react-icons/io";
import { generateTimeOptionList } from "@/utils/time";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FiCalendar } from "react-icons/fi";
import { Popper, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import TicketItem from "../TicketItem";
import { toast } from "react-toastify";

interface BookingExperienceProps {
  experience: Experience;
  values: {
    date: string;
    time: string;
    ticket: Ticket;
  };
  onChange: (newValue: string | object, name: string) => void;
  onClick: () => void;
}

const BookingExperience: React.FC<BookingExperienceProps> = ({
  experience,
  values,
  onChange,
  onClick,
}) => {
  const router = useRouter();
  const { symbol, exchangeRate } = useCurrency();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  const [options, _] = useState<string[]>(generateTimeOptionList());
  const [filteredOptions, setFilteredOptions] = useState<string[]>(
    generateTimeOptionList()
  );
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const handleTicketChange = (category: keyof Ticket, newValue: number) => {
    const totalTickets =
      values.ticket.adults + values.ticket.kids + values.ticket.children;
    if (
      totalTickets >= experience.max_people &&
      values.ticket[category] < newValue
    ) {
      toast.warning("The maximum number of tickets has been reached");
      return;
    }

    onChange({ ...values.ticket, [category]: newValue }, "ticket");
  };

  useEffect(() => {
    if (dayjs() > dayjs(experience.end_date)) {
      setIsExpired(true);
    }
  }, [router]);

  const handleOptionClickTime = (option: string) => {
    if (values.time !== option) {
      onChange(option, "time");
      setTime(option);
    }
    setIsDropdownOpen(true);
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");

    let formattedValue = "";
    if (numericValue.length > 0) {
      formattedValue = numericValue.slice(0, 2);
    }
    if (numericValue.length > 2) {
      formattedValue += `:${numericValue.slice(2, 4)}`;
    }
    setTime(formattedValue);

    setFilteredOptions(
      options.filter((option) => option.includes(formattedValue))
    );

    if (options.includes(formattedValue)) {
      onChange(formattedValue, "time");
    }

    setIsDropdownOpen(true && !isExpired);
  };

  const handleBlurTime = () => {
    setTimeout(() => {
      options.includes(time) ? onChange(time, "time") : setTime("");
      setIsDropdownOpen(false && !isExpired);
    }, 200);
  };

  const minDate =
    dayjs() < dayjs(experience.start_date)
      ? dayjs(experience.start_date)
      : dayjs() < dayjs(experience.end_date)
      ? dayjs()
      : null;
  const maxDate =
    dayjs() < dayjs(experience.end_date) ? dayjs(experience.end_date) : null;

  return (
    <div className={styles.booking}>
      {isExpired ? (
        <div className={styles.expired}>
          <span>Expired</span>
        </div>
      ) : null}
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
          <div className={styles.inputWrapperDate}>
            <DatePicker
              value={dayjs(values.date)}
              onChange={(value) => onChange(value?.toISOString() || "", "date")}
              defaultValue={minDate}
              minDate={minDate || dayjs()}
              maxDate={maxDate || dayjs()}
              disabled={isExpired}
              slots={{
                popper: (props) => <Popper {...props} style={{ zIndex: 4 }} />,
              }}
              sx={{
                "& .MuiInputBase-root": {
                  padding: "0",
                  fontSize: "1rem",
                  color: "#041036",
                },
                "& .MuiInputBase-input": {
                  padding: "0",
                  color: "#646a82",
                },
                "& .MuiButtonBase-root": {
                  color: "transparent",
                  position: "absolute",
                  right: "0",
                  width: "100%",
                  display: isExpired ? "none" : "block",

                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              className={styles.dateInput}
            />
            <FiCalendar className={styles.dateIcon} />
          </div>
        </div>
        <div className={styles.inputTime}>
          <p className={styles.label}>Time</p>
          <div
            className={styles.inputWrapper}
            onClick={() => setIsDropdownOpen(!isDropdownOpen && !isExpired)}
          >
            <input
              id={experience.id}
              type="text"
              name="time"
              value={!isExpired ? time : ""}
              min={0}
              placeholder="Select"
              onChange={handleChangeTime}
              onBlur={handleBlurTime}
              className={styles.selectedOption}
            />
            <IoIosArrowDown
              className={`${styles.icon} ${isDropdownOpen ? styles.open : ""}`}
            />
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                {filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={styles.dropdownItem}
                    onMouseDown={() => handleOptionClickTime(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.ticket}>
        <p className={styles.label}>Ticket</p>
        <div className={styles.inputTickets}>
          <TicketItem
            text="Adults (18+ years)"
            value={values.ticket.adults}
            meetsMinimumAge={experience.min_age <= 18 && !isExpired}
            onChange={(newValue) => handleTicketChange("adults", newValue)}
          />
          <TicketItem
            text="Kids (12+ years)"
            value={values.ticket.kids}
            meetsMinimumAge={experience.min_age <= 12 && !isExpired}
            onChange={(newValue) => handleTicketChange("kids", newValue)}
          />
          <TicketItem
            text="Children (3+ years)"
            value={values.ticket.children}
            meetsMinimumAge={experience.min_age <= 3 && !isExpired}
            onChange={(newValue) => handleTicketChange("children", newValue)}
          />
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.total}>
        <p>Total</p>
        <span>
          {symbol}{" "}
          {parseFloat(
            (
              experience.default_price *
              exchangeRate *
              (values.ticket.adults +
                values.ticket.kids +
                values.ticket.children * 0.5)
            ).toFixed(2)
          ).toString()}
        </span>
      </div>
      <button onClick={onClick} disabled={isExpired} className={styles.button}>
        Book now
      </button>
    </div>
  );
};

export default BookingExperience;
