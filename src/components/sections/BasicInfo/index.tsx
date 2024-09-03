import React from "react";
import styles from "./styles.module.scss";
import InfoItem from "@/components/common/InfoItem";
import { Destination } from "@/types/destination";

interface BasicInfoProps {
  destination: Destination | undefined;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ destination }) => {
  const formatNumber = (value: number): string => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(0)}M`;
    } else if (value >= 1_000) {
      return `${(value / 1_000).toFixed(0)}K`;
    } else {
      return value.toString();
    }
  };

  return (
    <section className={styles.basicInfoSection}>
      <div className={styles.basicInfoContainer}>
        <h2 className={styles.title}>Basic Information</h2>
        <div className={styles.infoContainer}>
          <InfoItem label="Country" value={destination?.name || ""} />
          <InfoItem
            label="Language"
            value={destination?.language.join(", ") || ""}
          />
          <InfoItem label="Currency" value={destination?.currency || ""} />
          <InfoItem
            label="Area"
            value={destination?.area.toString() + " Square Miles" || ""}
          />
          <InfoItem
            label="Population"
            value={formatNumber(destination?.population || 0)}
          />
          <InfoItem label="Time Zone" value={destination?.time_zone || ""} />
          <InfoItem
            label="Time to travel"
            value={destination?.time_to_travel.join(", ") || ""}
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
