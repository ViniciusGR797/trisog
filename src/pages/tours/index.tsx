import Head from "next/head";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import PageHeader from "@/components/sections/PageHeader";
import Search from "@/components/sections/Search";

export default function Tours() {
  return (
    <>
      <Head>
        <title>Tours</title>
        <meta
          name="description"
          content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <PageHeader
          imageSrc="/images/tour.svg"
          title="Tour Package"
          pathPrefix="Home"
          pathSuffix="tours"
        />
        <Search />
        <Footer />
      </main>
    </>
  );
}
