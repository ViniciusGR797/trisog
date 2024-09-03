import CardExperienceInfo from "@/components/common/CardExperienceInfo";
import BookingExperience from "@/components/common/BookingExperience";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BookingService from "@/services/api/bookingService";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import CardExperienceInfoSkeleton from "@/components/common/CardExperienceInfoSkeleton";
import BookingExperienceSkeleton from "@/components/common/BookingExperienceSkeleton";
import dayjs from "dayjs";
import { Destination } from "@/types/destination";
import CardDestinationInfo from "@/components/common/CardDestinationInfo";
import Map from "@/components/common/Map";
import WeatherAnnual from "@/components/common/WeatherAnnual";

interface DestinationInfoProps {
  destination: Destination | undefined;
  loading: boolean;
}

const DestinationInfo: React.FC<DestinationInfoProps> = ({
  destination,
  loading,
}) => {
  return (
    <section className={styles.destinationInfoSection}>
      <div className={styles.destinationInfoContainer}>
        <div className={styles.gallery}>
          {/* {loading ? (
            <CardDestinationInfoSkeleton />
          ) : destination ? (
            <CardDestinationInfo destination={destination?.images || []} />
          ) : null} */}

          <CardDestinationInfo images={destination?.images || []} />
        </div>

        {/* {loading ? (
          <BookingExperienceSkeleton />
        ) : destination ? ( */}
        <div className={styles.mapWeather}>
          <Map mapLink={destination ? destination.map_link : ""} />
          <WeatherAnnual weather={destination?.weather} />
        </div>
        {/* ) : null} */}
      </div>
    </section>
  );
};

export default DestinationInfo;
