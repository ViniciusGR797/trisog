import React, { useState } from 'react';
import { IconType } from 'react-icons';
import styles from './styles.module.scss';

interface InputSearchProps {
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  Icon: IconType;
  options?: string[];
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
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (type === 'select') {
      const searchTerm = e.target.value.toLowerCase();
      setFilteredOptions(
        options.filter(option => option.toLowerCase().includes(searchTerm))
      );
      setIsDropdownOpen(true);
    }
  };

  const handleOptionClick = (option: string) => {
    onChange({
      target: {
        value: option,
        name,
      },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <Icon className={styles.icon} />
        <input
          id={name}
          type={type !== 'select' ? type : 'text'}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange}
          className={styles.input}
          onFocus={() => type === 'select' && setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
        />
        {type === 'select' && isDropdownOpen && (
          <div className={styles.dropdown}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onMouseDown={() => handleOptionClick(option)}
                >
                  {option}
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
