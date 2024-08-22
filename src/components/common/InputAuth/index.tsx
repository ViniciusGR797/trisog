import React from "react";
import styles from "./styles.module.scss";
import { RevealWrapper } from "next-reveal";

interface InputAuthProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputAuth: React.FC<InputAuthProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  onKeyDown,
  error,
}) => (
  <div className={styles.inputContainer}>
    <label htmlFor={name} className={styles.label}>
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={styles.input}
    />

    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputAuth;
