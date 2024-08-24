import Head from "next/head";
import styles from "./styles.module.scss";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import PageHeader from "@/components/sections/PageHeader";

export default function Tours() {
  return (
    <>
      <Head>
        <title>Tours - Trisog</title>
        <meta
          name="description"
          content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <PageHeader
          imageSrc="/images/tour.svg"
          title="Tour Package"
          pathPrefix={"Home"}
        />
        {/* <Search /> */}
        <Footer />
      </main>
    </>
  );
}
