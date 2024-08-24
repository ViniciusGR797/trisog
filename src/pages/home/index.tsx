import Head from "next/head";
import styles from "./styles.module.scss";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TourMostPopular from "@/components/sections/TourMostPopular";
import Statistics from "@/components/sections/Statistics";
import DestinationPopular from "@/components/sections/DestinationPopular";
import Testimonials from "@/components/sections/Testimonials";
import Updates from "@/components/sections/Updates";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Trisog</title>
        <meta name="description" content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <Hero />
        <TourMostPopular />
        <Statistics />
        <DestinationPopular />
        {/* <ChooseUs />
        <Category /> */}
        <Testimonials />
        <Updates />
        {/* <Partnerships /> */}
        <Footer />
      </main>
    </>
  );
}
