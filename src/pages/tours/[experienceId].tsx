import Header from "@/components/sections/Header";
import TourInfo from "@/components/sections/TourInfo";
import Footer from "@/components/sections/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import TourDetail from "@/components/sections/TourDetail";
import { useEffect, useState } from "react";
import { Experience } from "@/types/experience";
import ExperienceService from "@/services/api/experienceService";
import { toast } from "react-toastify";
import TourMap from "@/components/sections/TuorMap";
import ReviewAverage from "@/components/sections/ReviewAverage";
import ReviewSection from "@/components/sections/Review";

export default function ExperienceName() {
  const router = useRouter();
  const { experienceId } = router.query;
  const [experience, setExperience] = useState<Experience>();
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

  useEffect(() => {
    if (experienceId && typeof experienceId === "string")
      fetchDataExperienceById(experienceId);
  }, [router, experienceId]);

  return (
    <>
      <Head>
        <title>ExperienceName - Trisog</title>
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
        <TourDetail overview={experience ? experience.over_view : ""} />
        <TourMap mapLink={experience ? experience.map_link : ""} />
        <ReviewAverage ratings={experience?.ratings} />
        <ReviewSection
          experienceId={
            experienceId && typeof experienceId === "string" ? experienceId : ""
          }
        />
        <Footer />
      </main>
    </>
  );
}
