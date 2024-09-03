import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatDate, formatDuration } from "@/utils/time";
import { Booking } from "@/types/booking";

interface CardBookingProps {
  booking: Booking;
}

const CardBooking: React.FC<CardBookingProps> = ({ booking }) => {
  const { symbol, exchangeRate } = useCurrency();

  return (
    <div className={styles.card}>
      <Image
        src={booking.experience.image}
        alt={booking.experience.title}
        width={300}
        height={300}
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.dateTime}>
          <span>{formatDate(booking.date)}</span>
          <span>{booking.time}</span>
        </div>
        <h3 className={styles.name}>{booking.experience.title}</h3>
        <div className={styles.tickets}>
          <div className={styles.ticket}>
            {booking.ticket.adults > 0 && (
              <>
                <span>{booking.ticket.adults}</span>
                <span>{booking.ticket.adults > 1 ? " Adults" : " Adult"}</span>
              </>
            )}
          </div>
          <div className={styles.ticket}>
            {booking.ticket.kids > 0 && (
              <>
                <span>{booking.ticket.kids}</span>
                <span>{booking.ticket.kids > 1 ? " Kids" : " Kid"}</span>
              </>
            )}
          </div>
          <div className={styles.ticket}>
            {booking.ticket.children > 0 && (
              <>
                <span>{booking.ticket.children}</span>
                <span>
                  {booking.ticket.children > 1 ? " Children" : " Child"}
                </span>
              </>
            )}
          </div>
        </div>
        <hr className={styles.separator} />
        <div className={styles.budget}>
          <p className={styles.total}>Total</p>
          <p className={styles.price}>
            {symbol}{" "}
            {parseFloat(
              (booking.total_price * exchangeRate).toFixed(2)
            ).toString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardBooking;
