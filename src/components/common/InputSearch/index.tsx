import React from 'react';
import { IconType } from 'react-icons';
import styles from './styles.module.scss';

interface InputSearchProps {
  label: string;
  type: 'text' | 'number' | 'date';
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  Icon: IconType;
}

const InputSearch: React.FC<InputSearchProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
  Icon,
}) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <Icon className={styles.icon} />
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default InputSearch;
