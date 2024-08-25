import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import Testimonial from "@/components/common/Testimonial";
import SectionHeader from "@/components/common/SectionHeader";

const testimonials = [
  {
    id: 1,
    text: "The UI designs he crafted are top-notch, and the design system he integrated allows for straight forward fixes and bulk updates throughout almost every area of the app.",
    author: "By Molie Rosa, Photographer",
  },
  {
    id: 2,
    text: "This service is fantastic! Highly recommend it.",
    author: "By John Doe, Doctor",
  },
  {
    id: 3,
    text: "This service is fantastic! Highly recommend it.",
    author: "By John Doe, Doctor",
  },
  {
    id: 4,
    text: "This service is fantastic! Highly recommend it.",
    author: "By John Doe, Doctor",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialContainer}>
        <Image
          src="/images/testimonial.svg"
          alt="Testimonial"
          width={555}
          height={660}
          priority={true}
          className={styles.testimonialImage}
        />
        <div className={styles.testimonialDetail}>
          <SectionHeader title="What Travelers Say" subtitle="Testimonial" />
          <div className={styles.carousel}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className={styles.swiperContainer}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <Testimonial
                    message={testimonial.text}
                    author={testimonial.author}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
