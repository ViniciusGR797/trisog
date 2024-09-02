import CardExperienceInfo from "@/components/common/CardExperienceInfo";
import BookingExperience from "@/components/common/BookingExperience";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Experience } from "@/types/experience";
import ExperienceService from "@/services/api/experienceService";
import BookingService from "@/services/api/bookingService";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import { Booking } from "@/types/booking";
import handler from "@/pages/api/sendEmail";
import CardExperienceInfoSkeleton from "@/components/common/CardExperienceInfoSkeleton";
import BookingExperienceSkeleton from "@/components/common/BookingExperienceSkeleton";
import dayjs from "dayjs";
import exp from "constants";

interface TourInfoProps {
  experience: Experience | undefined;
  loading: boolean;
}

const TourInfo: React.FC<TourInfoProps> = ({ experience, loading }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    ticket: {
      adults: 0,
      kids: 0,
      children: 0,
    },
  });

  const handleChange = (newValue: string | object, name: string) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handlerClick = async () => {
    const { date, time, ticket } = formData;

    if (experience === undefined) {
      toast.warn("Experience not found");
      return;
    }

    if (
      dayjs() > dayjs(date) ||
      !/^\d{4}-\d{2}-\d{2}(?=T|$)/.test(date)
    ) {
      toast.warn("Please select a valid date");
      return;
    }

    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)) {
      toast.warn("Please select a valid time in the format HH:MM");
      return;
    }

    if (ticket.adults === 0 && ticket.kids === 0 && ticket.children === 0) {
      toast.warn("Please select at least one ticket");
      return;
    }

    const response = await BookingService.createBooking(
      formData.date,
      formData.time,
      formData.ticket,
      experience.id
    );
    if (response?.status === 201) {
      toast.success("Booking successful!");
      router.push("/bookings");
    } else {
      toast.warning("Booking failed. Please try again.");
    }
  };

  return (
    <section className={styles.tourInfoSection}>
      <div className={styles.tourInfoContainer}>
        <div className={styles.experience}>
          {loading ? (
            <CardExperienceInfoSkeleton />
          ) : experience ? (
            <CardExperienceInfo experience={experience} />
          ) : null}
        </div>
        <div className={styles.booking}>
          {loading ? (
            <BookingExperienceSkeleton />
          ) : experience ? (
            <BookingExperience
              experience={experience}
              values={formData}
              onChange={handleChange}
              onClick={handlerClick}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TourInfo;
