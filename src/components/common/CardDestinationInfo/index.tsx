import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from "./styles.module.scss";

interface CardDestinationInfoProps {
  images: string[];
}

const CardDestinationInfo: React.FC<CardDestinationInfoProps> = ({
  images,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  return (
    <div className={styles.cardDestinationInfo}>
      <div
        className={`${styles.mainImage} ${
          images.length === 1 ? styles.fullHeightImage : ""
        }`}
        onClick={() => handleImageClick(0)}
      >
        <Image
          src={images[0]}
          alt="Destination Main"
          fill={true}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>

      {images.length > 1 && (
        <div className={styles.smallImages}>
          {images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className={styles.smallImage}
              onClick={() => handleImageClick(index + 1)}
            >
              <Image
                src={image}
                alt={`Destination ${index + 1}`}
                fill={true}
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>
          ))}
          {images.length > 3 && (
            <div className={styles.smallImage}>
              <Image
                src={images[4]}
                alt="Destination 4"
                fill={true}
                style={{ objectFit: "cover" }}
                priority={true}
              />
              {images.length > 5 && (
                <div className={styles.morePhotos} onClick={handleModalToggle}>
                  <span>{images.length - 4}+</span>
                  <p>More photos</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className={styles.modal} onClick={handleModalToggle}>
          <div
            className={styles.sliderWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className={styles.swiperContainer}
              spaceBetween={10}
              slidesPerView={1}
              initialSlide={currentIndex}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={image}
                      alt={`Slide ${index + 1}`}
                      fill={true}
                      style={{ objectFit: "cover" }}
                      priority={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDestinationInfo;
