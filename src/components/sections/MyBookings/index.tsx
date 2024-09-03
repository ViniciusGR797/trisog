import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import CardExperience from "@/components/common/CardExperience";
import Sorting from "@/components/common/Sorting";
import { toast } from "react-toastify";
import ExperienceService from "@/services/api/experienceService";
import { useRouter } from "next/router";
import { useFavoriteContext } from "@/contexts/FavoriteContext";
import FavoriteService from "@/services/api/favoriteService";
import { parseCookies } from "nookies";
import { useExperienceContext } from "@/contexts/ExperienceContext";
import Filter from "@/components/common/Filter";
import { useSearch } from "@/contexts/SearchContext";
import { QueryOption } from "@/types/queryOption";
import { useQueryContext } from "@/contexts/QueryOptionsContext";
import Pagination from "@/components/common/Pagination";
import CardExperienceSkeleton from "@/components/common/CardExperienceSkeleton";
import { calculateAverageRating } from "@/utils/average";
import { PaginatedExperiences } from "@/types/experience";
import { Booking } from "@/types/booking";
import BookingService from "@/services/api/bookingService";
import CardBooking from "@/components/common/CardBooking";

const MyBookings: React.FC = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[] | undefined>(undefined);
  const [isLoading, setLoading] = useState<boolean>(true);

  const fetchDataBookings = async () => {
    setLoading(true);
    const response = await BookingService.getBookings();
    if (response?.status === 200) {
      setBookings(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (bookings === undefined) fetchDataBookings();
  }, [router]);

  return (
    <section className={styles.card}>
      <div className={styles.results}>
        {isLoading ? (
          <div className={styles.skeletonWrapper}>
            {/* <CardBookingSkeleton />
            <CardBookingSkeleton />
            <CardBookingSkeleton />
            <CardBookingSkeleton />
            <CardBookingSkeleton />
            <CardBookingSkeleton />
            <CardBookingSkeleton />
            <CardBookingSkeleton /> */}
            <CardExperienceSkeleton />
          </div>
        ) : (
          <div
            className={`${
              bookings && bookings.length > 0
                ? styles.resultsList
                : styles.noResultsList
            }`}
          >
            {bookings && bookings.length > 0 ? (
              bookings.map((result, index) => (
                <div key={index} className={styles.resultItem}>
                  <CardBooking booking={result} />
                </div>
              ))
            ) : (
              <div className={styles.noResults}>No bookings found</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookings;
