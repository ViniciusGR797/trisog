import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const BookingExperienceSkeleton: React.FC = () => {
  return (
    <div className={styles.booking}>
      <div className={`${styles.skeletonText} ${styles.perPerson}`}></div>
      <div className={styles.form}>
        <div className={styles.inputDate}>
          <div className={`${styles.skeletonText} ${styles.label}`}></div>
          <div
            className={`${styles.skeletonText} ${styles.inputWrapper}`}
          ></div>
        </div>
        <div className={styles.inputTime}>
          <div className={`${styles.skeletonText} ${styles.label}`}></div>
          <div
            className={`${styles.skeletonText} ${styles.inputWrapper}`}
          ></div>
        </div>
      </div>
      <div className={styles.ticket}>
        <div className={`${styles.skeletonText} ${styles.label}`}></div>
        <div className={styles.inputTickets}>
          <div className={styles.inputTicket}>
            <div className={`${styles.skeletonText} ${styles.age}`}></div>
            <div className={styles.controls}>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
            </div>
          </div>
          <div className={styles.inputTicket}>
            <div className={`${styles.skeletonText} ${styles.age}`}></div>
            <div className={styles.controls}>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
            </div>
          </div>
          <div className={styles.inputTicket}>
            <div className={`${styles.skeletonText} ${styles.age}`}></div>
            <div className={styles.controls}>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
              <div className={`${styles.skeletonText} ${styles.buttonControl}`}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.total}>
        <div className={`${styles.skeletonText} ${styles.totalText}`}></div>
        <div className={`${styles.skeletonText} ${styles.totalPrice}`}></div>
      </div>
      <div className={`${styles.skeletonText} ${styles.button}`}></div>
    </div>
  );
};

export default BookingExperienceSkeleton;
