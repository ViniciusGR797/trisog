import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

interface ExperienceItemDetailsProps {
  detailTitle: string;
  detailContent: ReactNode;
  contentClassName: string;
}

const ExperienceItemDetails: React.FC<ExperienceItemDetailsProps> = ({
  detailTitle,
  detailContent,
  contentClassName,
}) => {
  return (
    <div className={styles.detailContainer}>
      <p className={styles.detailTitle}>{detailTitle}</p>
      <span className={`${styles.detailContent} ${contentClassName}`}>
        {detailContent}
      </span>
    </div>
  );
};

export default ExperienceItemDetails;
