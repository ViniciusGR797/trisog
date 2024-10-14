import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import StatisticalData from "@/components/common/StatisticalData";
import { toast } from "react-toastify";
import DestinationService from "@/services/api/destinationService";
import ExperienceService from "@/services/api/experienceService";
import { Destination } from "@/types/destination";
import { useExperienceContext } from "@/contexts/ExperienceContext";
import BookingService from "@/services/api/bookingService";
import ReviewService from "@/services/api/reviewService";
import { PaginatedExperiences } from "@/types/experience";

const Statistics = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [experiences, setExperiences] = useState<PaginatedExperiences | undefined>(undefined);
  const [bookingsCount, setBookingsCount] = useState<number>(0);
  const [reviews, setReviews] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DestinationService.getDestinations();
      if (response?.status === 200) {
        setDestinations(response.data);
      }
    };

    fetchData();
  }, [setDestinations]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ExperienceService.getExperiences();
      if (response?.status === 200) {
        setExperiences(response.data);
      }
    };

    fetchData();
  }, [setExperiences]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await BookingService.getBookingsStatsCount();
      if (response?.status === 200) {
        setBookingsCount(response.data.count);
      }
    };

    fetchData();
  }, [setBookingsCount]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ReviewService.getReviews();
      if (response?.status === 200) {
        setReviews(response.data);
      }
    };

    fetchData();
  }, [setReviews]);

  return (
    <section className={styles.statistics}>
      <div className={styles.line}></div>
      <div className={styles.data}>
        <StatisticalData
          data={`${
            destinations && destinations.length > 0
              ? destinations.length - 1 + "+"
              : "0"
          }`}
          title="Total Destination"
        />
        <StatisticalData
          data={`${
            experiences && experiences.experiences && experiences.experiences.length > 0
              ? experiences.total_experiences - 1 + "+"
              : "0"
          }`}
          title="Travel Packages"
        />
        <StatisticalData
          data={`${
            bookingsCount > 0 ? bookingsCount - 1 + "+" : "0"
          }`}
          title="Total Travelers"
        />
        <StatisticalData
          data={`${
            reviews && reviews.length > 0 ? reviews.length - 1 + "+" : "0"
          }`}
          title="Positive Reviews"
        />
      </div>
    </section>
  );
};

export default Statistics;
