import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/common/SectionHeader";
import TestimonialService from "@/services/api/testimonialService";
import { Testimonial } from "@/types/testimonial";
import TestimonialItem from "@/components/common/TestimonialItem";

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await TestimonialService.getTestimonials();
      if (response?.status === 200) {
        setTestimonials(response.data);
      }
    };

    fetchData();
  }, [setTestimonials]);

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialContainer}>
        <div
          className={styles.testimonialImage}
        >
          <Image
            src="/images/testimonial.svg"
            alt="Testimonial"
            width={555}
            height={660}
            priority={true}
          />
        </div>
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
                  <TestimonialItem
                    message={testimonial.message}
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
