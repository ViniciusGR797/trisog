import Head from "next/head";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import PageHeader from "@/components/sections/PageHeader";
import Search from "@/components/sections/Search";
import MyBookings from "@/components/sections/MyBookings";

export default function Bookings() {
  return (
    <>
      <Head>
        <title>Bookings</title>
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
          imageSrc="/images/bookings.svg"
          title="Your bookings"
          pathPrefix="Home"
          pathSuffix="bookings"
          showSearchBar={false}
        />
        <MyBookings />
        <Footer />
      </main>
    </>
  );
}
