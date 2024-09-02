import React from "react";
import { FaRegSquare, FaSquare } from "react-icons/fa6";
import styles from "./styles.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className={styles.checkbox} onClick={onChange}>
      {checked ? <FaSquare className={styles.checked} /> : <FaRegSquare className={styles.unchecked} />}
    </div>
  );
};

export default Checkbox;
