import Head from "next/head";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import PageHeader from "@/components/sections/PageHeader";
import Search from "@/components/sections/Search";

export default function Favorites() {
  return (
    <>
      <Head>
        <title>Favorites</title>
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
          imageSrc="/images/favorites.svg"
          title="Tour Favorites"
          pathPrefix="Home"
          pathSuffix="favorites"
          showSearchBar={false}
        />
        <Search isFavorites={true} />
        <Footer />
      </main>
    </>
  );
}
