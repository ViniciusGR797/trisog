import CardExperienceInfo from "@/components/common/CardExperienceInfo";
import Booking from "@/components/common/Booking";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Experience } from "@/types/experience";
import ExperienceService from "@/services/api/experienceService";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

interface TourInfoProps {
  experienceId: string;
}

const TourInfo: React.FC<TourInfoProps> = ({ experienceId }) => {
  const router = useRouter();
  const [experience, setExperience] = useState<Experience>();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    date: "",
    time: 0,
    ticket: "",
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

  const handleTimeChange = (selectedOption: number) => {
    setFormData({
      ...formData,
      time: selectedOption,
    });
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
            <Booking
              experience={experience}
              selectedOption={formData.time}
              onTimeChange={handleTimeChange}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default TourInfo;
