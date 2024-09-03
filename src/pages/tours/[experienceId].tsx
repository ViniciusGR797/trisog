import Header from "@/components/sections/Header";
import TourInfo from "@/components/sections/TourInfo";
import Footer from "@/components/sections/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import Description from "@/components/sections/Description";
import { use, useEffect, useState } from "react";
import { Experience } from "@/types/experience";
import ExperienceService from "@/services/api/experienceService";
import { toast } from "react-toastify";
import TourMap from "@/components/sections/TuorMap";
import ReviewAverage from "@/components/sections/ReviewAverage";
import ReviewSection from "@/components/sections/Review";
import ReviewForm from "@/components/sections/ReviewForm";
import { Review } from "@/types/review";
import ReviewService from "@/services/api/reviewService";
import TourMore from "@/components/sections/TourMore";

export default function ExperienceById() {
  const router = useRouter();
  const { experienceId } = router.query;
  const [experience, setExperience] = useState<Experience>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const fetchDataReviews = async () => {
    const response = await ReviewService.getReviewsByExperience(
      experienceId && typeof experienceId === "string" ? experienceId : ""
    );
    if (response?.status === 200) {
      setReviews(response.data);
    }
  };

  useEffect(() => {
    if (experienceId && typeof experienceId === "string") {
      fetchDataExperienceById(experienceId);
      fetchDataReviews();
    }
  }, [router, experienceId]);

  const handleChangeReview = () => {
    if (experienceId && typeof experienceId === "string") {
      fetchDataExperienceById(experienceId);
      fetchDataReviews();
    }
  };

  return (
    <>
      <Head>
        <title>{experience ? experience.title : "Tour"}</title>
        <meta
          name="description"
          content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <TourInfo experience={experience} loading={loading} />
        <Description title="Overview" description={experience ? experience.over_view : ""} />
        <TourMap mapLink={experience ? experience.map_link : ""} />
        <ReviewAverage ratings={experience?.ratings} />
        <ReviewSection reviews={reviews} />
        <ReviewForm experience={experience} onChange={handleChangeReview} />
        <TourMore />
        <Footer />
      </main>
    </>
  );
}
