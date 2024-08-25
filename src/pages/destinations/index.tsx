import Head from "next/head";
import Header from "@/components/sections/Header";
import PageHeader from "@/components/sections/PageHeader";
import DestinationGalley from "@/components/sections/DestinationGallery";
import Footer from "@/components/sections/Footer";

export default function Destination() {
  return (
    <>
      <Head>
        <title>Destination - Trisog</title>
        <meta name="description" content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <PageHeader
          imageSrc="/images/tour.svg"
          title="Destination"
          pathPrefix={"Home"}
        />
        <DestinationGalley />
        <Footer />
      </main>
    </>
  );
}
