import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import NotFound from "@/components/sections/NotFound";
import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>Not Found</title>
        <meta name="description" content="Discover immersive experiences and honest reviews of destinations worldwide. Explore travel tips, insights, and the best activities tailored to your interests. Plan your next adventure with confidence and create unforgettable memories." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <NotFound />
        <Footer />
      </main>
    </>
  );
}
