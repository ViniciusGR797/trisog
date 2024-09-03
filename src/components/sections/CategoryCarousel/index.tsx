import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Pagination } from "swiper/modules";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/common/SectionHeader";
import { useRouter } from "next/router";
import CardExperienceSkeleton from "@/components/common/CardExperienceSkeleton";
import { Category } from "@/types/category";
import CategoryService from "@/services/api/categoryService";
import CardCategory from "@/components/common/CardCategory";

const CategoryCarousel: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  const fetchDataCategories = async () => {
    setLoading(true);
    const response = await CategoryService.getCategories();
    if (response?.status === 200) {
      setCategories(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDataCategories();
  }, [router]);

  return (
    <section className={styles.categorySection}>
      <SectionHeader title="Pick A Tour Type" subtitle="Browse By Category" isLongText={true} />

      <div className={styles.carousel}>
        {loading ? (
          <div className={styles.skeletonWrapper}>
            <div className={`${styles.skeletonItem} ${styles.skeletonOne}`}>
              <CardExperienceSkeleton />
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonTwo}`}>
              <CardExperienceSkeleton />
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonThree}`}>
              <CardExperienceSkeleton />
            </div>
            <div className={`${styles.skeletonItem} ${styles.skeletonFour}`}>
              <CardExperienceSkeleton />
            </div>
          </div>
        ) : categories && categories.length > 0 ? (
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={styles.swiperContainer}
            breakpoints={{
              1400: {
                slidesPerView: 6,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1000: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              800: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <CardCategory
                  category={category}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className={styles.noToursMessage}>
            No categories available at the moment
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryCarousel;
