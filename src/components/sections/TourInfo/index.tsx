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

interface TourInfoProps {
  experienceId: string;
}

const TourInfo: React.FC<TourInfoProps> = ({ experienceId }) => {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience>();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    ticket: {
      adults: 0,
      kids: 0,
      children: 0,
    },
  });

  const fetchDataExperienceById = async (experience_id: string) => {
    setLoading(true);
    const response = await ExperienceService.getExperienceById(experience_id);
    if (response?.status === 200) {
      setExperience(response.data);
    } else {
      router.push("/404");
      toast.warning(
        "Oops! The experience you are looking for could not be found"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (experienceId) fetchDataExperienceById(experienceId);
  }, [router]);

  const handleChange = (newValue: string | object, name: string) => {
    setFormData({ ...formData, [name]: newValue });
  };

  const handlerClick = async () => {
    const response = await BookingService.createBooking(
      formData.date,
      formData.time,
      formData.ticket,
      experienceId
    );
    if (response?.status === 201) {
      setExperience(response.data);
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
            "<Skeleton height={200} count={1} /> "
          ) : experience ? (
            <CardExperienceInfo experience={experience} />
          ) : null}
        </div>
        <div className={styles.booking}>
          {loading ? (
            "<Skeleton height={200} count={1} /> "
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
