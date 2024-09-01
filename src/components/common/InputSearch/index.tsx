import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import dayjs from "dayjs";
import styles from "./styles.module.scss";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Popper, TextField } from "@mui/material";

interface Option {
  id: string;
  name: string;
}

interface InputSearchProps {
  label: string;
  type: "text" | "number" | "date" | "select";
  name: string;
  value: string;
  placeholder: string;
  onChange: (data: { id?: string; value: string; name: string }) => void;
  Icon: IconType;
  options?: Option[];
}

const InputSearch: React.FC<InputSearchProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  Icon,
  options = [],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    onChange({ value, name });
    if (type === "select") {
      const searchTerm = e.target.value.toLowerCase();
      setFilteredOptions(
        options.filter((option) =>
          option.name.toLowerCase().includes(searchTerm)
        )
      );
      setIsDropdownOpen(true);
    }
  };

  const onDateChange = (dateValue: string) => {
    onChange({ value: dateValue, name });
  };

  useEffect(() => {
    if (options.length > 0 && value === "") setFilteredOptions(options);
  }, [options]);

  const handleOptionClick = (option: Option) => {
    onChange({
      id: option.id,
      value: option.name,
      name,
    });
    setIsDropdownOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (type === "select") {
        const option = options.find((option) => option.name === value);

        if (option) {
          onChange({ id: option.id, value: option.name, name });
        } else {
          onChange({ value: "", name });
        }
      }

      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <Icon className={styles.icon} />
        {type === "date" ? (
          <DatePicker
            value={dayjs(value)}
            onChange={(newValue) => onDateChange(newValue?.toISOString() || "")}
            slots={{
              popper: props => <Popper {...props} style={{ zIndex: 4}} />,
            }}
            sx={{
              "& .MuiInputBase-root": {
                padding: "0",
                fontSize: "1rem",
                color: "#646a82",
              },
              "& .MuiInputBase-input": {
                padding: "0",
                width: "100%",
                position: "relative",
              },
              "& .MuiButtonBase-root": {
                color: "transparent",
                position: "absolute",
                right: "0",
                width: "100%",

                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          />
        ) : (
          <input
            id={name}
            type={type !== "select" ? type : "text"}
            name={name}
            value={value}
            min={type === "number" ? 0 : undefined}
            placeholder={placeholder}
            onChange={handleInputChange}
            className={styles.input}
            onFocus={() => type === "select" && setIsDropdownOpen(true)}
            onBlur={handleBlur}
          />
        )}
        {type === "select" && isDropdownOpen && (
          <div className={styles.dropdown}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={styles.dropdownItem}
                  onMouseDown={() => handleOptionClick(option)}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>No options found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputSearch;
