import Header from "@/components/sections/Header";
import TourInfo from "@/components/sections/TourInfo";
import Footer from "@/components/sections/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ExperienceName() {
  const router = useRouter();
  const { experienceId } = router.query;

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
        <TourInfo
          experienceId={
            experienceId && typeof experienceId === "string" ? experienceId : ""
          }
        />
        <Footer />
      </main>
    </>
  );
}
